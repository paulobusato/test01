import React, {useEffect} from "react";
import {useAppSelector, useAppDispatch} from '@/store/hooks';
import ListScreen from "@/components/ListScreen";
import {useLocalSearchParams, useRouter} from "expo-router";
import {fetchProcedimentos} from "@/store/slices/procedimentoSlice";
import {updateSessao} from "@/store/slices/sessaoSlice";

const ListProcedimentoScreen = () => {
  const dispatch = useAppDispatch();
  const params: { id: string } = useLocalSearchParams();
  const router = useRouter();

  const {procedimentos} = useAppSelector((state) => state.procedimento);

  useEffect(() => {
    dispatch(fetchProcedimentos());
  }, [dispatch]);

  const handleClick = (procedimento: string) => {
    dispatch(updateSessao({
      id: params.id,
      data: {
        procedimento: procedimento,
      }
    }));
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
