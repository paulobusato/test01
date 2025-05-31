import SearchInput from "@/components/SearchInput";
import SessaoCard from "@/components/SessaoCard";
import sessoes from "@/constants/SessaoList";
import React from "react";
import { FlatList, View } from "react-native";

import { FAB, useTheme } from "react-native-paper";

const ListSessaoScreen = () => {
  const theme = useTheme();
  const [text, setText] = React.useState("");

  return (
    <View style={{ flex: 1, backgroundColor: theme.colors.background }}>
      <View style={{ padding: 16 }}>
        <SearchInput value={text} onValueChange={setText} />
        <FlatList
          data={sessoes}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <SessaoCard
              name={item.name}
              date={item.date}
              status={item.status}
            />
          )}
        />
      </View>
      <FAB
        icon="plus"
        label="Sessão"
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

export default ListSessaoScreen;
