import { configureStore } from '@reduxjs/toolkit';
import counterReducer from './slices/counterSlice';
import alunoReducer from './slices/alunoSlice';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    aluno: alunoReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;