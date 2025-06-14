import React, {useEffect} from "react";
import {useAppSelector, useAppDispatch} from '@/store/hooks';
import {fetchCidades} from '@/store/slices/cidadeSlice';
import ListScreen from "@/components/ListScreen";
import {useLocalSearchParams, useRouter} from "expo-router";
import {updateAluno} from "@/store/slices/alunoSlice";
import {updateResponsavel} from "@/store/slices/responsavelSlice";

const ListCidadeScreen = () => {
  const dispatch = useAppDispatch();
  const params: { id: string, entidade: string } = useLocalSearchParams();
  const router = useRouter();

  const {cidades} = useAppSelector((state) => state.cidade);

  useEffect(() => {
    dispatch(fetchCidades());
  }, [dispatch]);

  const handleClick = (cidade: string) => {
    if (params.entidade === "aluno") {
      dispatch(updateAluno({
        id: params.id,
        data: {
          cidade: cidade,
        }
      }));
    }
    if (params.entidade === "responsavel") {
      dispatch(updateResponsavel({
        id: params.id,
        data: {
          cidade: cidade,
        }
      }));
    }
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
