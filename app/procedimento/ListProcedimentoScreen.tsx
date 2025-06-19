import React, {useEffect} from "react";
import {useAppSelector, useAppDispatch} from '@/store/hooks';
import {fetchProcedimento, fetchProcedimentos} from "@/store/slices/procedimentoSlice";
import ListScreen from "@/components/ListScreen";
import {useRouter} from "expo-router";


const ListProcedimentoScreen = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const {procedimentos} = useAppSelector((state) => state.procedimento);

  useEffect(() => {
    dispatch(fetchProcedimentos());
  }, [dispatch]);

  const handleClick = (id: string) => {
    dispatch(fetchProcedimento(id));
    router.back();
  }

  return (
      <ListScreen
          fabLabel={"Procedimento"}
          data={procedimentos}
          route={"/procedimento/EditProcedimentoScreen"}
          onClick={handleClick}
      />
  );
};

export default ListProcedimentoScreen;
