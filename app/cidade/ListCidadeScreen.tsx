import React, {useEffect} from "react";
import {useAppSelector, useAppDispatch} from '@/store/hooks';
import {fetchCidade, fetchCidades} from '@/store/slices/cidadeSlice';
import ListScreen from "@/components/ListScreen";
import {useRouter} from "expo-router";

const ListCidadeScreen = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const {cidades} = useAppSelector((state) => state.cidade);

  useEffect(() => {
    dispatch(fetchCidades());
  }, [dispatch]);

  const handleClick = (id: string) => {
    dispatch(fetchCidade(id));
    router.back();
  }

  return (
      <ListScreen
          fabLabel={"Cidade"}
          data={cidades}
          route={"/cidade/EditCidadeScreen"}
          onClick={handleClick}
      />
  );
};

export default ListCidadeScreen;
