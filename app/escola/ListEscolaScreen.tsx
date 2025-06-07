import React, {useEffect} from "react";
import {useAppSelector, useAppDispatch} from '@/store/hooks';
import {fetchEscolas} from '@/store/slices/escolaSlice';
import ListScreen from "@/components/ListScreen";

const ListEscolaScreen = () => {
  const dispatch = useAppDispatch();

  const {escolas} = useAppSelector((state) => state.escola);

  useEffect(() => {
    dispatch(fetchEscolas());
  }, [dispatch]);

  return (
      <ListScreen
          fabLabel={"Escola"}
          data={escolas}
          route={"/escola/EditEscolaScreen"}
      />
  );
};

export default ListEscolaScreen;
