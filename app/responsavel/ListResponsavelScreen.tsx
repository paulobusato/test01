import React, {useEffect} from "react";
import {useAppDispatch, useAppSelector} from "@/store/hooks";
import {fetchResponsaveis} from '@/store/slices/responsavelSlice';
import ListScreen from "@/components/ListScreen";
import {updateAluno} from "@/store/slices/alunoSlice";
import {useLocalSearchParams, useRouter} from "expo-router";

const ListResponsavelScreen = () => {
  const dispatch = useAppDispatch();
  const params: { id: string } = useLocalSearchParams();
  const router = useRouter();

  const {responsaveis} = useAppSelector((state) => state.responsavel);

  useEffect(() => {
    dispatch(fetchResponsaveis());
  }, [dispatch]);

  const handleClick = (nome: string) => {
    dispatch(updateAluno({
      id: params.id,
      data: {
        responsavel: nome,
      }
    }));
    router.back();
  }

  return (
      <ListScreen
          fabLabel={"Responsável"}
          data={responsaveis}
          route={"/responsavel/EditResponsavelScreen"}
          onClick={handleClick}
      />
  );
};

export default ListResponsavelScreen;
