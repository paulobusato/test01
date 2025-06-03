import React, {useState} from "react";
import {View} from "react-native";

import {FAB, TextInput, useTheme} from "react-native-paper";

const EditEscolaScreen = () => {
  const theme = useTheme();

  const [nome, setNome] = useState("Gabriela Angelo");

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

export default EditEscolaScreen;
