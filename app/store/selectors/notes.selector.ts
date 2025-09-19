import { RootState } from "../store";
import { NoteState } from "../types/notes.type";

export const notesSelector = (state: RootState): NoteState => state.notes;