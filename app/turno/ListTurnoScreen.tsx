import React, {useEffect} from "react";
import {useAppSelector, useAppDispatch} from '@/store/hooks';
import {fetchTurnos} from '@/store/slices/turnoSlice';
import ListScreen from "@/components/ListScreen";

const ListTurnoScreen = () => {
  const dispatch = useAppDispatch();

  const {turnos} = useAppSelector((state) => state.turno);

  useEffect(() => {
    dispatch(fetchTurnos());
  }, [dispatch]);

  return (
      <ListScreen
          fabLabel={"Turno"}
          data={turnos}
          route={"/turno/EditTurnoScreen"}
      />
  );
};

export default ListTurnoScreen;
