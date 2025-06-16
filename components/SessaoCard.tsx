import React from "react";
import {View} from "react-native";

import {Card, Text} from "react-native-paper";
import {useRouter} from "expo-router";

const SessaoCard = ({
                      id,
                      name,
                      date,
                      time,
                      status,
                    }: {
  id: string;
  name: string;
  date: string;
  time: string;
  status: string;
}) => {
  const router = useRouter()

  const cores = [
    {status: "Agendado", color: "#000000"},
    {status: "Cancelado", color: "#C41B1B"},
    {status: "Concluído", color: "#1C62FA"},
    {status: "Aberto", color: "#0B7C29"},
  ];

  return (
      <Card
          mode="outlined"
          onPress={() => router.push({
            pathname: "/sessao/EditSessaoScreen",
            params: {id: id}
          })}
          contentStyle={{padding: 8}}
          style={{marginBottom: 8}}
      >
        <Card.Content>
          <View className="mb-2">
            <Text variant="bodyMedium" style={{fontWeight: "bold"}}>
              {name}
            </Text>
          </View>
          <View className="flex-row items-center justify-between">
            <View className="flex-row items-center">
              <Text variant="bodyMedium">{date}</Text>
              <Text variant="bodyMedium" className={"mx-2"}>{time}</Text>
            </View>
            <Text
                variant="bodyMedium"
                style={{
                  color: `${cores.find((c) => c.status === status)?.color}`,
                }}
            >
              {status}
            </Text>
          </View>
        </Card.Content>
      </Card>
  );
};

export default SessaoCard;
