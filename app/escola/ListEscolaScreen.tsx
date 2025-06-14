import React, {useEffect} from "react";
import {useAppSelector, useAppDispatch} from '@/store/hooks';
import {fetchEscolas} from '@/store/slices/escolaSlice';
import ListScreen from "@/components/ListScreen";
import {useLocalSearchParams, useRouter} from "expo-router";
import {updateAluno} from "@/store/slices/alunoSlice";

const ListEscolaScreen = () => {
  const dispatch = useAppDispatch();
  const params: { id: string } = useLocalSearchParams();
  const router = useRouter();

  const {escolas} = useAppSelector((state) => state.escola);

  useEffect(() => {
    dispatch(fetchEscolas());
  }, [dispatch]);

  const handleClick = (escola: string) => {
    dispatch(updateAluno({
      id: params.id,
      data: {
        escola: escola,
      }
    }));
    router.back();
  }

  return (
      <ListScreen
          fabLabel={"Escola"}
          data={escolas}
          route={"/escola/EditEscolaScreen"}
          onClick={handleClick}
      />
  );
};

export default ListEscolaScreen;
