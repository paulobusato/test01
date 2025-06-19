import React, {useEffect} from "react";
import {useAppSelector, useAppDispatch} from '@/store/hooks';
import {fetchEscola, fetchEscolas} from '@/store/slices/escolaSlice';
import ListScreen from "@/components/ListScreen";
import {useRouter} from "expo-router";

const ListEscolaScreen = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const {escolas} = useAppSelector((state) => state.escola);

  useEffect(() => {
    dispatch(fetchEscolas());
  }, [dispatch]);

  const handleClick = (id: string) => {
    dispatch(fetchEscola(id));
    router.back();
  }

  return (
      <ListScreen
          fabLabel={"Escola"}
          data={escolas}
          route={"/escola/EditEscolaScreen"}
          onClick={handleClick}
      />
  );
};

export default ListEscolaScreen;
