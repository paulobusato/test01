import NameCard from "@/components/NameCard";
import SearchInput from "@/components/SearchInput";
import React, {useEffect} from "react";
import {FlatList, View} from "react-native";

import {FAB, useTheme} from "react-native-paper";

import { useAppSelector, useAppDispatch } from '@/store/hooks';
import { fetchTurnos } from '@/store/slices/turnoSlice';


const ListTurnoScreen = () => {
  const theme = useTheme();
  const dispatch = useAppDispatch();

  const [text, setText] = React.useState("");

  const { turnos } = useAppSelector((state) => state.turno);

  useEffect(() => {
    dispatch(fetchTurnos());
  }, [dispatch]);

  return (
      <View style={{flex: 1, backgroundColor: theme.colors.background}}>
        <View style={{padding: 16}}>
          <SearchInput value={text} onValueChange={setText}/>
          <FlatList
              data={turnos}
              keyExtractor={(item) => item.id.toString()}
              renderItem={({item}) => <NameCard name={item.name} route={"/turno/EditTurnoScreen"}/>}
          />
        </View>
        <FAB
            icon="plus"
            label="Turno"
            style={{
              position: "absolute",
              margin: 16,
              right: 0,
              bottom: 0,
            }}
            onPress={() => console.log("Turno")}
        />
      </View>
  );
};

export default ListTurnoScreen;
