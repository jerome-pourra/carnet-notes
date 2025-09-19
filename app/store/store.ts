import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { exampleReducer } from './reducers/example.reducer';

const rootReducer = combineReducers({
  example: exampleReducer,
})

export const store = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;