import NameCard from "@/components/NameCard";
import SearchInput from "@/components/SearchInput";
import responsaveis from "@/constants/ResponsavelList";
import React, {useEffect, useState} from "react";
import {FlatList, View} from "react-native";

import {FAB, useTheme} from "react-native-paper";
import {useLocalSearchParams, useNavigation} from "expo-router";
import logradouros from "@/constants/LogradouroList";
import {Logradouro} from "@/constants/models/Logradouro";
import {Bairro} from "@/constants/models/Bairro";
import bairros from "@/constants/BairroList";
import cidades from "@/constants/CidadeList";
import estados from "@/constants/EstadoList";
import { Estado } from "@/constants/models/Estado";
import {Cidade} from "@/constants/models/Cidade";

const ListEnderecoScreen = () => {
  const theme = useTheme();
  const params: { title: string } = useLocalSearchParams();
  const navigation = useNavigation();

  const [data, setData] = useState<Logradouro[] | Bairro[] | Cidade[] | Estado[]>([]);

  const [text, setText] = React.useState("");

  useEffect(() => {
    if (params.title) {
      navigation.setOptions({title: params.title})

      if (params.title === "Logradouro") {
        setData(logradouros);
      } else if (params.title === "Bairro") {
        setData(bairros);
      } else if (params.title === "Cidade") {
        setData(cidades);
      } else if (params.title === "Estado") {
        setData(estados);
      }

    }
  }, [navigation, params.title]);

  return (
      <View style={{flex: 1, backgroundColor: theme.colors.background}}>
        <View style={{padding: 16}}>
          <SearchInput value={text} onValueChange={setText}/>
          <FlatList
              data={data}
              keyExtractor={(item) => item.id.toString()}
              renderItem={({item}) => <NameCard name={item.name} route={"/responsavel/EditResponsavelScreen"}/>}
          />
        </View>
        <FAB
            icon="plus"
            label={params.title}
            style={{
              position: "absolute",
              margin: 16,
              right: 0,
              bottom: 0,
            }}
            onPress={() => console.log(params.title)}
        />
      </View>
  );
};

export default ListEnderecoScreen;
