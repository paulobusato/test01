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
      alert("Failed to add aluno. Please try again.");
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
      router.back();
    } catch {
      alert("Failed to update aluno. Please try again.");
    }
  };

  useEffect(() => {
    // @ts-ignore
    window["handleDelete"] = async () => {
      try {
        await dispatch(deleteAluno(params.id));
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
                    value={form.nome}
                    onChangeText={(text) => setForm({...form, nome: text})}
                    label="Nome"
                    right={<TextInput.Icon icon="close-circle-outline"/>}
                    style={{marginBottom: 16}}
                />
                <TextInput
                    value={form.responsavel}
                    onChangeText={(text) => setForm({...form, responsavel: text})}
                    left={<TextInput.Icon icon="magnify"
                                          onPress={() => router.push({
                                            pathname: "/responsavel/ListResponsavelScreen",
                                            params: {id: params.id}
                                          })}/>}
                    label="Responsável"
                    right={<TextInput.Icon icon="close-circle-outline"/>}
                    style={{marginBottom: 16}}
                />
                <TextInput
                    value={form.cpf}
                    onChangeText={(text) => setForm({...form, cpf: text})}
                    label="CPF"
                    right={<TextInput.Icon icon="close-circle-outline"/>}
                    style={{marginBottom: 16}}
                />
                <TextInput
                    value={form.telefone}
                    onChangeText={(text) => setForm({...form, telefone: text})}
                    label="Telefone"
                    right={<TextInput.Icon icon="close-circle-outline"/>}
                    style={{marginBottom: 16}}
                />
                <TextInput
                    value={form.email}
                    onChangeText={(text) => setForm({...form, email: text})}
                    label="E-mail"
                    right={<TextInput.Icon icon="close-circle-outline"/>}
                    style={{marginBottom: 16}}
                />
                <TextInput
                    value={form.dataNascimento}
                    onChangeText={(text) => setForm({...form, dataNascimento: text})}
                    label="Data de Nascimento"
                    right={<TextInput.Icon icon="close-circle-outline"/>}
                    style={{marginBottom: 16}}
                />
                <TextInput
                    value={form.rg}
                    onChangeText={(text) => setForm({...form, rg: text})}
                    label="RG"
                    right={<TextInput.Icon icon="close-circle-outline"/>}
                    style={{marginBottom: 16}}
                />
              </>
          )}

          {tab === "escolar" && (
              <>
                <TextInput
                    value={form.escola}
                    onChangeText={(text) => setForm({...form, escola: text})}
                    left={<TextInput.Icon icon="magnify"
                                          onPress={() => router.push("/escola/ListEscolaScreen")}/>}
                    label="Escola"
                    right={<TextInput.Icon icon="close-circle-outline"/>}
                    style={{marginBottom: 16}}
                />
                <TextInput
                    value={form.serie}
                    onChangeText={(text) => setForm({...form, serie: text})}
                    label="Série"
                    right={<TextInput.Icon icon="close-circle-outline"/>}
                    style={{marginBottom: 16}}
                />
                <TextInput
                    value={form.turno}
                    onChangeText={(text) => setForm({...form, turno: text})}
                    left={<TextInput.Icon icon="magnify"
                                          onPress={() => router.push("/turno/ListTurnoScreen")}/>}
                    label="Turno"
                    right={<TextInput.Icon icon="close-circle-outline"/>}
                    style={{marginBottom: 16}}
                />
              </>
          )}

          {tab === "endereco" && (
              <>
                <TextInput
                    value={form.logradouro}
                    onChangeText={(text) => setForm({...form, logradouro: text})}
                    left={<TextInput.Icon icon="magnify"
                                          onPress={() => router.push("/logradouro/ListLogradouroScreen")}/>}
                    label="Logradouro"
                    right={<TextInput.Icon icon="close-circle-outline"/>}
                    style={{marginBottom: 16}}
                />
                <TextInput
                    value={form.numero}
                    onChangeText={(text) => setForm({...form, numero: text})}
                    label="Número"
                    right={<TextInput.Icon icon="close-circle-outline"/>}
                    style={{marginBottom: 16}}
                />
                <TextInput
                    value={form.complemento}
                    onChangeText={(text) => setForm({...form, complemento: text})}
                    label="Complemento"
                    right={<TextInput.Icon icon="close-circle-outline"/>}
                    style={{marginBottom: 16}}
                />
                <TextInput
                    value={form.bairro}
                    onChangeText={(text) => setForm({...form, bairro: text})}
                    left={<TextInput.Icon icon="magnify"
                                          onPress={() => router.push("/bairro/ListBairroScreen")}/>}
                    label="Bairro"
                    right={<TextInput.Icon icon="close-circle-outline"/>}
                    style={{marginBottom: 16}}
                />
                <TextInput
                    value={form.cep}
                    onChangeText={(text) => setForm({...form, cep: text})}
                    label="CEP"
                    right={<TextInput.Icon icon="close-circle-outline"/>}
                    style={{marginBottom: 16}}
                />
                <TextInput
                    value={form.cidade}
                    onChangeText={(text) => setForm({...form, cidade: text})}
                    left={<TextInput.Icon icon="magnify"
                                          onPress={() => router.push("/cidade/ListCidadeScreen")}/>}
                    label="Cidade"
                    right={<TextInput.Icon icon="close-circle-outline"/>}
                    style={{marginBottom: 16}}
                />
                <TextInput
                    value={form.estado}
                    onChangeText={(text) => setForm({...form, estado: text})}
                    left={<TextInput.Icon icon="magnify"
                                          onPress={() => router.push("/estado/ListEstadoScreen")}/>}
                    label="Estado"
                    right={<TextInput.Icon icon="close-circle-outline"/>}
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

export default EditAlunoScreen;
