import React, {useEffect} from "react";
import {useAppSelector, useAppDispatch} from '@/store/hooks';
import {fetchEstado, fetchEstados} from '@/store/slices/estadoSlice';
import ListScreen from "@/components/ListScreen";
import {useRouter} from "expo-router";

const ListEstadoScreen = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const {estados} = useAppSelector((state) => state.estado);

  useEffect(() => {
    dispatch(fetchEstados());
  }, [dispatch]);

  const handleClick = (id: string) => {
    dispatch(fetchEstado(id));
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
