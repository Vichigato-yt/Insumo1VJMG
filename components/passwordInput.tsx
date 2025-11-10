// components/PasswordInput.tsx
import React from "react";
import { TextInput, View, Text } from "react-native";

type Props = {
  value?: string;
  onChange: (v: string) => void;
  placeholder?: string;
  error?: string | null;
};

export default function PasswordInput({ value = "", onChange, placeholder = "Contraseña", error }: Props) {
  return (
    <View className="mb-4">
      <TextInput
        value={value}
        onChangeText={onChange}
        placeholder={placeholder}
        secureTextEntry
        autoCapitalize="none"
        className={`border rounded-lg px-4 py-3 text-base ${error ? "border-red-400" : "border-gray-300"} bg-white`}
      />
      {error ? <Text className="mt-2 text-red-600 font-medium">{error}</Text> : null}
    </View>
  );
}
