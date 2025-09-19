import { NOTE_ADD, NOTE_DELETE, NOTE_FETCH, NOTE_FETCH_FAILURE, NOTE_FETCH_SUCCESS, NOTE_UPDATE, NOTES_FETCH_FAILURE, NOTES_FETCH_LIST, NOTES_FETCH_SUCCESS } from "../actions/actions";
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

    case NOTE_ADD:
      return {
        ...state,
        list: [...state.list, action.payload]
      };

    case NOTE_DELETE:
      return {
        ...state,
        list: state.list.filter(note => note.id !== action.payload.id),
        item: state.item?.id === action.payload.id ? null : state.item
      };

    case NOTE_UPDATE:
      return {
        ...state,
        item: action.payload,
        list: state.list.map(note =>
          note.id === action.payload.id ? action.payload : note
        )
      };

    default:
      return state;

  }
};