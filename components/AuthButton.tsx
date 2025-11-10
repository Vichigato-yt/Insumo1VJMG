// components/AuthButton.tsx
import React from "react";
import { TouchableOpacity, Text } from "react-native";

type Props = {
  title: string;
  onPress: () => void;
  disabled?: boolean;
};

export default function AuthButton({ title, onPress, disabled = false }: Props) {
  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled}
      className={`py-4 rounded-xl ${disabled ? "bg-gray-300" : "bg-blue-500"}`}
    >
      <Text className={`text-center text-white text-lg font-semibold`}>{title}</Text>
    </TouchableOpacity>
  );
}
