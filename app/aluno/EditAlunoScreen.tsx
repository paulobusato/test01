import React, {useState, useEffect} from "react";
import {View} from "react-native";

import {FAB, SegmentedButtons, TextInput, useTheme} from "react-native-paper";
import {useRouter} from "expo-router";
import {useLocalSearchParams} from "expo-router";

import {useAppDispatch, useAppSelector} from "@/store/hooks";
import {fetchAluno} from "@/store/slices/alunoSlice";


const EditAlunoScreen = () => {
  const theme = useTheme();
  const dispatch = useAppDispatch();
  const params: { id: string } = useLocalSearchParams();
  const router = useRouter();

  const { aluno } = useAppSelector((state) => state.aluno);

  useEffect(() => {
    dispatch(fetchAluno(params.id));
  }, [dispatch]);

  useEffect(() => {
    console.log(aluno);
  }, [aluno]);

  const [tab, setTab] = useState("pessoal");

  const [nome, setNome] = useState(aluno.nome);
  const [responsavel, setResponsavel] = useState("Joana D'Arc");
  const [cpf, setCPF] = useState("111.222.333-44")
  const [telefone, setTelefone] = useState("(33) 1234-5678")
  const [email, setEmail] = useState("gabi@angelo.com")
  const [dataNascimento, setDataNascimento] = useState("20/50/2098")
  const [rg, setRG] = useState("22.333-11")

  const [escola, setEscola] = useState("Escola de Tecnologia")
  const [serie, setSerie] = useState("2 Ano")
  const [turno, setTurno] = useState("Matutino")

  const [logradouro, setLogradouro] = useState("Rua dos Bobos")
  const [numero, setNumero] = useState("123")
  const [complemento, setComplemento] = useState("Apto 123")
  const [bairro, setBairro] = useState("Centro")
  const [cep, setCEP] = useState("12345-678")
  const [cidade, setCidade] = useState("Cachoeiro de Itapemirim")
  const [estado, setEstado] = useState("RJ")

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
                    value={nome}
                    onChangeText={(text) => setNome(text)}
                    label="Nome"
                    right={<TextInput.Icon icon="close-circle-outline"/>}
                    style={{marginBottom: 16}}
                />
                <TextInput
                    value={responsavel}
                    onChangeText={(text) => setResponsavel(text)}
                    left={<TextInput.Icon icon="magnify"
                                          onPress={() => router.push("/responsavel/ListResponsavelScreen")}/>}
                    label="Responsável"
                    right={<TextInput.Icon icon="close-circle-outline"/>}
                    style={{marginBottom: 16}}
                />
                <TextInput
                    value={cpf}
                    onChangeText={(text) => setCPF(text)}
                    label="CPF"
                    right={<TextInput.Icon icon="close-circle-outline"/>}
                    style={{marginBottom: 16}}
                />
                <TextInput
                    value={telefone}
                    onChangeText={(text) => setTelefone(text)}
                    label="Telefone"
                    right={<TextInput.Icon icon="close-circle-outline"/>}
                    style={{marginBottom: 16}}
                />
                <TextInput
                    value={email}
                    onChangeText={(text) => setEmail(text)}
                    label="E-mail"
                    right={<TextInput.Icon icon="close-circle-outline"/>}
                    style={{marginBottom: 16}}
                />
                <TextInput
                    value={dataNascimento}
                    onChangeText={(text) => setDataNascimento(text)}
                    label="Data de Nascimento"
                    right={<TextInput.Icon icon="close-circle-outline"/>}
                    style={{marginBottom: 16}}
                />
                <TextInput
                    value={rg}
                    onChangeText={(text) => setRG(text)}
                    label="RG"
                    right={<TextInput.Icon icon="close-circle-outline"/>}
                    style={{marginBottom: 16}}
                />
              </>
          )}

          {tab === "escolar" && (
              <>
                <TextInput
                    value={escola}
                    onChangeText={(text) => setEscola(text)}
                    left={<TextInput.Icon icon="magnify"
                                          onPress={() => router.push("escola/ListEscolaScreen")}/>}
                    label="Escola"
                    right={<TextInput.Icon icon="close-circle-outline"/>}
                    style={{marginBottom: 16}}
                />
                <TextInput
                    value={serie}
                    onChangeText={(text) => setSerie(text)}
                    label="Série"
                    right={<TextInput.Icon icon="close-circle-outline"/>}
                    style={{marginBottom: 16}}
                />
                <TextInput
                    value={turno}
                    onChangeText={(text) => setTurno(text)}
                    left={<TextInput.Icon icon="magnify"
                                          onPress={() => router.push("turno/ListTurnoScreen")}/>}
                    label="Turno"
                    right={<TextInput.Icon icon="close-circle-outline"/>}
                    style={{marginBottom: 16}}
                />
              </>
          )}

          {tab === "endereco" && (
              <>
                <TextInput
                    value={logradouro}
                    onChangeText={(text) => setLogradouro(text)}
                    left={<TextInput.Icon icon="magnify"
                                          onPress={() => router.push("logradouro/ListLogradouroScreen")}/>}
                    label="Logradouro"
                    right={<TextInput.Icon icon="close-circle-outline"/>}
                    style={{marginBottom: 16}}
                />
                <TextInput
                    value={numero}
                    onChangeText={(text) => setNumero(text)}
                    label="Número"
                    right={<TextInput.Icon icon="close-circle-outline"/>}
                    style={{marginBottom: 16}}
                />
                <TextInput
                    value={complemento}
                    onChangeText={(text) => setComplemento(text)}
                    label="Complemento"
                    right={<TextInput.Icon icon="close-circle-outline"/>}
                    style={{marginBottom: 16}}
                />
                <TextInput
                    value={bairro}
                    onChangeText={(text) => setBairro(text)}
                    left={<TextInput.Icon icon="magnify"
                                          onPress={() => router.push("bairro/ListBairroScreen")}/>}
                    label="Bairro"
                    right={<TextInput.Icon icon="close-circle-outline"/>}
                    style={{marginBottom: 16}}
                />
                <TextInput
                    value={cep}
                    onChangeText={(text) => setCEP(text)}
                    label="CEP"
                    right={<TextInput.Icon icon="close-circle-outline"/>}
                    style={{marginBottom: 16}}
                />
                <TextInput
                    value={cidade}
                    onChangeText={(text) => setCidade(text)}
                    left={<TextInput.Icon icon="magnify"
                                          onPress={() => router.push("cidade/ListCidadeScreen")}/>}
                    label="Cidade"
                    right={<TextInput.Icon icon="close-circle-outline"/>}
                    style={{marginBottom: 16}}
                />
                <TextInput
                    value={estado}
                    onChangeText={(text) => setEstado(text)}
                    left={<TextInput.Icon icon="magnify"
                                          onPress={() => router.push("estado/ListEstadoScreen")}/>}
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
            onPress={() => console.log("Pressed")}
        />
      </View>
  );
};

export default EditAlunoScreen;
