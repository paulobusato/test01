import React, {useEffect} from "react";
import {useAppSelector, useAppDispatch} from '@/store/hooks';
import {fetchEstados} from '@/store/slices/estadoSlice';
import ListScreen from "@/components/ListScreen";
import {useLocalSearchParams, useRouter} from "expo-router";
import {updateAluno} from "@/store/slices/alunoSlice";
import {updateResponsavel} from "@/store/slices/responsavelSlice";

const ListEstadoScreen = () => {
  const dispatch = useAppDispatch();
  const params: { id: string, entidade: string } = useLocalSearchParams();
  const router = useRouter();

  const {estados} = useAppSelector((state) => state.estado);

  useEffect(() => {
    dispatch(fetchEstados());
  }, [dispatch]);

  const handleClick = (estado: string) => {
    if (params.entidade === "aluno") {
      dispatch(updateAluno({
        id: params.id,
        data: {
          estado: estado,
        }
      }));
    }
    if (params.entidade === "responsavel") {
      dispatch(updateResponsavel({
        id: params.id,
        data: {
          estado: estado,
        }
      }));
    }
    router.back();
  }

  return (
      <ListScreen
          fabLabel={"Estado"}
          data={estados}
          route={"/estado/EditEstadoScreen"}
          onClick={handleClick}
      />
  );
};

export default ListEstadoScreen;
