import React, {useEffect, useState} from "react";
import {View} from "react-native";
import {ActivityIndicator, FAB, SegmentedButtons, TextInput, useTheme} from "react-native-paper";
import {useLocalSearchParams, useRouter} from "expo-router";
import {useAppDispatch, useAppSelector} from "@/store/hooks";
import {addAluno, deleteAluno, fetchAluno, updateAluno} from "@/store/slices/alunoSlice";
import {clearResponsavel} from "@/store/slices/responsavelSlice";
import {clearEscola} from "@/store/slices/escolaSlice";
import {clearTurno} from "@/store/slices/turnoSlice";
import {clearLogradouro} from "@/store/slices/logradouroSlice";
import {clearBairro} from "@/store/slices/bairroSlice";
import {clearCidade} from "@/store/slices/cidadeSlice";
import {clearEstado} from "@/store/slices/estadoSlice";

const EditAlunoScreen = () => {
  const theme = useTheme();
  const dispatch = useAppDispatch();
  const params: { id: string } = useLocalSearchParams();
  const router = useRouter();

  const [tab, setTab] = useState("pessoal");

  const {aluno, loading: loadingAluno} = useAppSelector((state) => state.aluno);
  const {responsavel, loading: loadingResponsavel} = useAppSelector((state) => state.responsavel);

  const {escola, loading: loadingEscola} = useAppSelector((state) => state.escola);
  const {turno, loading: loadingTurno} = useAppSelector((state) => state.turno);

  const {logradouro, loading: loadingLogradouro} = useAppSelector((state) => state.logradouro);
  const {bairro, loading: loadingBairro} = useAppSelector((state) => state.bairro);
  const {cidade, loading: loadingCidade} = useAppSelector((state) => state.cidade);
  const {estado, loading: loadingEstado} = useAppSelector((state) => state.estado);

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
    if (responsavel) {
      setForm({
        ...form,
        responsavel: responsavel.nome,
      });
      dispatch(clearResponsavel())
    }
  }, [dispatch, form, responsavel]);

  useEffect(() => {
    if (escola) {
      setForm({
        ...form,
        escola: escola.nome,
      });
      dispatch(clearEscola())
    }
  }, [dispatch, form, escola]);

  useEffect(() => {
    if (turno) {
      setForm({
        ...form,
        turno: turno.nome,
      });
      dispatch(clearTurno())
    }
  }, [dispatch, form, turno]);

  useEffect(() => {
    if (logradouro) {
      setForm({
        ...form,
        logradouro: logradouro.nome,
      });
      dispatch(clearLogradouro())
    }
  }, [dispatch, form, logradouro]);

  useEffect(() => {
    if (bairro) {
      setForm({
        ...form,
        bairro: bairro.nome,
      });
      dispatch(clearBairro())
    }
  }, [dispatch, form, bairro]);

  useEffect(() => {
    if (cidade) {
      setForm({
        ...form,
        cidade: cidade.nome,
      });
      dispatch(clearCidade())
    }
  }, [dispatch, form, cidade]);

  useEffect(() => {
    if (estado) {
      setForm({
        ...form,
        estado: estado.nome,
      });
      dispatch(clearEstado())
    }
  }, [dispatch, form, estado]);

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


  if (loadingAluno || loadingResponsavel || loadingEscola || loadingTurno || loadingLogradouro || loadingBairro || loadingCidade || loadingEstado) {
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
                    right={<TextInput.Icon icon="close-circle-outline"
                                           onPress={(text) => setForm({...form, nome: ""})}/>}
                    style={{marginBottom: 16}}
                />
                <TextInput
                    mode={"outlined"}
                    value={form.responsavel}
                    onChangeText={(text) => setForm({...form, responsavel: text})}
                    readOnly={true}
                    left={<TextInput.Icon icon="magnify"
                                          onPress={async () => router.push("/responsavel/ListResponsavelScreen")}/>}
                    label="Responsável"
                    right={<TextInput.Icon icon="close-circle-outline"
                                           onPress={(text) => setForm({...form, responsavel: ""})}/>}
                    style={{marginBottom: 16}}
                />
                <TextInput
                    mode={"outlined"}
                    value={form.cpf}
                    keyboardType={"numeric"}
                    onChangeText={(text) => setForm({...form, cpf: text})}
                    label="CPF"
                    right={<TextInput.Icon icon="close-circle-outline"
                                           onPress={(text) => setForm({...form, cpf: ""})}/>}
                    style={{marginBottom: 16}}
                />
                <TextInput
                    mode={"outlined"}
                    value={form.telefone}
                    keyboardType={"numeric"}
                    onChangeText={(text) => setForm({...form, telefone: text})}
                    label="Telefone"
                    right={<TextInput.Icon icon="close-circle-outline"
                                           onPress={(text) => setForm({...form, telefone: ""})}/>}
                    style={{marginBottom: 16}}
                />
                <TextInput
                    mode={"outlined"}
                    value={form.email}
                    keyboardType={"email-address"}
                    onChangeText={(text) => setForm({...form, email: text})}
                    label="E-mail"
                    right={<TextInput.Icon icon="close-circle-outline"
                                           onPress={(text) => setForm({...form, email: ""})}/>}
                    style={{marginBottom: 16}}
                />
                <TextInput
                    mode={"outlined"}
                    value={form.dataNascimento}
                    onChangeText={(text) => setForm({...form, dataNascimento: text})}
                    label="Data de Nascimento"
                    right={<TextInput.Icon icon="close-circle-outline"
                                           onPress={(text) => setForm({...form, dataNascimento: ""})}/>}
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
                                          onPress={async () => router.push("/escola/ListEscolaScreen")}/>}
                    label="Escola"
                    right={<TextInput.Icon icon="close-circle-outline"
                                           onPress={(text) => setForm({...form, escola: ""})}/>}
                    style={{marginBottom: 16}}
                />
                <TextInput
                    mode={"outlined"}
                    value={form.serie}
                    onChangeText={(text) => setForm({...form, serie: text})}
                    label="Série"
                    right={<TextInput.Icon icon="close-circle-outline"
                                           onPress={(text) => setForm({...form, serie: ""})}/>}
                    style={{marginBottom: 16}}
                />
                <TextInput
                    mode={"outlined"}
                    value={form.turno}
                    onChangeText={(text) => setForm({...form, turno: text})}
                    readOnly={true}
                    left={<TextInput.Icon icon="magnify"
                                          onPress={async () => router.push("/turno/ListTurnoScreen")}/>}
                    label="Turno"
                    right={<TextInput.Icon icon="close-circle-outline"
                                           onPress={(text) => setForm({...form, turno: ""})}/>}
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
                                          onPress={async () => router.push("/logradouro/ListLogradouroScreen")}/>}
                    label="Logradouro"
                    right={<TextInput.Icon icon="close-circle-outline"
                                           onPress={(text) => setForm({...form, logradouro: ""})}/>}
                    style={{marginBottom: 16}}
                />
                <TextInput
                    mode={"outlined"}
                    value={form.numero}
                    onChangeText={(text) => setForm({...form, numero: text})}
                    label="Número"
                    right={<TextInput.Icon icon="close-circle-outline"
                                           onPress={(text) => setForm({...form, numero: ""})}/>}
                    style={{marginBottom: 16}}
                />
                <TextInput
                    mode={"outlined"}
                    value={form.complemento}
                    onChangeText={(text) => setForm({...form, complemento: text})}
                    label="Complemento"
                    right={<TextInput.Icon icon="close-circle-outline"
                                           onPress={(text) => setForm({...form, complemento: ""})}/>}
                    style={{marginBottom: 16}}
                />
                <TextInput
                    mode={"outlined"}
                    value={form.bairro}
                    onChangeText={(text) => setForm({...form, bairro: text})}
                    readOnly={true}
                    left={<TextInput.Icon icon="magnify"
                                          onPress={async () => router.push("/bairro/ListBairroScreen")}/>}
                    label="Bairro"
                    right={<TextInput.Icon icon="close-circle-outline"
                                           onPress={(text) => setForm({...form, bairro: ""})}/>}
                    style={{marginBottom: 16}}
                />
                <TextInput
                    mode={"outlined"}
                    value={form.cep}
                    keyboardType={"numeric"}
                    onChangeText={(text) => setForm({...form, cep: text})}
                    label="CEP"
                    right={<TextInput.Icon icon="close-circle-outline"
                                           onPress={(text) => setForm({...form, cep: ""})}/>}
                    style={{marginBottom: 16}}
                />
                <TextInput
                    mode={"outlined"}
                    value={form.cidade}
                    onChangeText={(text) => setForm({...form, cidade: text})}
                    readOnly={true}
                    left={<TextInput.Icon icon="magnify"
                                          onPress={async () => router.push("/cidade/ListCidadeScreen")}/>}
                    label="Cidade"
                    right={<TextInput.Icon icon="close-circle-outline"
                                           onPress={(text) => setForm({...form, cidade: ""})}/>}
                    style={{marginBottom: 16}}
                />
                <TextInput
                    mode={"outlined"}
                    value={form.estado}
                    onChangeText={(text) => setForm({...form, estado: text})}
                    readOnly={true}
                    left={<TextInput.Icon icon="magnify"
                                          onPress={async () => router.push("/estado/ListEstadoScreen")}/>}
                    label="Estado"
                    right={<TextInput.Icon icon="close-circle-outline"
                                           onPress={(text) => setForm({...form, estado: ""})}/>}
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
