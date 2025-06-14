import React, {useEffect} from "react";
import {useAppSelector, useAppDispatch} from '@/store/hooks';
import {fetchBairros} from '@/store/slices/bairroSlice';
import ListScreen from "@/components/ListScreen";
import {useLocalSearchParams, useRouter} from "expo-router";
import {updateAluno} from "@/store/slices/alunoSlice";
import {updateResponsavel} from "@/store/slices/responsavelSlice";

const ListBairroScreen = () => {
  const dispatch = useAppDispatch();
  const params: { id: string, entidade: string } = useLocalSearchParams();
  const router = useRouter();

  const {bairros} = useAppSelector((state) => state.bairro);

  useEffect(() => {
    dispatch(fetchBairros());
  }, [dispatch]);

  const handleClick = (bairro: string) => {
    if (params.entidade === "aluno") {
      dispatch(updateAluno({
        id: params.id,
        data: {
          bairro: bairro,
        }
      }));
    }
    if (params.entidade === "responsavel") {
      dispatch(updateResponsavel({
        id: params.id,
        data: {
          bairro: bairro,
        }
      }));
    }
    router.back();
  }

  return (
      <ListScreen
          fabLabel={"Bairro"}
          data={bairros}
          route={"/bairro/EditBairroScreen"}
          onClick={handleClick}
      />
  );
};

export default ListBairroScreen;
