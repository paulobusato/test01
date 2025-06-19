import SearchInput from "@/components/SearchInput";
import React, {useEffect} from "react";
import {FlatList, View} from "react-native";

import {FAB, useTheme} from "react-native-paper";
import {useAppDispatch, useAppSelector} from "@/store/hooks";
import {addAluno, fetchAluno, fetchAlunos} from "@/store/slices/alunoSlice";
import {useRouter} from "expo-router";
import NameCard from "@/components/NameCard";

const ListAlunoScreen = () => {
  const theme = useTheme();
  const dispatch = useAppDispatch();
  const router = useRouter();

  const [text, setText] = React.useState("");

  const {alunos} = useAppSelector((state) => state.aluno);

  useEffect(() => {
    dispatch(fetchAlunos());
  }, [dispatch]);

  const handleClick = async (id: string) => {
    dispatch(fetchAluno(id));
    router.back();
  }

  return (
      <View style={{flex: 1, backgroundColor: theme.colors.background}}>
        <View style={{padding: 16}}>
          <SearchInput value={text} onValueChange={setText} onRightPress={() => setText("")}/>
          <FlatList
              data={alunos.filter((aluno) => {
                    if (!aluno.nome) return true;
                    return aluno.nome.toLowerCase().includes(text.toLowerCase());
                  }
              )}
              keyExtractor={(item) => item.id.toString()}
              renderItem={({item}) => <NameCard id={item.id} name={item.nome} route={"/aluno/EditAlunoScreen"}
                                                onClick={handleClick}/>}
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
            onPress={async () => {
              const aluno = await dispatch(addAluno({})).unwrap();
              router.push({
                pathname: "/aluno/EditAlunoScreen",
                params: {id: aluno.id},
              });
            }}
        />
      </View>
  );
};

export default ListAlunoScreen;
