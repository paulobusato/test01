import React, {useEffect} from "react";
import {useAppSelector, useAppDispatch} from '@/store/hooks';
import ListScreen from "@/components/ListScreen";
import {useLocalSearchParams, useRouter} from "expo-router";
import {updateSessao} from "@/store/slices/sessaoSlice";
import {fetchStatuses} from "@/store/slices/statusSlice";

const ListStatusScreen = () => {
  const dispatch = useAppDispatch();
  const params: { id: string } = useLocalSearchParams();
  const router = useRouter();

  const {statuses} = useAppSelector((state) => state.status);

  useEffect(() => {
    dispatch(fetchStatuses());
  }, [dispatch]);

  const handleClick = (status: string) => {
    dispatch(updateSessao({
      id: params.id,
      data: {
        status: status,
      }
    }));
    router.back();
  }

  return (
      <ListScreen
          fabLabel={"Status"}
          data={statuses}
          route={"/status/EditStatusScreen"}
          onClick={handleClick}
      />
  );
};

export default ListStatusScreen;
