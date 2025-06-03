import { configureStore } from '@reduxjs/toolkit';
import counterReducer from './slices/counterSlice';
import alunoReducer from './slices/alunoSlice';
import sessaoReducer from './slices/sessaoSlice';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    aluno: alunoReducer,
    sessao: sessaoReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;