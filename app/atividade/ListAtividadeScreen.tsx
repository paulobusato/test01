import React, {useEffect} from "react";
import {useAppSelector, useAppDispatch} from '@/store/hooks';
import ListScreen from "@/components/ListScreen";
import {fetchAtividades} from "@/store/slices/atividadeSlice";
import {useLocalSearchParams, useRouter} from "expo-router";
import {updateSessao} from "@/store/slices/sessaoSlice";

const ListAtividadeScreen = () => {
  const dispatch = useAppDispatch();
  const params: { id: string } = useLocalSearchParams();
  const router = useRouter();

  const {atividades} = useAppSelector((state) => state.atividade);

  useEffect(() => {
    dispatch(fetchAtividades());
  }, [dispatch]);

  const handleClick = (atividade: string) => {
    dispatch(updateSessao({
      id: params.id,
      data: {
        atividade: atividade,
      }
    }));
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
