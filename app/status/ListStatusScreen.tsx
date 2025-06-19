import React, {useEffect} from "react";
import {useAppSelector, useAppDispatch} from '@/store/hooks';
import {fetchStatus, fetchStatuses} from "@/store/slices/statusSlice";
import ListScreen from "@/components/ListScreen";
import {useRouter} from "expo-router";


const ListStatusScreen = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const {statuses} = useAppSelector((state) => state.status);

  useEffect(() => {
    dispatch(fetchStatuses());
  }, [dispatch]);

  const handleClick = (id: string) => {
    dispatch(fetchStatus(id));
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
