import React from "react";

import { TextInput } from "react-native-paper";

export interface SearchInputProps {
  value: string;
  onValueChange: (text: string) => void;
  onRightPress?: () => void;
}

const SearchInput = ({ value, onValueChange, onRightPress }: SearchInputProps) => {
  return (
    <TextInput
      style={{ marginBottom: 16 }}
      mode="outlined"
      label="Pesquisar"
      value={value}
      onChangeText={onValueChange}
      left={<TextInput.Icon icon="magnify" />}
      right={<TextInput.Icon icon="close-circle-outline" onPress={onRightPress} />}
    />
  );
};

export default SearchInput;
