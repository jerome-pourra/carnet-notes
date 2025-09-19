import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { exampleReducer } from './reducers/example.reducer';
import { notesReducer } from './reducers/notes.reducer';
import { snackbarReducer } from './reducers/snackbar.reducer';

const rootReducer = combineReducers({
  example: exampleReducer,
  notes: notesReducer,
  snackbar: snackbarReducer,
})

export const store = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;