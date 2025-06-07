import React, {useEffect} from "react";
import {useAppSelector, useAppDispatch} from '@/store/hooks';
import ListScreen from "@/components/ListScreen";
import {fetchAtividades} from "@/store/slices/atividadeSlice";

const ListAtividadeScreen = () => {
  const dispatch = useAppDispatch();

  const {atividades} = useAppSelector((state) => state.atividade);

  useEffect(() => {
    dispatch(fetchAtividades());
  }, [dispatch]);

  return (
      <ListScreen
          fabLabel={"Atividade"}
          data={atividades}
          route={"/atividade/EditAtividadeScreen"}
      />
  );
};

export default ListAtividadeScreen;
