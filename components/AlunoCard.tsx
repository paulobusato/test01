import React from "react";

import { Card, Text } from "react-native-paper";
import {useRouter} from "expo-router";

const AlunoCard = ({ name }: { name: string }) => {
  const router = useRouter()

  return (
    <Card
      mode="outlined"
      onPress={() => router.push("/aluno/EditAlunoScreen")}
      contentStyle={{ padding: 8 }}
      style={{ marginBottom: 8 }}
    >
      <Card.Content>
        <Text variant="bodyMedium">{name}</Text>
      </Card.Content>
    </Card>
  );
};

export default AlunoCard;
