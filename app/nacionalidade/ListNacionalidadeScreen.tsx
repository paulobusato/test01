import React, {useEffect} from "react";
import {useAppSelector, useAppDispatch} from '@/store/hooks';
import {fetchNacionalidade, fetchNacionalidades} from "@/store/slices/nacionalidadeSlice";
import ListScreen from "@/components/ListScreen";
import {useRouter} from "expo-router";

const ListNacionalidadeScreen = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const {nacionalidades} = useAppSelector((state) => state.nacionalidade);

  useEffect(() => {
    dispatch(fetchNacionalidades());
  }, [dispatch]);

  const handleClick = (id: string) => {
    dispatch(fetchNacionalidade(id));
    router.back();
  }

  return (
      <ListScreen
          fabLabel={"Nacionalidade"}
          data={nacionalidades}
          route={"/nacionalidade/EditNacionalidadeScreen"}
          onClick={handleClick}
      />
  );
};

export default ListNacionalidadeScreen;
