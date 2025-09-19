import { BACKEND_ROUTE_NOTES } from "@/app/config";
import { Dispatch } from "@reduxjs/toolkit";
import { NoteEntity } from "../types/notes.type";
import { NOTE_DELETE, NOTE_UPDATE, NOTES_FETCH_FAILURE, NOTES_FETCH_LIST, NOTES_FETCH_SUCCESS } from "./actions";
import { showSnackbar } from "./snackbar.action";

export const fetchNotes = (userId: number) => async (dispatch: Dispatch) => {
  dispatch({ type: NOTES_FETCH_LIST });
  try {
    const response = await fetch(`${BACKEND_ROUTE_NOTES}?userId=${userId}`, { method: 'GET' });
    const data = await response.json();
    dispatch({ type: NOTES_FETCH_SUCCESS, payload: data });
  } catch {
    dispatch({ type: NOTES_FETCH_FAILURE });
    dispatch(showSnackbar('error', 'Failed to fetch notes'));
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

export const deleteNote = (note: NoteEntity) => async (dispatch: Dispatch) => {
  try {
    await fetch(`${BACKEND_ROUTE_NOTES}/${note.id}`, { method: 'DELETE' });
    dispatch({ type: NOTE_DELETE, payload: { id: note.id } });
    dispatch(showSnackbar('success', `Note ${note.title} deleted successfully`));
  } catch {
    dispatch(showSnackbar('error', 'Failed to delete note'));
  }
}