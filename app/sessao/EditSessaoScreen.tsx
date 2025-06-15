import React, {useEffect, useState} from "react";
import {View} from "react-native";

import {ActivityIndicator, FAB, TextInput, useTheme} from "react-native-paper";
import {useLocalSearchParams, useRouter} from "expo-router";
import {useAppDispatch, useAppSelector} from "@/store/hooks";
import {addSessao, deleteSessao, fetchSessao, updateSessao} from "@/store/slices/sessaoSlice";

const EditSessaoScreen = () => {
  const theme = useTheme();
  const dispatch = useAppDispatch();
  const params: { id: string } = useLocalSearchParams();
  const router = useRouter();

  const {sessao, loading} = useAppSelector((state) => state.sessao);

  const [form, setForm] = useState({
    nome: "",
    queixa: "",
    encaminhamento: "",
    atividade: "",
    observacao: "",
    date: "",
    status: "",
    procedimento: "",
  });

  useEffect(() => {
    dispatch(fetchSessao(params.id));
  }, [dispatch, params.id]);

  useEffect(() => {
    if (sessao) {
      setForm(sessao);
    }
  }, [sessao]);

  const handleCreation = async () => {
    try {
      // @ts-ignore
      await dispatch(addSessao({
        ...sessao,
        ...form,
      }));
      router.back();
    } catch {
      alert("Failed to add aluno. Please try again.");
    }
  };

  const handleSave = async () => {
    try {

      await dispatch(updateSessao({
        id: params.id,
        // @ts-ignore
        data: {
          ...sessao,
          ...form,
        }
      }));
    } catch {
      alert("Failed to update aluno. Please try again.");
    }
  };

  const handleSaveAndBack = async () => {
    try {
      await dispatch(updateSessao({
        id: params.id,
        // @ts-ignore
        data: {
          ...sessao,
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
        await dispatch(deleteSessao(params.id));
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
              left={<TextInput.Icon icon="magnify"
                                    onPress={async () => {
                                      await handleSave()
                                      router.push({
                                        pathname: "/aluno/ListAlunoScreen",
                                        params: {
                                          id: params.id,
                                        }
                                      })
                                    }}/>}
              label="Aluno"
              right={<TextInput.Icon icon="close-circle-outline"/>}
              editable={false}
              style={{marginBottom: 16}}
          />
          <TextInput
              value={form.atividade}
              onChangeText={(text) => setForm({...form, atividade: text})}
              left={<TextInput.Icon icon="magnify"
                                    onPress={async () => {
                                      await handleSave()
                                      router.push({
                                        pathname: "/atividade/ListAtividadeScreen",
                                        params: {
                                          id: params.id,
                                        }
                                      })
                                    }}/>}
              label="Atividade"
              right={<TextInput.Icon icon="close-circle-outline"/>}
              editable={false}
              style={{marginBottom: 16}}
          />
          <TextInput
              value={form.status}
              onChangeText={(text) => setForm({...form, status: text})}
              left={<TextInput.Icon icon="magnify"
                                    onPress={async () => {
                                      await handleSave()
                                      router.push({
                                        pathname: "/status/ListStatusScreen",
                                        params: {
                                          id: params.id,
                                        }
                                      })
                                    }}/>}
              label="Status"
              right={<TextInput.Icon icon="close-circle-outline"/>}
              editable={false}
              style={{marginBottom: 16}}
          />
          <TextInput
              value={form.procedimento}
              onChangeText={(text) => setForm({...form, procedimento: text})}
              left={<TextInput.Icon icon="magnify"
                                    onPress={async () => {
                                      await handleSave()
                                      router.push({
                                        pathname: "/procedimento/ListProcedimentoScreen",
                                        params: {
                                          id: params.id,
                                        }
                                      })
                                    }}/>}
              label="Procedimento"
              right={<TextInput.Icon icon="close-circle-outline"/>}
              editable={false}
              style={{marginBottom: 16}}
          />
          <TextInput
              value={form.date}
              onChangeText={(text) => setForm({...form, date: text})}
              label="Data e Hora"
              right={<TextInput.Icon icon="close-circle-outline"/>}
              style={{marginBottom: 16}}
          />
          <TextInput
              value={form.queixa}
              onChangeText={(text) => setForm({...form, queixa: text})}
              label="Queixa"
              right={<TextInput.Icon icon="close-circle-outline"/>}
              multiline={true}
              numberOfLines={5}
              style={{marginBottom: 16, minHeight: 100}}
          />
          <TextInput
              value={form.encaminhamento}
              onChangeText={(text) => setForm({...form, encaminhamento: text})}
              label="Encaminhamento"
              right={<TextInput.Icon icon="close-circle-outline"/>}
              multiline={true}
              numberOfLines={5}
              style={{marginBottom: 16, minHeight: 100}}
          />
          <TextInput
              value={form.observacao}
              onChangeText={(text) => setForm({...form, observacao: text})}
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
            onPress={params.id ? handleSaveAndBack : handleCreation}
        />
      </View>
  );
};

export default EditSessaoScreen;
