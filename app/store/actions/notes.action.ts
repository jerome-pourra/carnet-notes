import { BACKEND_ROUTE_NOTES } from "@/app/config";
import { fetchWithTimeout } from "@/app/utils/fetchWithTimeout";
import { Dispatch } from "@reduxjs/toolkit";
import { NoteEntity } from "../types/notes.type";
import { NOTE_ADD, NOTE_DELETE, NOTE_FETCH, NOTE_FETCH_FAILURE, NOTE_FETCH_SUCCESS, NOTE_UPDATE, NOTES_FETCH_FAILURE, NOTES_FETCH_LIST, NOTES_FETCH_SUCCESS } from "./actions";
import { showSnackbar } from "./snackbar.action";

export const fetchNote = (id: number) => async (dispatch: Dispatch) => {
  dispatch({ type: NOTE_FETCH });
  try {
    const response = await fetchWithTimeout(`${BACKEND_ROUTE_NOTES}/${id}`, { method: 'GET' });
    const data = await response.json();
    dispatch({ type: NOTE_FETCH_SUCCESS, payload: data });
  } catch (error: unknown) {
    dispatch({ type: NOTE_FETCH_FAILURE });
    dispatch(showSnackbar('error', 'Failed to fetch notes'));
  }
};

export const fetchNotes = () => async (dispatch: Dispatch) => {
  dispatch({ type: NOTES_FETCH_LIST });
  try {
    const response = await fetchWithTimeout(`${BACKEND_ROUTE_NOTES}`, { method: 'GET' });
    const data = await response.json();
    dispatch({ type: NOTES_FETCH_SUCCESS, payload: data });
  } catch (error: unknown) {
    dispatch({ type: NOTES_FETCH_FAILURE });
    dispatch(showSnackbar('error', 'Failed to fetch notes'));
  }
};

// JSON Server v1.0+ removed support for query operators like _like, _gte, etc.
// See: https://github.com/typicode/json-server/tree/v0?tab=readme-ov-file#operators
// Issue discussion: https://stackoverflow.com/questions/77867124/json-server-get-poststitle-like-server-not-working
// Alternative: implement client-side filtering
// Avoiding version downgrade to maintain compatibility with latest dependencies
export const searchNotes = (query: string) => async (dispatch: Dispatch) => {
  dispatch({ type: NOTES_FETCH_LIST });
  try {
    const response = await fetchWithTimeout(`${BACKEND_ROUTE_NOTES}?title_like=${encodeURIComponent(query)}`, { method: 'GET' });
    const data = await response.json();
    dispatch({ type: NOTES_FETCH_SUCCESS, payload: data });
  } catch (error: unknown) {
    dispatch({ type: NOTES_FETCH_FAILURE });
    dispatch(showSnackbar('error', 'Failed to search notes'));
  }
};

export const addNote = (note: Omit<NoteEntity, 'id'>) => async (dispatch: Dispatch) => {
  try {
    const response = await fetchWithTimeout(`${BACKEND_ROUTE_NOTES}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(note),
    });
    const data = await response.json();
    dispatch({ type: NOTE_ADD, payload: data });
    dispatch(showSnackbar('success', `Note ${note.title} added successfully`));
  } catch (error: unknown) {
    dispatch(showSnackbar('error', 'Failed to add note'));
  }
};

export const updateNote = (note: NoteEntity) => async (dispatch: Dispatch) => {
  const { id, ...updated } = note;
  try {
    const response = await fetch(`${BACKEND_ROUTE_NOTES}/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...updated }),
    });
    const data = await response.json();
    dispatch({ type: NOTE_UPDATE, payload: data });
    dispatch(showSnackbar('success', `Note ${note.title} updated successfully`));
  } catch {
    dispatch(showSnackbar('error', 'Failed to update note'));
  }
}

// Title parameter is used only for snackbar message...
export const deleteNote = (id: number, title: string) => async (dispatch: Dispatch) => {
  try {
    await fetch(`${BACKEND_ROUTE_NOTES}/${id}`, { method: 'DELETE' });
    dispatch({ type: NOTE_DELETE, payload: { id } });
    dispatch(showSnackbar('success', `Note ${title} deleted successfully`));
  } catch {
    dispatch(showSnackbar('error', 'Failed to delete note'));
  }
}