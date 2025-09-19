import { SNACKBAR_HIDE, SNACKBAR_SHOW } from "./actions";

export const showSnackbar = (type: 'success' | 'error', message: string) => ({
  type: SNACKBAR_SHOW,
  payload: { message, type }
});

export const hideSnackbar = () => ({
  type: SNACKBAR_HIDE
});