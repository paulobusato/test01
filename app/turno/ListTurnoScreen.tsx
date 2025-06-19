import React, {useEffect} from "react";
import {useAppSelector, useAppDispatch} from '@/store/hooks';
import {fetchTurno, fetchTurnos} from '@/store/slices/turnoSlice';
import ListScreen from "@/components/ListScreen";
import {useRouter} from "expo-router";

const ListTurnoScreen = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const {turnos} = useAppSelector((state) => state.turno);

  useEffect(() => {
    dispatch(fetchTurnos());
  }, [dispatch]);

  const handleClick = (id: string) => {
    dispatch(fetchTurno(id));
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
