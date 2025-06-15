import SearchInput from "@/components/SearchInput";
import React, {useEffect} from "react";
import {FlatList, View} from "react-native";

import {FAB, useTheme} from "react-native-paper";
import {useAppDispatch, useAppSelector} from "@/store/hooks";
import {addAluno, fetchAlunos} from "@/store/slices/alunoSlice";
import {useLocalSearchParams, useRouter} from "expo-router";
import NameCard from "@/components/NameCard";
import {updateSessao} from "@/store/slices/sessaoSlice";

const ListAlunoScreen = () => {
  const theme = useTheme();
  const dispatch = useAppDispatch();
  const params: { id: string } = useLocalSearchParams();
  const router = useRouter();

  const [text, setText] = React.useState("");

  const {alunos} = useAppSelector((state) => state.aluno);

  useEffect(() => {
    dispatch(fetchAlunos());
  }, [dispatch]);

  const handleClick = async (nome: string) => {
    dispatch(updateSessao({
      id: params.id,
      data: {
        nome: nome,
      }
    }));
    router.back();
  }

  return (
      <View style={{flex: 1, backgroundColor: theme.colors.background}}>
        <View style={{padding: 16}}>
          <SearchInput value={text} onValueChange={setText}/>
          <FlatList
              data={alunos.filter((aluno) =>
                  aluno.nome.toLowerCase().includes(text.toLowerCase())
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
