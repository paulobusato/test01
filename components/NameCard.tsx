import React from "react";

import {Card, IconButton, Text} from "react-native-paper";
import {ExternalPathString, Href, useRouter} from "expo-router";

export interface NameCardProps {
  id: string,
  name: string,
  route: Href;
  onClick: (nome: string) => void;
}

const NameCard = ({id, name, route, onClick}: NameCardProps) => {
  const router = useRouter()

  return (
      <Card
          mode="outlined"
          onPress={() => onClick(id)}
          contentStyle={{padding: 8}}
          style={{marginBottom: 8}}
      >
        <Card.Content className="flex-row items-center justify-between">
          <Text variant="bodyMedium" style={{fontWeight: "bold"}}>
            {name}
          </Text>
          <IconButton
              icon="pencil"
              size={24}
              onPress={() => router.push({
                pathname: route as ExternalPathString,
                params: {id: id}
              })}
          />
        </Card.Content>
      </Card>
  );
};

export default NameCard;
