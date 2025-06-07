import React, {useEffect} from "react";
import {useAppDispatch, useAppSelector} from "@/store/hooks";
import {fetchResponsaveis} from '@/store/slices/responsavelSlice';
import ListScreen from "@/components/ListScreen";

const ListResponsavelScreen = () => {
  const dispatch = useAppDispatch();

  const {responsaveis} = useAppSelector((state) => state.responsavel);

  useEffect(() => {
    dispatch(fetchResponsaveis());
  }, [dispatch]);

  return (
      <ListScreen
          fabLabel={"Responsável"}
          data={responsaveis}
          route={"/responsavel/EditResponsavelScreen"}
      />
  );
};

export default ListResponsavelScreen;
