import React, {useEffect} from "react";
import {useAppSelector, useAppDispatch} from '@/store/hooks';
import {fetchBairro, fetchBairros} from '@/store/slices/bairroSlice';
import ListScreen from "@/components/ListScreen";
import {useRouter} from "expo-router";

const ListBairroScreen = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const {bairros} = useAppSelector((state) => state.bairro);

  useEffect(() => {
    dispatch(fetchBairros());
  }, [dispatch]);

  const handleClick = (id: string) => {
    dispatch(fetchBairro(id));
    router.back();
  }

  return (
      <ListScreen
          fabLabel={"Bairro"}
          data={bairros}
          route={"/bairro/EditBairroScreen"}
          onClick={handleClick}
      />
  );
};

export default ListBairroScreen;
