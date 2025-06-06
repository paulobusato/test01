import React, {useState} from "react";
import {View} from "react-native";

import {FAB, SegmentedButtons, TextInput, useTheme} from "react-native-paper";
import ListResponsavelScreen from "@/app/responsavel/ListResponsavelScreen";

const EditResponsavelScreen = () => {
  const theme = useTheme();

  const [tab, setTab] = useState("pessoal");

  const [nome, setNome] = useState("Gabriela Angelo");
  const [nacionalidade, setNacionalidade] = useState("Brasileira");
  const [cidadeNascimento, setCidadeNascimento] = useState("Muqui")
  const [cpf, setCPF] = useState("111.222.333-44")
  const [telefone, setTelefone] = useState("(33) 1234-5678")
  const [email, setEmail] = useState("gabi@angelo.com")
  const [dataNascimento, setDataNascimento] = useState("20/50/2098")
  const [rg, setRG] = useState("22.333-11")

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
                    value={nacionalidade}
                    onChangeText={(text) => setNacionalidade(text)}
                    left={<TextInput.Icon icon="magnify"/>}
                    label="Nacionalidade"
                    right={<TextInput.Icon icon="close-circle-outline"/>}
                    style={{marginBottom: 16}}
                />
                <TextInput
                    value={cidadeNascimento}
                    onChangeText={(text) => setCidadeNascimento(text)}
                    left={<TextInput.Icon icon="magnify"/>}
                    label="Cidade de Nascimento"
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

          {tab === "endereco" && (
              <>
                <TextInput
                    value={logradouro}
                    onChangeText={(text) => setLogradouro(text)}
                    left={<TextInput.Icon icon="magnify"/>}
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
                    left={<TextInput.Icon icon="magnify"/>}
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
                    left={<TextInput.Icon icon="magnify"/>}
                    label="Cidade"
                    right={<TextInput.Icon icon="close-circle-outline"/>}
                    style={{marginBottom: 16}}
                />
                <TextInput
                    value={estado}
                    onChangeText={(text) => setEstado(text)}
                    left={<TextInput.Icon icon="magnify"/>}
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

export default EditResponsavelScreen;
