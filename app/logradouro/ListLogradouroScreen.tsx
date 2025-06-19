import React, {useEffect} from "react";
import {useAppSelector, useAppDispatch} from '@/store/hooks';
import {fetchLogradouro, fetchLogradouros} from '@/store/slices/logradouroSlice';
import ListScreen from "@/components/ListScreen";
import {useRouter} from "expo-router";

const ListLogradouroScreen = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const {logradouros} = useAppSelector((state) => state.logradouro);

  useEffect(() => {
    dispatch(fetchLogradouros());
  }, [dispatch]);

  const handleClick = (id: string) => {
    dispatch(fetchLogradouro(id));
    router.back();
  }

  return (
      <ListScreen
          fabLabel={"Logradouro"}
          data={logradouros}
          route={"/logradouro/EditLogradouroScreen"}
          onClick={handleClick}
      />
  );
};

export default ListLogradouroScreen;
