import { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addNote, deleteNote, fetchNote, fetchNotes, updateNote } from '../store/actions/notes.action';
import { notesSelector } from '../store/selectors/notes.selector';
import { AppDispatch } from '../store/store';
import { NoteEntity } from '../store/types/notes.type';

export const useNotes = () => {
  const { loading, list, item } = useSelector(notesSelector);
  const dispatch = useDispatch<AppDispatch>();

  const fetchAllNotes = useCallback(() => {
    dispatch(fetchNotes());
  }, [dispatch]);

  const fetchSingleNote = useCallback((id: number) => {
    dispatch(fetchNote(id));
  }, [dispatch]);

  const createNote = useCallback(async (note: Omit<NoteEntity, 'id'>) => {
    await dispatch(addNote(note));
  }, [dispatch]);

  const editNote = useCallback(async (note: NoteEntity) => {
    await dispatch(updateNote(note));
  }, [dispatch]);

  const removeNote = useCallback(async (id: number, title: string) => {
    await dispatch(deleteNote(id, title));
  }, [dispatch]);

  // Auto-fetch notes on hook initialization
  useEffect(() => {
    fetchAllNotes();
  }, [fetchAllNotes]);

  return {
    loading,
    notes: list,
    selectedNote: item,
    hasNotes: list.length > 0,

    fetchAllNotes,
    fetchSingleNote,
    createNote,
    editNote,
    removeNote,
  };
};