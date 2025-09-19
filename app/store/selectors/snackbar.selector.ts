import { SnackbarState } from "../reducers/snackbar.reducer";
import { RootState } from "../store";

export const snackbarSelector = (state: RootState): SnackbarState => state.snackbar;