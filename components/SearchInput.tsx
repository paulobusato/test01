import React from "react";

import { TextInput } from "react-native-paper";

export interface SearchInputProps {
  value: string;
  onValueChange: (text: string) => void;
}

const SearchInput = ({ value, onValueChange }: SearchInputProps) => {
  return (
    <TextInput
      style={{ marginBottom: 16 }}
      mode="outlined"
      label="Pesquisar"
      value={value}
      onChangeText={onValueChange}
      left={<TextInput.Icon icon="magnify" />}
      right={<TextInput.Icon icon="close-circle-outline" />}
    />
  );
};

export default SearchInput;
