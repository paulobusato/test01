import React, {useEffect, useState} from "react";
import {View} from "react-native";
import {ActivityIndicator, FAB, TextInput, useTheme} from "react-native-paper";
import {useAppDispatch, useAppSelector} from "@/store/hooks";
import {useLocalSearchParams, useRouter} from "expo-router";
import {addAtividade, deleteAtividade, fetchAtividade, updateAtividade} from "@/store/slices/atividadeSlice";

const EditAtividadeScreen = () => {
  const theme = useTheme();
  const dispatch = useAppDispatch();
  const params: { id: string } = useLocalSearchParams();
  const router = useRouter();

  const [form, setForm] = useState({
    nome: "",
    descricao: "",
    categoria: "",
    assuntos: "",
    areaAplicacao: "",
    dataCadastro: "",
    dataAtualizacao: "",
  });

  const {atividade, loading} = useAppSelector((state) => state.atividade);

  useEffect(() => {
    dispatch(fetchAtividade(params.id));
  }, [dispatch, params.id]);

  useEffect(() => {
    if (atividade) {
      setForm(atividade);
    }
  }, [atividade]);

  const handleCreation = async () => {
    try {
      await dispatch(addAtividade({
        ...atividade,
        ...form,
      }));
      router.back();
    } catch {
      alert("Ocorreu um erro ao adicionar a atividade.");
    }
  };

  const handleSave = async () => {
    try {
      await dispatch(updateAtividade({
        id: params.id,
        data: {
          ...atividade,
          ...form,
        }
      }));
      router.back();
    } catch {
      alert("Ocorreu um erro ao atualizar a atividade.");
    }
  };

  useEffect(() => {
    // @ts-ignore
    window["handleDelete"] = async () => {
      try {
        await dispatch(deleteAtividade(params.id));
        router.back();
      } catch {
        alert("Ocorreu um erro ao deletar a atividade.");
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
          <TextInput
              mode={"outlined"}
              value={form.descricao}
              onChangeText={(text) => setForm({...form, descricao: text})}
              label="Descrição"
              right={<TextInput.Icon icon="close-circle-outline" onPress={(text) => setForm({...form, descricao: ""})}/>}
              style={{marginBottom: 16}}
          />
          <TextInput
              mode={"outlined"}
              value={form.categoria}
              onChangeText={(text) => setForm({...form, categoria: text})}
              label="Categoria"
              right={<TextInput.Icon icon="close-circle-outline" onPress={(text) => setForm({...form, categoria: ""})}/>}
              style={{marginBottom: 16}}
          />
          <TextInput
              mode={"outlined"}
              value={form.assuntos}
              onChangeText={(text) => setForm({...form, assuntos: text})}
              label="Assunto"
              right={<TextInput.Icon icon="close-circle-outline" onPress={(text) => setForm({...form, assuntos: ""})}/>}
              style={{marginBottom: 16}}
          />
          <TextInput
              mode={"outlined"}
              value={form.areaAplicacao}
              onChangeText={(text) => setForm({...form, areaAplicacao: text})}
              label="Areas de aplicação"
              right={<TextInput.Icon icon="close-circle-outline" onPress={(text) => setForm({...form, areaAplicacao: ""})}/>}
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

export default EditAtividadeScreen;
