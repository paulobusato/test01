import React, {useEffect} from "react";
import {useAppDispatch, useAppSelector} from "@/store/hooks";
import {fetchResponsaveis, fetchResponsavel} from '@/store/slices/responsavelSlice';
import ListScreen from "@/components/ListScreen";
import {useRouter} from "expo-router";

const ListResponsavelScreen = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const {responsaveis} = useAppSelector((state) => state.responsavel);

  useEffect(() => {
    dispatch(fetchResponsaveis());
  }, [dispatch]);

  const handleClick = (id: string) => {
    dispatch(fetchResponsavel(id));
    router.back();
  }

  return (
      <ListScreen
          fabLabel={"Responsável"}
          data={responsaveis}
          route={"/responsavel/EditResponsavelScreen"}
          onClick={handleClick}
      />
  );
};

export default ListResponsavelScreen;
