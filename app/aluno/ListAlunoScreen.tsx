import AlunoCard from "@/components/AlunoCard";
import SearchInput from "@/components/SearchInput";
import alunos from "@/constants/AlunoList";
import React from "react";
import { FlatList, View } from "react-native";

import { FAB, useTheme } from "react-native-paper";

const ListAlunoScreen = () => {
  const theme = useTheme();
  const [text, setText] = React.useState("");

  return (
    <View style={{ flex: 1, backgroundColor: theme.colors.background }}>
      <View style={{ padding: 16 }}>
        <SearchInput value={text} onValueChange={setText} />
        <FlatList
          data={alunos}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => <AlunoCard name={item.nome} />}
        />
      </View>
      <FAB
        icon="plus"
        label="Aluno"
        style={{
          position: "absolute",
          margin: 16,
          right: 0,
          bottom: 0,
        }}
        onPress={() => console.log("Pressed")}
      />
    </View>
  );
};

export default ListAlunoScreen;
