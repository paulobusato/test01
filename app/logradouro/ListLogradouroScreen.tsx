import NameCard from "@/components/NameCard";
import SearchInput from "@/components/SearchInput";
import React, {useEffect} from "react";
import {FlatList, View} from "react-native";

import {FAB, useTheme} from "react-native-paper";

import { useAppSelector, useAppDispatch } from '@/store/hooks';
import { fetchLogradouros } from '@/store/slices/logradouroSlice';
import {useRouter} from "expo-router";


const ListLogradouroScreen = () => {
  const theme = useTheme();
  const dispatch = useAppDispatch();
  const router = useRouter();

  const [text, setText] = React.useState("");

  const { logradouros } = useAppSelector((state) => state.logradouro);

  useEffect(() => {
    dispatch(fetchLogradouros());
  }, [dispatch]);

  return (
      <View style={{flex: 1, backgroundColor: theme.colors.background}}>
        <View style={{padding: 16}}>
          <SearchInput value={text} onValueChange={setText}/>
          <FlatList
              data={logradouros}
              keyExtractor={(item) => item.id.toString()}
              renderItem={({item}) => <NameCard name={item.name} route={"/logradouro/EditLogradouroScreen"}/>}
          />
        </View>
        <FAB
            icon="plus"
            label="Logradouro"
            style={{
              position: "absolute",
              margin: 16,
              right: 0,
              bottom: 0,
            }}
            onPress={() => router.push("/logradouro/EditLogradouroScreen")}
        />
      </View>
  );
};

export default ListLogradouroScreen;
