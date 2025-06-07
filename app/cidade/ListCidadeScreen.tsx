import React, {useEffect} from "react";
import {useAppSelector, useAppDispatch} from '@/store/hooks';
import {fetchCidades} from '@/store/slices/cidadeSlice';
import ListScreen from "@/components/ListScreen";

const ListCidadeScreen = () => {
  const dispatch = useAppDispatch();

  const {cidades} = useAppSelector((state) => state.cidade);

  useEffect(() => {
    dispatch(fetchCidades());
  }, [dispatch]);

  return (
      <ListScreen
          fabLabel={"Cidade"}
          data={cidades}
          route={"/cidade/EditCidadeScreen"}
      />
  );
};

export default ListCidadeScreen;
