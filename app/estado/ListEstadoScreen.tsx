import React, {useEffect} from "react";
import {useAppSelector, useAppDispatch} from '@/store/hooks';
import {fetchEstados} from '@/store/slices/estadoSlice';
import ListScreen from "@/components/ListScreen";

const ListEstadoScreen = () => {
  const dispatch = useAppDispatch();

  const {estados} = useAppSelector((state) => state.estado);

  useEffect(() => {
    dispatch(fetchEstados());
  }, [dispatch]);

  return (
      <ListScreen
          fabLabel={"Estado"}
          data={estados}
          route={"/estado/EditEstadoScreen"}
      />
  );
};

export default ListEstadoScreen;
