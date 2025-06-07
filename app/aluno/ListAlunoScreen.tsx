import AlunoCard from "@/components/AlunoCard";
import SearchInput from "@/components/SearchInput";
import React, {useEffect} from "react";
import { FlatList, View } from "react-native";

import { FAB, useTheme } from "react-native-paper";
import {useAppDispatch, useAppSelector} from "@/store/hooks";
import {fetchAlunos} from "@/store/slices/alunoSlice";
import {useRouter} from "expo-router";

const ListAlunoScreen = () => {
  const theme = useTheme();
  const dispatch = useAppDispatch();
  const router = useRouter();

  const [text, setText] = React.useState("");

  const { alunos } = useAppSelector((state) => state.aluno);

  useEffect(() => {
    dispatch(fetchAlunos());
  }, [dispatch]);

  return (
    <View style={{ flex: 1, backgroundColor: theme.colors.background }}>
      <View style={{ padding: 16 }}>
        <SearchInput value={text} onValueChange={setText} />
        <FlatList
          data={alunos}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => <AlunoCard id={item.id} name={item.nome} />}
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
        onPress={() => router.push("/aluno/EditAlunoScreen")}
      />
    </View>
  );
};

export default ListAlunoScreen;
