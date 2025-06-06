import React from "react";

import {Card, IconButton, Text} from "react-native-paper";
import {Href, useRouter} from "expo-router";

export interface NameCardProps {
  name: string,
  route: Href;
}

const NameCard = ({name, route}: NameCardProps) => {
  const router = useRouter()

  return (
      <Card
          mode="outlined"
          onPress={() => {
          }}
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
              onPress={() => router.push(route)}
          />
        </Card.Content>
      </Card>
  );
};

export default NameCard;
