import React, {useEffect, useState} from "react";
import {View} from "react-native";
import {ActivityIndicator, FAB, TextInput, useTheme} from "react-native-paper";
import {useAppDispatch, useAppSelector} from "@/store/hooks";
import {useLocalSearchParams} from "expo-router";
import {fetchAtividade} from "@/store/slices/atividadeSlice";

const EditAtividadeScreen = () => {
  const theme = useTheme();
  const dispatch = useAppDispatch();
  const params: { id: string } = useLocalSearchParams();

  const {atividade, loading} = useAppSelector((state) => state.atividade);

  useEffect(() => {
    dispatch(fetchAtividade(params.id));
  }, [dispatch]);

  useEffect(() => {
    setNome(atividade?.nome || "");
    setDescricao(atividade?.descricao || "");
    setCategoria(atividade?.categoria || "");
    setAssuntos(atividade?.assuntos || "");
    setAreaAplicacao(atividade?.areaAplicacao || "");
    setDataCadastro(atividade?.dataCadastro || "");
    setDataAtualizacao(atividade?.dataAtualizacao || "");
  }, [atividade]);

  const [nome, setNome] = useState("");
  const [descricao, setDescricao] = useState("");
  const [categoria, setCategoria] = useState("");
  const [assuntos, setAssuntos] = useState("");
  const [areaAplicacao, setAreaAplicacao] = useState("");
  const [dataCadastro, setDataCadastro] = useState("");
  const [dataAtualizacao, setDataAtualizacao] = useState("");

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
              value={nome}
              onChangeText={(text) => setNome(text)}
              label="Nome"
              right={<TextInput.Icon icon="close-circle-outline"/>}
              style={{marginBottom: 16}}
          />
          <TextInput
              value={descricao}
              onChangeText={(text) => setDescricao(text)}
              label="Descrição"
              right={<TextInput.Icon icon="close-circle-outline"/>}
              style={{marginBottom: 16}}
          />
          <TextInput
              value={categoria}
              onChangeText={(text) => setCategoria(text)}
              label="Categoria"
              right={<TextInput.Icon icon="close-circle-outline"/>}
              style={{marginBottom: 16}}
          />
          <TextInput
              value={assuntos}
              onChangeText={(text) => setAssuntos(text)}
              label="Assuntos"
              right={<TextInput.Icon icon="close-circle-outline"/>}
              style={{marginBottom: 16}}
          />
          <TextInput
              value={areaAplicacao}
              onChangeText={(text) => setAreaAplicacao(text)}
              label="Areas de aplicação"
              right={<TextInput.Icon icon="close-circle-outline"/>}
              style={{marginBottom: 16}}
          />
          <TextInput
              value={dataCadastro}
              onChangeText={(text) => setDataCadastro(text)}
              label="Data de Cadastro"
              right={<TextInput.Icon icon="close-circle-outline"/>}
              style={{marginBottom: 16}}
          />
          <TextInput
              value={dataAtualizacao}
              onChangeText={(text) => setDataAtualizacao(text)}
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
            onPress={() => console.log("Pressed")}
        />
      </View>
  );
};

export default EditAtividadeScreen;
