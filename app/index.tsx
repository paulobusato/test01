import AlunoCard from "@/components/AlunoCard";
import Quadrant from "@/components/Quadrant";
import SessaoCard from "@/components/SessaoCard";
import alunos from "@/constants/AlunoList";
import sessoes from "@/constants/SessaoList";
import "@/global.css";
import React from "react";
import { View } from "react-native";
import { useTheme } from "react-native-paper";

export default function Index() {
  const theme = useTheme();

  return (
    <View style={{ flex: 1, backgroundColor: theme.colors.background }}>
      <Quadrant
        title="Alunos"
        data={alunos.slice(0, 2)}
        keyExtractor={(item) => item.id.toString()}
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
