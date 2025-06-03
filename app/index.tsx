import AlunoCard from "@/components/AlunoCard";
import Quadrant from "@/components/Quadrant";
import SessaoCard from "@/components/SessaoCard";
import "@/global.css";
import React, {useEffect, useState} from "react";
import { View } from "react-native";
import { useTheme } from "react-native-paper";
import {AlunoService} from "@/api/services/AlunoService";
import {SessaoService} from "@/api/services/SessaoService";

import { useAppSelector, useAppDispatch } from '../store/hooks';
import { increment, decrement } from '../store/slices/counterSlice';


export default function Index() {
  const theme = useTheme();

  const [alunos, setAlunos] = useState<any[]>([]);
  const [sessoes, setSessoes] = useState<any[]>([]);

  useEffect(() => {
    const fetchAlunos = async () => {
      try {
        const alunoService = new AlunoService();
        const fetchedAlunos = await alunoService.getAlunos();
        setAlunos(fetchedAlunos);
      } catch (error) {
        console.error('Error fetching alunos:', error);
      }
    };
    fetchAlunos().then();
  }, []);

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

  const count = useAppSelector((state) => state.counter.value);
  const dispatch = useAppDispatch();

  useEffect(() => {
    setInterval(() => {
      dispatch(increment());
    }, 1000)
  }, []);

  return (
    <View style={{ flex: 1, backgroundColor: theme.colors.background }}>
      <Quadrant
        title={`Alunos ${count}`}
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
