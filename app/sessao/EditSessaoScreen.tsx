import React, {useState} from "react";
import {View} from "react-native";

import {FAB, SegmentedButtons, TextInput, useTheme} from "react-native-paper";
import {useRouter} from "expo-router";

const EditSessaoScreen = () => {
  const theme = useTheme();
  const router = useRouter();

  const [queixa, setQueixa] = useState("Relatou a vítima que o acusado, no dia xx de xxxx de xxxx, em local xxxx, proferiu xxxx ofensas à sua pessoa, xxxx, causando-lhe grande abalo moral e reputação.");
  const [encaminhamento, setEncaminhamento] = useState("Encaminho o(a) paciente [nome completo] que informa/apresenta [informe os seguintes\n" +
      "dados subjetivos e objetivos mais relevantes para justificar o encaminhamento, em especial\n" +
      "descreva os sinais de alerta e as condições especiais, quando houver] para avaliação.");
  const [atividade, setAtividade] = useState("Atividade Exemplo");
  const [observacao, setObservacao] = useState("Pellentesque nec felis nec sem interdum scelerisque et vitae quam. Proin mollis ultricies ex, sed ornare nulla gravida sit amet. Pellentesque faucibus, est quis commodo imperdiet, arcu urna auctor turpis, eget tempus magna sapien sed neque");
  const [data, setData] = useState("31/05/2025 15:00");
  const [status, setStatus] = useState("Aberto");
  const [procedimento, setProcedimento] = useState("Procedimento Teste");

  return (
      <View style={{flex: 1, backgroundColor: theme.colors.background}}>
        <View style={{padding: 16}}>
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
              value={atividade}
              onChangeText={(text) => setAtividade(text)}
              left={<TextInput.Icon icon="magnify" onPress={() => router.push("/atividade/ListAtividadeScreen")} />}
              label="Atividade"
              right={<TextInput.Icon icon="close-circle-outline"/>}
              editable={false}
              style={{marginBottom: 16}}
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
          <TextInput
              value={data}
              onChangeText={(text) => setData(text)}
              label="Data e Hora"
              right={<TextInput.Icon icon="close-circle-outline"/>}
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
