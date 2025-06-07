import NameCard from "@/components/NameCard";
import SearchInput from "@/components/SearchInput";
import React, {useEffect} from "react";
import { FlatList, View } from "react-native";

import { FAB, useTheme } from "react-native-paper";
import {useAppDispatch, useAppSelector} from "@/store/hooks";
import { fetchResponsaveis } from '@/store/slices/responsavelSlice';
import {useRouter} from "expo-router";


const ListResponsavelScreen = () => {
  const theme = useTheme();
  const dispatch = useAppDispatch();
  const router = useRouter();

  const [text, setText] = React.useState("");

  const { responsaveis } = useAppSelector((state) => state.responsavel);

  useEffect(() => {
    dispatch(fetchResponsaveis());
  }, [dispatch]);

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
        onPress={() => router.push("/responsavel/EditResponsavelScreen")}
      />
    </View>
  );
};

export default ListResponsavelScreen;
