import { NOTE_DELETE, NOTE_FETCH, NOTE_FETCH_FAILURE, NOTE_FETCH_SUCCESS, NOTE_UPDATE, NOTES_FETCH_FAILURE, NOTES_FETCH_LIST, NOTES_FETCH_SUCCESS } from "../actions/actions";
import { NoteState } from "../types/notes.type";

const initialState: NoteState = {
  loading: false,
  item: null,
  list: [],
};

export const notesReducer = (state = initialState, action: any) => {
  switch (action.type) {

    case NOTE_FETCH:
      return { ...state, loading: true };
    case NOTE_FETCH_SUCCESS:
      return { ...state, loading: false, item: action.payload };
    case NOTE_FETCH_FAILURE:
      return { ...state, loading: false, item: null };

    case NOTES_FETCH_LIST:
      return { ...state, loading: true };
    case NOTES_FETCH_SUCCESS:
      return { ...state, loading: false, list: action.payload };
    case NOTES_FETCH_FAILURE:
      return { ...state, loading: false, list: [] };

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