import { Href, useRouter } from "expo-router";
import React from "react";
import { FlatList, View } from "react-native";

import { IconButton, Text } from "react-native-paper";

export interface QuadrantProps<T> {
  title: string;
  data: T[];
  keyExtractor: (item: T) => string;
  renderItem: ({ item }: { item: T }) => React.ReactElement;
  route: Href;
}

const Quadrant = <T,>({
  title,
  data,
  keyExtractor,
  renderItem,
  route,
}: QuadrantProps<T>) => {
  const router = useRouter(); // <-- Add this

  return (
    <View className="p-4">
      <View className="flex-row items-center">
        <Text variant="titleLarge">{title}</Text>
        <IconButton
          icon="arrow-right"
          size={16}
          onPress={() => router.push(route)}
        />
      </View>
      <FlatList
        data={data}
        keyExtractor={keyExtractor}
        renderItem={renderItem}
      />
    </View>
  );
};

export default Quadrant;
