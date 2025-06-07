import React, {useEffect} from "react";
import {useAppSelector, useAppDispatch} from '@/store/hooks';
import {fetchLogradouros} from '@/store/slices/logradouroSlice';
import ListScreen from "@/components/ListScreen";

const ListLogradouroScreen = () => {
  const dispatch = useAppDispatch();

  const {logradouros} = useAppSelector((state) => state.logradouro);

  useEffect(() => {
    dispatch(fetchLogradouros());
  }, [dispatch]);

  return (
      <ListScreen
          fabLabel={"Logradouro"}
          data={logradouros}
          route={"/logradouro/EditLogradouroScreen"}
      />
  );
};

export default ListLogradouroScreen;
