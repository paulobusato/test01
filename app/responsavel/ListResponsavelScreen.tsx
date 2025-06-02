import NameCard from "@/components/NameCard";
import SearchInput from "@/components/SearchInput";
import React, {useEffect, useState} from "react";
import { FlatList, View } from "react-native";
import {ResponsavelService} from "@/api/services/ResponsavelService";

import { FAB, useTheme } from "react-native-paper";

const ListResponsavelScreen = () => {
  const theme = useTheme();
  const [text, setText] = React.useState("");

  const [responsaveis, setResponsaveis] = useState<any[]>([]);

  useEffect(() => {
    const fetchResponsaveis = async () => {
      try {
        const responsavelService = new ResponsavelService();
        const fetchedResponsaveis = await responsavelService.getResponsaveis();
        setResponsaveis(fetchedResponsaveis);
      } catch (error) {
        console.error('Error fetching alunos:', error);
      }
    };
    fetchResponsaveis().then();
  }, []);

  return (
    <View style={{ flex: 1, backgroundColor: theme.colors.background }}>
      <View style={{ padding: 16 }}>
        <SearchInput value={text} onValueChange={setText} />
        <FlatList
          data={responsaveis}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => <NameCard name={item.name} route={"/responsavel/EditResponsavelScreen"} />}
        />
      </View>
      <FAB
        icon="plus"
        label="Responsável"
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

export default ListResponsavelScreen;
