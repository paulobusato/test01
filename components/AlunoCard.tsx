import React from "react";

import {Card, Text} from "react-native-paper";
import {useRouter} from "expo-router";

const AlunoCard = ({id, name}: { id: string, name: string }) => {
  const router = useRouter()

  return (
      <Card
          mode="outlined"
          onPress={() => router.push({
                pathname: "/aluno/EditAlunoScreen",
                params: {id: id}
              })}
          contentStyle={{padding: 8}}
          style={{marginBottom: 8}}
      >
        <Card.Content>
          <Text variant="bodyMedium">{name}</Text>
        </Card.Content>
      </Card>
  );
};

export default AlunoCard;
