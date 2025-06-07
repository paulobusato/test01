import React, {useEffect} from "react";
import {useAppSelector, useAppDispatch} from '@/store/hooks';
import {fetchBairros} from '@/store/slices/bairroSlice';
import ListScreen from "@/components/ListScreen";

const ListBairroScreen = () => {
  const dispatch = useAppDispatch();

  const {bairros} = useAppSelector((state) => state.bairro);

  useEffect(() => {
    dispatch(fetchBairros());
  }, [dispatch]);

  return (
      <ListScreen
          fabLabel={"Bairro"}
          data={bairros}
          route={"/bairro/EditBairroScreen"}
      />
  );
};

export default ListBairroScreen;
