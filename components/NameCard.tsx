import React from "react";

import { Card, Text } from "react-native-paper";
import {Href, useRouter} from "expo-router";

export interface NameCardProps {
  name: string,
  route: Href;
}

const NameCard = ({ name, route }: NameCardProps) => {
  const router = useRouter()

  return (
    <Card
      mode="outlined"
      onPress={() => router.push(route)}
      contentStyle={{ padding: 8 }}
      style={{ marginBottom: 8 }}
    >
      <Card.Content>
        <Text variant="bodyMedium">{name}</Text>
      </Card.Content>
    </Card>
  );
};

export default NameCard;
