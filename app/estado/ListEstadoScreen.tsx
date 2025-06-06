import NameCard from "@/components/NameCard";
import SearchInput from "@/components/SearchInput";
import React, {useEffect} from "react";
import {FlatList, View} from "react-native";

import {FAB, useTheme} from "react-native-paper";

import { useAppSelector, useAppDispatch } from '@/store/hooks';
import { fetchEstados } from '@/store/slices/estadoSlice';


const ListEstadoScreen = () => {
  const theme = useTheme();
  const dispatch = useAppDispatch();

  const [text, setText] = React.useState("");

  const { estados } = useAppSelector((state) => state.estado);

  useEffect(() => {
    dispatch(fetchEstados());
  }, [dispatch]);

  return (
      <View style={{flex: 1, backgroundColor: theme.colors.background}}>
        <View style={{padding: 16}}>
          <SearchInput value={text} onValueChange={setText}/>
          <FlatList
              data={estados}
              keyExtractor={(item) => item.id.toString()}
              renderItem={({item}) => <NameCard name={item.name} route={"/estado/EditEstadoScreen"}/>}
          />
        </View>
        <FAB
            icon="plus"
            label="Estado"
            style={{
              position: "absolute",
              margin: 16,
              right: 0,
              bottom: 0,
            }}
            onPress={() => console.log("Estado")}
        />
      </View>
  );
};

export default ListEstadoScreen;
