import { NOTE_DELETE, NOTE_UPDATE, NOTES_FETCH_FAILURE, NOTES_FETCH_LIST, NOTES_FETCH_SUCCESS } from "../actions/actions";
import { NoteState } from "../types/notes.type";

const initialState: NoteState = {
  loading: false,
  list: [],
};

export const notesReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case NOTES_FETCH_LIST:
      return { ...state, loading: true };
    case NOTES_FETCH_SUCCESS:
      return { ...state, loading: false, list: action.payload };
    case NOTES_FETCH_FAILURE:
      return { ...state, loading: false, error: action.payload };
    // case NOTE_ADD:
    //   return { ...state, list: [...state.list, action.payload] };
    case NOTE_DELETE:
      return {
        ...state,
        list: state.list.filter(pkg => pkg.id !== action.payload.id)
      };
    case NOTE_UPDATE:
      return {
        ...state,
        list: state.list.map(pkg =>
          pkg.id === action.payload.id ? { ...pkg, ...action.payload } : pkg
        )
      };
    default:
      return state;
  }
};