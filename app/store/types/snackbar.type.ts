export enum SnackbarTypes {
  SUCCESS = 'success',
  ERROR = 'error',
}

export interface SnackbarState {
  show: boolean;
  type: SnackbarTypes;
  message: string | null;
}