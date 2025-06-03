import AlunoCard from "@/components/AlunoCard";
import Quadrant from "@/components/Quadrant";
import SessaoCard from "@/components/SessaoCard";
import "@/global.css";
import React, {useEffect} from "react";
import { View } from "react-native";
import { useTheme } from "react-native-paper";

import { useAppSelector, useAppDispatch } from '@/store/hooks';
import { fetchAlunos } from '@/store/slices/alunoSlice';
import { fetchSessoes } from '@/store/slices/sessaoSlice';

export default function Index() {
  const theme = useTheme();
  const dispatch = useAppDispatch();

  const { alunos } = useAppSelector((state) => state.aluno);
  const { sessoes } = useAppSelector((state) => state.sessao);

  useEffect(() => {
    dispatch(fetchAlunos());
    dispatch(fetchSessoes());
  }, [dispatch]);

  return (
    <View style={{ flex: 1, backgroundColor: theme.colors.background }}>
      <Quadrant
        title="Alunos"
        data={alunos.slice(0, 2)}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <AlunoCard name={item.nome} />}
        route={"/aluno/ListAlunoScreen"}
      />
      <Quadrant
        title="Sessões"
        data={sessoes.slice(0, 4)}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <SessaoCard name={item.name} date={item.date} status={item.status} />
        )}
        route={"/sessao/ListSessaoScreen"}
      />
    </View>
  );
}
