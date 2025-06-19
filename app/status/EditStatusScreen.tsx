import React, {useEffect, useState} from "react";
import {View} from "react-native";

import {ActivityIndicator, FAB, TextInput, useTheme} from "react-native-paper";
import {useAppDispatch, useAppSelector} from "@/store/hooks";
import {useLocalSearchParams, useRouter} from "expo-router";
import {addStatus, deleteStatus, fetchStatus, updateStatus} from "@/store/slices/statusSlice";

const EditStatusScreen = () => {
  const theme = useTheme();
  const dispatch = useAppDispatch();
  const params: { id: string } = useLocalSearchParams();
  const router = useRouter();

  const [form, setForm] = useState({
    nome: "",
  });

  const {status, loading} = useAppSelector((state) => state.status);

  useEffect(() => {
    dispatch(fetchStatus(params.id));
  }, [dispatch, params.id]);

  useEffect(() => {
    if (status) {
      setForm(status);
    }
  }, [status]);

  const handleCreation = async () => {
    try {
      await dispatch(addStatus({
        ...status,
        ...form,
      }));
      router.back();
    } catch {
      alert("Ocorreu um erro ao adicionar o status.");
    }
  };

  const handleSave = async () => {
    try {
      await dispatch(updateStatus({
        id: params.id,
        data: {
          ...status,
          ...form,
        }
      }));
      router.back();
    } catch {
      alert("Ocorreu um erro ao atualizar o status.");
    }
  };

  useEffect(() => {
    // @ts-ignore
    window["handleDelete"] = async () => {
      try {
        await dispatch(deleteStatus(params.id));
        router.back();
      } catch {
        alert("Ocorreu um erro ao deletar o status.");
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
              right={<TextInput.Icon icon="close-circle-outline" onPress={(text) => setForm({...form, nome: ""})}/>}
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

export default EditStatusScreen;
