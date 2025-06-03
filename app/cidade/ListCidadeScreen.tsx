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

import { useAppSelector, useAppDispatch } from '@/store/hooks';
import { fetchCidades } from '@/store/slices/cidadeSlice';


const ListCidadeScreen = () => {
  const theme = useTheme();
  const dispatch = useAppDispatch();

  const [text, setText] = React.useState("");

  const { cidades } = useAppSelector((state) => state.cidade);

  useEffect(() => {
    dispatch(fetchCidades());
  }, [dispatch]);

  return (
      <View style={{flex: 1, backgroundColor: theme.colors.background}}>
        <View style={{padding: 16}}>
          <SearchInput value={text} onValueChange={setText}/>
          <FlatList
              data={cidades}
              keyExtractor={(item) => item.id.toString()}
              renderItem={({item}) => <NameCard name={item.name} route={"/responsavel/EditResponsavelScreen"}/>}
          />
        </View>
        <FAB
            icon="plus"
            label="Cidade"
            style={{
              position: "absolute",
              margin: 16,
              right: 0,
              bottom: 0,
            }}
            onPress={() => console.log("Cidade")}
        />
      </View>
  );
};

export default ListCidadeScreen;
