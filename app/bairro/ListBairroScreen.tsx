import NameCard from "@/components/NameCard";
import SearchInput from "@/components/SearchInput";
import React, {useEffect} from "react";
import {FlatList, View} from "react-native";

import {FAB, useTheme} from "react-native-paper";

import { useAppSelector, useAppDispatch } from '@/store/hooks';
import { fetchBairros } from '@/store/slices/bairroSlice';


const ListBairroScreen = () => {
  const theme = useTheme();
  const dispatch = useAppDispatch();

  const [text, setText] = React.useState("");

  const { bairros } = useAppSelector((state) => state.bairro);

  useEffect(() => {
    dispatch(fetchBairros());
  }, [dispatch]);

  return (
      <View style={{flex: 1, backgroundColor: theme.colors.background}}>
        <View style={{padding: 16}}>
          <SearchInput value={text} onValueChange={setText}/>
          <FlatList
              data={bairros}
              keyExtractor={(item) => item.id.toString()}
              renderItem={({item}) => <NameCard name={item.name} route={"/bairro/EditBairroScreen"}/>}
          />
        </View>
        <FAB
            icon="plus"
            label="Bairro"
            style={{
              position: "absolute",
              margin: 16,
              right: 0,
              bottom: 0,
            }}
            onPress={() => console.log("Bairro")}
        />
      </View>
  );
};

export default ListBairroScreen;
