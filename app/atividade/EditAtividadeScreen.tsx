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
      alert("Failed to add aluno. Please try again.");
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
      alert("Failed to update aluno. Please try again.");
    }
  };

  useEffect(() => {
    // @ts-ignore
    window["handleDelete"] = async () => {
      try {
        await dispatch(deleteAtividade(params.id));
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
              value={form.nome}
              onChangeText={(text) => setForm({...form, nome: text})}
              label="Nome"
              right={<TextInput.Icon icon="close-circle-outline"/>}
              style={{marginBottom: 16}}
          />
          <TextInput
              value={form.descricao}
              onChangeText={(text) => setForm({...form, descricao: text})}
              label="Descrição"
              right={<TextInput.Icon icon="close-circle-outline"/>}
              style={{marginBottom: 16}}
          />
          <TextInput
              value={form.categoria}
              onChangeText={(text) => setForm({...form, categoria: text})}
              label="Categoria"
              right={<TextInput.Icon icon="close-circle-outline"/>}
              style={{marginBottom: 16}}
          />
          <TextInput
              value={form.assuntos}
              onChangeText={(text) => setForm({...form, assuntos: text})}
              label="Assuntos"
              right={<TextInput.Icon icon="close-circle-outline"/>}
              style={{marginBottom: 16}}
          />
          <TextInput
              value={form.areaAplicacao}
              onChangeText={(text) => setForm({...form, areaAplicacao: text})}
              label="Areas de aplicação"
              right={<TextInput.Icon icon="close-circle-outline"/>}
              style={{marginBottom: 16}}
          />
          <TextInput
              value={form.dataCadastro}
              onChangeText={(text) => setForm({...form, dataCadastro: text})}
              label="Data de Cadastro"
              right={<TextInput.Icon icon="close-circle-outline"/>}
              style={{marginBottom: 16}}
          />
          <TextInput
              value={form.dataAtualizacao}
              onChangeText={(text) => setForm({...form, dataAtualizacao: text})}
              label="Data de Atualização"
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

export default EditAtividadeScreen;
