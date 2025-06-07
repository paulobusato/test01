import React from "react";
import ListScreen from "@/components/ListScreen";

const ListAtividadeScreen = () => {
  const [text, setText] = React.useState("");

  return (
      <ListScreen
          fabLabel={"Atividade"}
          data={[]}
          route={"/atividade/EditAtividadeScreen"}
      />
  );
};

export default ListAtividadeScreen;
