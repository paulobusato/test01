import React, {useEffect, useState} from "react";
import {View} from "react-native";

import {ActivityIndicator, FAB, TextInput, useTheme} from "react-native-paper";
import {useAppDispatch, useAppSelector} from "@/store/hooks";
import {useLocalSearchParams, useRouter} from "expo-router";
import {
  addProcedimento,
  deleteProcedimento,
  fetchProcedimento,
  updateProcedimento
} from "@/store/slices/procedimentoSlice";

const EditProcedimentoScreen = () => {
  const theme = useTheme();
  const dispatch = useAppDispatch();
  const params: { id: string } = useLocalSearchParams();
  const router = useRouter();

  const [form, setForm] = useState({
    nome: "",
  });

  const {procedimento, loading} = useAppSelector((state) => state.procedimento);

  useEffect(() => {
    dispatch(fetchProcedimento(params.id));
  }, [dispatch, params.id]);

  useEffect(() => {
    if (procedimento) {
      setForm(procedimento);
    }
  }, [procedimento]);

  const handleCreation = async () => {
    try {
      await dispatch(addProcedimento({
        ...procedimento,
        ...form,
      }));
      router.back();
    } catch {
      alert("Failed to add aluno. Please try again.");
    }
  };

  const handleSave = async () => {
    try {
      await dispatch(updateProcedimento({
        id: params.id,
        data: {
          ...procedimento,
          ...form,
        }
      }));
      router.back();
    } catch {
      alert("Failed to update aluno. Please try again.");
    }
  };

  useEffect(() => {
    // @ts-ignore
    window["handleDelete"] = async () => {
      try {
        await dispatch(deleteProcedimento(params.id));
        router.back();
      } catch {
        alert("Failed to delete aluno. Please try again.");
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

export default EditProcedimentoScreen;
