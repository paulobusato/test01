import AlunoCard from "@/components/AlunoCard";
import Quadrant from "@/components/Quadrant";
import SessaoCard from "@/components/SessaoCard";
import sessoes from "@/constants/SessaoList";
import "@/global.css";
import React, {useEffect, useState} from "react";
import { View } from "react-native";
import { useTheme } from "react-native-paper";
import {AlunoService} from "@/api/services/AlunoService";

export default function Index() {
  const theme = useTheme();

  const [alunos, setAlunos] = useState<any[]>([])

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

  return (
    <View style={{ flex: 1, backgroundColor: theme.colors.background }}>
      <Quadrant
        title="Alunos"
        data={alunos.slice(0, 2)}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <AlunoCard name={item.name} />}
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
