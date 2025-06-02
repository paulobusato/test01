import NameCard from "@/components/NameCard";
import SearchInput from "@/components/SearchInput";
import React, {useEffect, useState} from "react";
import {FlatList, View} from "react-native";

import {FAB, useTheme} from "react-native-paper";
import {useLocalSearchParams, useNavigation} from "expo-router";
import {Logradouro} from "@/constants/models/Logradouro";
import {Bairro} from "@/constants/models/Bairro";
import { Estado } from "@/constants/models/Estado";
import {Cidade} from "@/constants/models/Cidade";
import {LogradouroService} from "@/api/services/LogradouroService";
import {CidadeService} from "@/api/services/CidadeService";
import {BairroService} from "@/api/services/BairroService";
import {EstadoService} from "@/api/services/EstadoService";

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
        const fetchLogradouros = async () => {
          try {
            const logradouroService = new LogradouroService();
            const fetchedLogradouros = await logradouroService.getLogradouros();
            setData(fetchedLogradouros);
          } catch (error) {
            console.error('Error fetching alunos:', error);
          }
        };
        fetchLogradouros().then();
      } else if (params.title === "Bairro") {
        const fetchBairros = async () => {
          try {
            const bairroService = new BairroService();
            const fetchedBairros = await bairroService.getBairros();
            setData(fetchedBairros);
          } catch (error) {
            console.error('Error fetching alunos:', error);
          }
        };
        fetchBairros().then();
      } else if (params.title === "Cidade") {
        const fetchCidades = async () => {
          try {
            const cidadeService = new CidadeService();
            const fetchedCidades = await cidadeService.getCidades();
            setData(fetchedCidades);
          } catch (error) {
            console.error('Error fetching alunos:', error);
          }
        };
        fetchCidades().then();
      } else if (params.title === "Estado") {
        const fetchEstados = async () => {
          try {
            const estadoService = new EstadoService();
            const fetchedEstados = await estadoService.getEstados();
            setData(fetchedEstados);
          } catch (error) {
            console.error('Error fetching alunos:', error);
          }
        };
        fetchEstados().then();
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
