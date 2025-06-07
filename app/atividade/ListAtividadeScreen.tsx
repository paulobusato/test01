import NameCard from "@/components/NameCard";
import SearchInput from "@/components/SearchInput";
import responsaveis from "@/constants/ResponsavelList";
import React from "react";
import { FlatList, View } from "react-native";

import { FAB, useTheme } from "react-native-paper";
import {useRouter} from "expo-router";

const ListAtividadeScreen = () => {
  const theme = useTheme();
  const router = useRouter();

  const [text, setText] = React.useState("");

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
        label="Atividade"
        style={{
          position: "absolute",
          margin: 16,
          right: 0,
          bottom: 0,
        }}
        onPress={() => router.push("//atividade/EditAtividadeScreen")}
      />
    </View>
  );
};

export default ListAtividadeScreen;
