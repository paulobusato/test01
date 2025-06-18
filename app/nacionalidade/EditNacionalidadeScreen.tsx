import React, {useEffect, useState} from "react";
import {View} from "react-native";

import {ActivityIndicator, FAB, TextInput, useTheme} from "react-native-paper";
import {useAppDispatch, useAppSelector} from "@/store/hooks";
import {useLocalSearchParams, useRouter} from "expo-router";
import {
  addNacionalidade,
  deleteNacionalidade,
  fetchNacionalidade,
  updateNacionalidade
} from "@/store/slices/nacionalidadeSlice";

const EditNacionalidadeScreen = () => {
  const theme = useTheme();
  const dispatch = useAppDispatch();
  const params: { id: string } = useLocalSearchParams();
  const router = useRouter();

  const [form, setForm] = useState({
    nome: "",
  });

  const {nacionalidade, loading} = useAppSelector((state) => state.nacionalidade);

  useEffect(() => {
    dispatch(fetchNacionalidade(params.id));
  }, [dispatch, params.id]);

  useEffect(() => {
    if (nacionalidade) {
      setForm(nacionalidade);
    }
  }, [nacionalidade]);

  const handleCreation = async () => {
    try {
      await dispatch(addNacionalidade({
        ...nacionalidade,
        ...form,
      }));
      router.back();
    } catch {
      alert("Ocorreu um erro ao adicionar a nacionalidade.");
    }
  };

  const handleSave = async () => {
    try {
      await dispatch(updateNacionalidade({
        id: params.id,
        data: {
          ...nacionalidade,
          ...form,
        }
      }));
      router.back();
    } catch {
      alert("Ocorreu um erro ao atualizar a nacionalidade.");
    }
  };

  useEffect(() => {
    // @ts-ignore
    window["handleDelete"] = async () => {
      try {
        await dispatch(deleteNacionalidade(params.id));
        router.back();
      } catch {
        alert("Ocorreu um erro ao deletar a nacionalidade.");
      }
    };

    return () => {
      // @ts-ignore
      delete window["handleDelete"];
    };
  }, [dispatch, params.id, router]);


  if (loading) {
    return (
        <View
            style={{flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: theme.colors.background}}>
          <ActivityIndicator animating={true} size="large" color={theme.colors.primary}/>
        </View>
    );
  }

  return (
      <View style={{flex: 1, backgroundColor: theme.colors.background}}>
        <View style={{padding: 16}}>
          <TextInput
              mode={"outlined"}
              value={form.nome}
              onChangeText={(text) => setForm({...form, nome: text})}
              label="Nome"
              right={<TextInput.Icon icon="close-circle-outline"/>}
              style={{marginBottom: 16}}
          />
        </View>
        <FAB
            icon="check"
            style={{
              position: "absolute",
              margin: 16,
              right: 0,
              bottom: 0,
            }}
            onPress={params.id ? handleSave : handleCreation}
        />
      </View>
  );
};

export default EditNacionalidadeScreen;
