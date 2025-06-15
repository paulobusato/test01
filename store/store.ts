import { configureStore } from '@reduxjs/toolkit';
import counterReducer from './slices/counterSlice';
import alunoReducer from './slices/alunoSlice';
import sessaoReducer from './slices/sessaoSlice';
import bairroReducer from './slices/bairroSlice';
import cidadeReducer from './slices/cidadeSlice';
import escolaReducer from './slices/escolaSlice';
import estadoReducer from './slices/estadoSlice';
import logradouroReducer from './slices/logradouroSlice';
import nacionalidadeReducer from './slices/nacionalidadeSlice';
import responsavelReducer from './slices/responsavelSlice';
import turnoReducer from './slices/turnoSlice';
import atividadeReducer from './slices/atividadeSlice';
import statusReducer from './slices/statusSlice';
import procedimentoReducer from './slices/procedimentoSlice';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    aluno: alunoReducer,
    sessao: sessaoReducer,
    bairro: bairroReducer,
    cidade: cidadeReducer,
    escola: escolaReducer,
    estado: estadoReducer,
    logradouro: logradouroReducer,
    nacionalidade: nacionalidadeReducer,
    responsavel: responsavelReducer,
    turno: turnoReducer,
    atividade: atividadeReducer,
    status: statusReducer,
    procedimento: procedimentoReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;