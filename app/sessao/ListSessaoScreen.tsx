import SearchInput from "@/components/SearchInput";
import SessaoCard from "@/components/SessaoCard";
import React, {useEffect} from "react";
import {FlatList, View} from "react-native";

import {FAB, useTheme} from "react-native-paper";
import {useAppDispatch, useAppSelector} from "@/store/hooks";
import {addSessao, fetchSessoes} from "@/store/slices/sessaoSlice";
import {useRouter} from "expo-router";

const ListSessaoScreen = () => {
  const theme = useTheme();
  const dispatch = useAppDispatch();
  const router = useRouter();

  const [text, setText] = React.useState("");

  const {sessoes} = useAppSelector((state) => state.sessao);

  useEffect(() => {
    dispatch(fetchSessoes());
  }, [dispatch]);

  return (
      <View style={{flex: 1, backgroundColor: theme.colors.background}}>
        <View style={{padding: 16}}>
          <SearchInput value={text} onValueChange={setText} onRightPress={() => setText("")}/>
          <FlatList
              data={sessoes.filter((sessao) => {
                    if (!sessao.nome) return true;
                    return sessao.nome.toLowerCase().includes(text.toLowerCase());
                  }
              )}
              keyExtractor={(item) => item.id.toString()}
              renderItem={({item}) => (
                  <SessaoCard
                      id={item.id}
                      name={item.nome}
                      date={item.date}
                      time={item.time}
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
            onPress={async () => {
              const sessao = await dispatch(addSessao({})).unwrap();
              router.push({
                pathname: "/sessao/EditSessaoScreen",
                params: {id: sessao.id},
              });
            }}
        />
      </View>
  );
};

export default ListSessaoScreen;
