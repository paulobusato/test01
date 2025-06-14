import React, {useEffect} from "react";
import {useAppSelector, useAppDispatch} from '@/store/hooks';
import ListScreen from "@/components/ListScreen";
import {useLocalSearchParams, useRouter} from "expo-router";
import {updateResponsavel} from "@/store/slices/responsavelSlice";
import {fetchNacionalidades} from "@/store/slices/nacionalidadeSlice";

const ListNacionalidadeScreen = () => {
  const dispatch = useAppDispatch();
  const params: { id: string } = useLocalSearchParams();
  const router = useRouter();

  const {nacionalidades} = useAppSelector((state) => state.nacionalidade);

  useEffect(() => {
    dispatch(fetchNacionalidades());
  }, [dispatch]);

  const handleClick = (nacionalidade: string) => {
    dispatch(updateResponsavel({
      id: params.id,
      data: {
        nacionalidade: nacionalidade,
      }
    }));
    router.back();
  }

  return (
      <ListScreen
          fabLabel={"Nacionalidade"}
          data={nacionalidades}
          route={"/nacionalidade/EditNacionalidadeScreen"}
          onClick={handleClick}
      />
  );
};

export default ListNacionalidadeScreen;
