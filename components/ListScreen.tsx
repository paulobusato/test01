import NameCard from "@/components/NameCard";
import SearchInput from "@/components/SearchInput";
import React from "react";
import {FlatList, View} from "react-native";
import {FAB, useTheme} from "react-native-paper";
import {Href, useRouter} from "expo-router";
import {Logradouro} from "@/constants/models/Logradouro";
import {Bairro} from "@/constants/models/Bairro";
import {Estado} from "@/constants/models/Estado";
import {Cidade} from "@/constants/models/Cidade";
import {Atividade} from "@/constants/models/Atividade";

export interface ListEnderecoScreenProps {
  fabLabel: string,
  data: Logradouro[] | Bairro[] | Cidade[] | Estado[] | Atividade[],
  route: Href,
  onClick: (id: string) => void,
}

const ListScreen = ({fabLabel, data, route, onClick}: ListEnderecoScreenProps) => {
  const theme = useTheme();
  const router = useRouter();

  const [text, setText] = React.useState("");

  return (
      <View style={{flex: 1, backgroundColor: theme.colors.background}}>
        <View style={{padding: 16}}>
          <SearchInput value={text} onValueChange={setText} onRightPress={() => setText("")}/>
          <FlatList
              data={data.filter((data) =>
                  data.nome.toLowerCase().includes(text.toLowerCase())
              )}
              keyExtractor={(item) => item.id.toString()}
              renderItem={({item}) => <NameCard id={item.id} name={item.nome} route={route} onClick={onClick}/>}
          />
        </View>
        <FAB
            icon="plus"
            label={fabLabel}
            style={{
              position: "absolute",
              margin: 16,
              right: 0,
              bottom: 0,
            }}
            onPress={() => router.push(route)}
        />
      </View>
  );
};

export default ListScreen;