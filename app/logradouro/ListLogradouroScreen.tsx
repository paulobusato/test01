import React, {useEffect} from "react";
import {useAppSelector, useAppDispatch} from '@/store/hooks';
import {fetchLogradouros} from '@/store/slices/logradouroSlice';
import ListScreen from "@/components/ListScreen";
import {useLocalSearchParams, useRouter} from "expo-router";
import {updateAluno} from "@/store/slices/alunoSlice";
import {updateResponsavel} from "@/store/slices/responsavelSlice";

const ListLogradouroScreen = () => {
  const dispatch = useAppDispatch();
  const params: { id: string, entidade: string } = useLocalSearchParams();
  const router = useRouter();

  const {logradouros} = useAppSelector((state) => state.logradouro);

  useEffect(() => {
    dispatch(fetchLogradouros());
  }, [dispatch]);

  const handleClick = (logradouro: string) => {
    if (params.entidade === "aluno") {
      dispatch(updateAluno({
        id: params.id,
        data: {
          logradouro: logradouro,
        }
      }));
    }
    if (params.entidade === "responsavel") {
      dispatch(updateResponsavel({
        id: params.id,
        data: {
          logradouro: logradouro,
        }
      }));
    }
    router.back();
  }

  return (
      <ListScreen
          fabLabel={"Logradouro"}
          data={logradouros}
          route={"/logradouro/EditLogradouroScreen"}
          onClick={handleClick}
      />
  );
};

export default ListLogradouroScreen;
