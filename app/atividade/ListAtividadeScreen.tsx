import React, {useEffect} from "react";
import {useAppSelector, useAppDispatch} from '@/store/hooks';
import ListScreen from "@/components/ListScreen";
import {fetchAtividade, fetchAtividades} from "@/store/slices/atividadeSlice";
import {useRouter} from "expo-router";

const ListAtividadeScreen = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const {atividades} = useAppSelector((state) => state.atividade);

  useEffect(() => {
    dispatch(fetchAtividades());
  }, [dispatch]);

  const handleClick = (id: string) => {
    dispatch(fetchAtividade(id));
    router.back();
  }

  return (
      <ListScreen
          fabLabel={"Atividade"}
          data={atividades}
          route={"/atividade/EditAtividadeScreen"}
          onClick={handleClick}
      />
  );
};

export default ListAtividadeScreen;
