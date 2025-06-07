import React, {useEffect, useState} from "react";
import {View} from "react-native";

import {ActivityIndicator, FAB, TextInput, useTheme} from "react-native-paper";
import {useLocalSearchParams, useRouter} from "expo-router";
import {useAppDispatch, useAppSelector} from "@/store/hooks";
import {fetchSessao} from "@/store/slices/sessaoSlice";

const EditSessaoScreen = () => {
  const theme = useTheme();
  const dispatch = useAppDispatch();
  const params: { id: string } = useLocalSearchParams();
  const router = useRouter();

  const {sessao, loading} = useAppSelector((state) => state.sessao);

  useEffect(() => {
    dispatch(fetchSessao(params.id));
  }, [dispatch]);

  useEffect(() => {
    if (sessao) {
      setAluno(sessao.name || "");
      setQueixa(sessao.queixa || "");
      setEncaminhamento(sessao.encaminhamento || "");
      setAtividade(sessao.atividade || "");
      setObservacao(sessao.observacao || "");
      setData(sessao.date || "");
      setStatus(sessao.status || "");
      setProcedimento(sessao.procedimento || "");
    }
  }, [sessao]);

  const [aluno, setAluno] = useState("");
  const [queixa, setQueixa] = useState("");
  const [encaminhamento, setEncaminhamento] = useState("");
  const [atividade, setAtividade] = useState("");
  const [observacao, setObservacao] = useState("");
  const [data, setData] = useState("");
  const [status, setStatus] = useState("");
  const [procedimento, setProcedimento] = useState("");

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
              value={aluno}
              onChangeText={(text) => setAluno(text)}
              left={<TextInput.Icon icon="magnify" onPress={() => router.push("//aluno/ListAlunoScreen")}/>}
              label="Aluno"
              right={<TextInput.Icon icon="close-circle-outline"/>}
              editable={false}
              style={{marginBottom: 16}}
          />
          <TextInput
              value={atividade}
              onChangeText={(text) => setAtividade(text)}
              left={<TextInput.Icon icon="magnify" onPress={() => router.push("/atividade/ListAtividadeScreen")}/>}
              label="Atividade"
              right={<TextInput.Icon icon="close-circle-outline"/>}
              editable={false}
              style={{marginBottom: 16}}
          />
          <TextInput
              value={status}
              onChangeText={(text) => setStatus(text)}
              left={<TextInput.Icon icon="magnify"/>}
              label="Status"
              right={<TextInput.Icon icon="close-circle-outline"/>}
              editable={false}
              style={{marginBottom: 16}}
          />
          <TextInput
              value={procedimento}
              onChangeText={(text) => setProcedimento(text)}
              left={<TextInput.Icon icon="magnify"/>}
              label="Procedimento"
              right={<TextInput.Icon icon="close-circle-outline"/>}
              editable={false}
              style={{marginBottom: 16}}
          />
          <TextInput
              value={data}
              onChangeText={(text) => setData(text)}
              label="Data e Hora"
              right={<TextInput.Icon icon="close-circle-outline"/>}
              style={{marginBottom: 16}}
          />
          <TextInput
              value={queixa}
              onChangeText={(text) => setQueixa(text)}
              label="Queixa"
              right={<TextInput.Icon icon="close-circle-outline"/>}
              multiline={true}
              numberOfLines={5}
              style={{marginBottom: 16, minHeight: 100}}
          />
          <TextInput
              value={encaminhamento}
              onChangeText={(text) => setEncaminhamento(text)}
              label="Encaminhamento"
              right={<TextInput.Icon icon="close-circle-outline"/>}
              multiline={true}
              numberOfLines={5}
              style={{marginBottom: 16, minHeight: 100}}
          />
          <TextInput
              value={observacao}
              onChangeText={(text) => setObservacao(text)}
              label="Observação"
              right={<TextInput.Icon icon="close-circle-outline"/>}
              multiline={true}
              numberOfLines={5}
              style={{marginBottom: 16, minHeight: 100}}
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

export default EditSessaoScreen;
