import React, {useEffect, useState} from "react";
import {View} from "react-native";
import {ActivityIndicator, FAB, SegmentedButtons, TextInput, useTheme} from "react-native-paper";
import {useLocalSearchParams, useRouter} from "expo-router";
import {useAppDispatch, useAppSelector} from "@/store/hooks";
import {addAluno, deleteAluno, fetchAluno, updateAluno} from "@/store/slices/alunoSlice";

const EditAlunoScreen = () => {
  const theme = useTheme();
  const dispatch = useAppDispatch();
  const params: { id: string } = useLocalSearchParams();
  const router = useRouter();

  const [tab, setTab] = useState("pessoal");

  const {aluno, loading} = useAppSelector((state) => state.aluno);

  const [form, setForm] = useState({
    nome: "",
    responsavel: "",
    cpf: "",
    telefone: "",
    email: "",
    dataNascimento: "",
    rg: "",
    escola: "",
    serie: "",
    turno: "",
    logradouro: "",
    numero: "",
    complemento: "",
    bairro: "",
    cep: "",
    cidade: "",
    estado: "",
  });

  useEffect(() => {
    dispatch(fetchAluno(params.id));
  }, [dispatch, params.id]);

  useEffect(() => {
    if (aluno) {
      setForm(aluno);
    }
  }, [aluno]);

  const handleCreation = async () => {
    try {
      await dispatch(addAluno({
        ...aluno,
        ...form,
      }));
      router.back();
    } catch {
      alert("Ocorreu um erro ao adicionar o aluno.");
    }
  };

  const handleSave = async () => {
    try {
      await dispatch(updateAluno({
        id: params.id,
        data: {
          ...aluno,
          ...form,
        }
      }));
    } catch {
      alert("Ocorreu um erro ao atualizar o aluno.");
    }
  };

  const handleSaveAndBack = async () => {
    try {
      await dispatch(updateAluno({
        id: params.id,
        data: {
          ...aluno,
          ...form,
        }
      }));
      router.back();
    } catch {
      alert("Ocorreu um erro ao atualizar o aluno.");
    }
  };

  useEffect(() => {
    // @ts-ignore
    window["handleDelete"] = async () => {
      try {
        await dispatch(deleteAluno(params.id));
        router.back();
      } catch {
        alert("Ocorreu um erro ao deletar o aluno.");
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
                {
                  value: "escolar",
                  label: "Escolar",
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
                    value={form.responsavel}
                    onChangeText={(text) => setForm({...form, responsavel: text})}
                    readOnly={true}
                    left={<TextInput.Icon icon="magnify"
                                          onPress={async () => {
                                            await handleSave()
                                            router.push({
                                              pathname: "/responsavel/ListResponsavelScreen",
                                              params: {id: params.id}
                                            })
                                          }
                                          }/>}
                    label="Responsável"
                    right={<TextInput.Icon icon="close-circle-outline" onPress={(text) => setForm({...form, responsavel: ""})}/>}
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

          {tab === "escolar" && (
              <>
                <TextInput
                    mode={"outlined"}
                    value={form.escola}
                    onChangeText={(text) => setForm({...form, escola: text})}
                    readOnly={true}
                    left={<TextInput.Icon icon="magnify"
                                          onPress={async () => {
                                            await handleSave()
                                            router.push({
                                              pathname: "/escola/ListEscolaScreen",
                                              params: {id: params.id}
                                            });
                                          }}/>}
                    label="Escola"
                    right={<TextInput.Icon icon="close-circle-outline" onPress={(text) => setForm({...form, escola: ""})}/>}
                    style={{marginBottom: 16}}
                />
                <TextInput
                    mode={"outlined"}
                    value={form.serie}
                    onChangeText={(text) => setForm({...form, serie: text})}
                    label="Série"
                    right={<TextInput.Icon icon="close-circle-outline" onPress={(text) => setForm({...form, serie: ""})}/>}
                    style={{marginBottom: 16}}
                />
                <TextInput
                    mode={"outlined"}
                    value={form.turno}
                    onChangeText={(text) => setForm({...form, turno: text})}
                    readOnly={true}
                    left={<TextInput.Icon icon="magnify"
                                          onPress={async () => {
                                            await handleSave()
                                            router.push({
                                              pathname: "/turno/ListTurnoScreen",
                                              params: {id: params.id}
                                            })
                                          }}/>}
                    label="Turno"
                    right={<TextInput.Icon icon="close-circle-outline" onPress={(text) => setForm({...form, turno: ""})}/>}
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
                    readOnly={true}
                    left={<TextInput.Icon icon="magnify"
                                          onPress={async () => {
                                            await handleSave()
                                            router.push({
                                              pathname: "/logradouro/ListLogradouroScreen",
                                              params: {
                                                entidade: "aluno",
                                                id: params.id,
                                              }
                                            })
                                          }}/>}
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
                    readOnly={true}
                    left={<TextInput.Icon icon="magnify"
                                          onPress={async () => {
                                            await handleSave()
                                            router.push({
                                              pathname: "/bairro/ListBairroScreen",
                                              params: {
                                                entidade: "aluno",
                                                id: params.id,
                                              }
                                            })
                                          }}/>}
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
                    readOnly={true}
                    left={<TextInput.Icon icon="magnify"
                                          onPress={async () => {
                                            await handleSave()
                                            router.push({
                                              pathname: "/cidade/ListCidadeScreen",
                                              params: {
                                                entidade: "aluno",
                                                id: params.id,
                                              }
                                            })
                                          }}/>}
                    label="Cidade"
                    right={<TextInput.Icon icon="close-circle-outline" onPress={(text) => setForm({...form, cidade: ""})}/>}
                    style={{marginBottom: 16}}
                />
                <TextInput
                    mode={"outlined"}
                    value={form.estado}
                    onChangeText={(text) => setForm({...form, estado: text})}
                    readOnly={true}
                    left={<TextInput.Icon icon="magnify"
                                          onPress={async () => {
                                            await handleSave()
                                            router.push({
                                              pathname: "/estado/ListEstadoScreen",
                                              params: {
                                                entidade: "aluno",
                                                id: params.id,
                                              }
                                            })
                                          }}/>}
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
            onPress={params.id ? handleSaveAndBack : handleCreation}
        />
      </View>
  );
};

export default EditAlunoScreen;
