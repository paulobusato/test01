import AlunoCard from "@/components/AlunoCard";
import Quadrant from "@/components/Quadrant";
import SessaoCard from "@/components/SessaoCard";
import "@/global.css";
import React, {useEffect, useState} from "react";
import { View } from "react-native";
import { useTheme } from "react-native-paper";
import {SessaoService} from "@/api/services/SessaoService";

import { useAppSelector, useAppDispatch } from '@/store/hooks';
import { fetchAlunos } from '@/store/slices/alunoSlice';



export default function Index() {
  const theme = useTheme();
  const dispatch = useAppDispatch();

  const { alunos } = useAppSelector((state) => state.aluno);
  const [sessoes, setSessoes] = useState<any[]>([]);

  useEffect(() => {
    dispatch(fetchAlunos());
  }, [dispatch]);

  useEffect(() => {
    const fetchSessoes = async () => {
      try {
        const sessaoService = new SessaoService();
        const fetchedSessoes = await sessaoService.getSessoes();
        setSessoes(fetchedSessoes);
      } catch (error) {
        console.error('Error fetching alunos:', error);
      }
    };
    fetchSessoes().then();
  }, []);

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
