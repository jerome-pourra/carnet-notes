import { SNACKBAR_HIDE, SNACKBAR_SHOW } from "../actions/actions";

export type SnackbarState = {
  show: boolean;
  type: 'success' | 'error' | null;
  message: string | null;
}

const snackbarState: SnackbarState = {
  show: false,
  type: null,
  message: null,
};

export const snackbarReducer = (state = snackbarState, action: any) => {
  switch (action.type) {
    case SNACKBAR_SHOW:
      return {
        ...state,
        show: true,
        type: action.payload.type,
        message: action.payload.message,
      };
    case SNACKBAR_HIDE:
      return {
        ...state,
        show: false,
        type: null,
        message: null,
      };
    default:
      return state;
  }
}