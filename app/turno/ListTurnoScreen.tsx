import React, {useEffect} from "react";
import {useAppSelector, useAppDispatch} from '@/store/hooks';
import {fetchTurnos} from '@/store/slices/turnoSlice';
import ListScreen from "@/components/ListScreen";
import {useLocalSearchParams, useRouter} from "expo-router";
import {updateAluno} from "@/store/slices/alunoSlice";

const ListTurnoScreen = () => {
  const dispatch = useAppDispatch();
  const params: { id: string } = useLocalSearchParams();
  const router = useRouter();

  const {turnos} = useAppSelector((state) => state.turno);

  useEffect(() => {
    dispatch(fetchTurnos());
  }, [dispatch]);

  const handleClick = (turno: string) => {
    dispatch(updateAluno({
      id: params.id,
      data: {
        turno: turno,
      }
    }));
    router.back();
  }

  return (
      <ListScreen
          fabLabel={"Turno"}
          data={turnos}
          route={"/turno/EditTurnoScreen"}
          onClick={handleClick}
      />
  );
};

export default ListTurnoScreen;
