import React, {useEffect, useState} from "react";
import {View} from "react-native";

import {ActivityIndicator, FAB, SegmentedButtons, TextInput, useTheme} from "react-native-paper";
import {useAppDispatch, useAppSelector} from "@/store/hooks";
import {useLocalSearchParams, useRouter} from "expo-router";
import {addResponsavel, deleteResponsavel, fetchResponsavel, updateResponsavel} from "@/store/slices/responsavelSlice";

const EditResponsavelScreen = () => {
  const theme = useTheme();
  const dispatch = useAppDispatch();
  const params: { id: string } = useLocalSearchParams();
  const router = useRouter();

  const [tab, setTab] = useState("pessoal");

  const {responsavel, loading} = useAppSelector((state) => state.responsavel);

  const [form, setForm] = useState({
    nome: "",
    nacionalidade: "",
    cpf: "",
    telefone: "",
    email: "",
    dataNascimento: "",
    rg: "",
    logradouro: "",
    numero: "",
    complemento: "",
    bairro: "",
    cep: "",
    cidade: "",
    estado: "",
  });

  useEffect(() => {
    dispatch(fetchResponsavel(params.id));
  }, [dispatch, params.id]);

  useEffect(() => {
    if (responsavel) {
      setForm(responsavel);
    }
  }, [responsavel]);

  const handleCreation = async () => {
    try {
      await dispatch(addResponsavel({
        ...responsavel,
        ...form,
      }));
      router.back();
    } catch {
      alert("Ocorreu um erro ao adicionar o responsável.");
    }
  };

  const handleSave = async () => {
    try {
      await dispatch(updateResponsavel({
        id: params.id,
        data: {
          ...responsavel,
          ...form,
        }
      }));
      router.back();
    } catch {
      alert("Ocorreu um erro ao atualizar o responsável.");
    }
  };

  useEffect(() => {
    // @ts-ignore
    window["handleDelete"] = async () => {
      try {
        await dispatch(deleteResponsavel(params.id));
        router.back();
      } catch {
        alert("Ocorreu um erro ao deletar o responsável.");
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
          <SegmentedButtons
              value={tab}
              onValueChange={setTab}
              buttons={[
                {
                  value: "pessoal",
                  label: "Pessoal",
                },
                {value: "endereco", label: "Endereço"},
              ]}
              style={{marginBottom: 16}}
          />

          {tab === "pessoal" && (
              <>
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
                    value={form.cpf}
                    onChangeText={(text) => setForm({...form, cpf: text})}
                    label="CPF"
                    right={<TextInput.Icon icon="close-circle-outline" onPress={(text) => setForm({...form, cpf: ""})}/>}
                    style={{marginBottom: 16}}
                />
                <TextInput
                    mode={"outlined"}
                    value={form.telefone}
                    onChangeText={(text) => setForm({...form, telefone: text})}
                    label="Telefone"
                    right={<TextInput.Icon icon="close-circle-outline" onPress={(text) => setForm({...form, telefone: ""})}/>}
                    style={{marginBottom: 16}}
                />
                <TextInput
                    mode={"outlined"}
                    value={form.email}
                    onChangeText={(text) => setForm({...form, email: text})}
                    label="E-mail"
                    right={<TextInput.Icon icon="close-circle-outline" onPress={(text) => setForm({...form, email: ""})}/>}
                    style={{marginBottom: 16}}
                />
                <TextInput
                    mode={"outlined"}
                    value={form.dataNascimento}
                    onChangeText={(text) => setForm({...form, dataNascimento: text})}
                    label="Data de Nascimento"
                    right={<TextInput.Icon icon="close-circle-outline" onPress={(text) => setForm({...form, dataNascimento: ""})}/>}
                    style={{marginBottom: 16}}
                />
                <TextInput
                    mode={"outlined"}
                    value={form.rg}
                    onChangeText={(text) => setForm({...form, rg: text})}
                    label="RG"
                    right={<TextInput.Icon icon="close-circle-outline" onPress={(text) => setForm({...form, rg: ""})}/>}
                    style={{marginBottom: 16}}
                />
              </>
          )}

          {tab === "endereco" && (
              <>
                <TextInput
                    mode={"outlined"}
                    value={form.logradouro}
                    onChangeText={(text) => setForm({...form, logradouro: text})}
                    left={<TextInput.Icon icon="magnify"
                                          onPress={() => router.push({
                                            pathname: "/logradouro/ListLogradouroScreen",
                                            params: {
                                              entidade: "responsavel",
                                              id: params.id,
                                            }
                                          })}/>}
                    label="Logradouro"
                    right={<TextInput.Icon icon="close-circle-outline" onPress={(text) => setForm({...form, logradouro: ""})}/>}
                    style={{marginBottom: 16}}
                />
                <TextInput
                    mode={"outlined"}
                    value={form.numero}
                    onChangeText={(text) => setForm({...form, numero: text})}
                    label="Número"
                    right={<TextInput.Icon icon="close-circle-outline" onPress={(text) => setForm({...form, numero: ""})}/>}
                    style={{marginBottom: 16}}
                />
                <TextInput
                    mode={"outlined"}
                    value={form.complemento}
                    onChangeText={(text) => setForm({...form, complemento: text})}
                    label="Complemento"
                    right={<TextInput.Icon icon="close-circle-outline" onPress={(text) => setForm({...form, complemento: ""})}/>}
                    style={{marginBottom: 16}}
                />
                <TextInput
                    mode={"outlined"}
                    value={form.bairro}
                    onChangeText={(text) => setForm({...form, bairro: text})}
                    left={<TextInput.Icon icon="magnify"
                                          onPress={() => router.push({
                                            pathname: "/bairro/ListBairroScreen",
                                            params: {
                                              entidade: "responsavel",
                                              id: params.id,
                                            }
                                          })}/>}
                    label="Bairro"
                    right={<TextInput.Icon icon="close-circle-outline" onPress={(text) => setForm({...form, bairro: ""})}/>}
                    style={{marginBottom: 16}}
                />
                <TextInput
                    mode={"outlined"}
                    value={form.cep}
                    onChangeText={(text) => setForm({...form, cep: text})}
                    label="CEP"
                    right={<TextInput.Icon icon="close-circle-outline" onPress={(text) => setForm({...form, cep: ""})}/>}
                    style={{marginBottom: 16}}
                />
                <TextInput
                    mode={"outlined"}
                    value={form.cidade}
                    onChangeText={(text) => setForm({...form, cidade: text})}
                    left={<TextInput.Icon icon="magnify"
                                          onPress={() => router.push({
                                            pathname: "/cidade/ListCidadeScreen",
                                            params: {
                                              entidade: "responsavel",
                                              id: params.id,
                                            }
                                          })}/>}
                    label="Cidade"
                    right={<TextInput.Icon icon="close-circle-outline" onPress={(text) => setForm({...form, cidade: ""})}/>}
                    style={{marginBottom: 16}}
                />
                <TextInput
                    mode={"outlined"}
                    value={form.estado}
                    onChangeText={(text) => setForm({...form, estado: text})}
                    left={<TextInput.Icon icon="magnify"
                                          onPress={() => router.push({
                                            pathname: "/estado/ListEstadoScreen",
                                            params: {
                                              entidade: "responsavel",
                                              id: params.id,
                                            }
                                          })}/>}
                    label="Estado"
                    right={<TextInput.Icon icon="close-circle-outline" onPress={(text) => setForm({...form, estado: ""})}/>}
                    style={{marginBottom: 16}}
                />
              </>
          )}
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

export default EditResponsavelScreen;
