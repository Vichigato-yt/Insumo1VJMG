// App.tsx
import EmailInput from "@/components/emailInput";
import "@/global.css";
import React, { useState } from "react";
import { KeyboardAvoidingView, Platform, Text, TouchableOpacity, View } from "react-native";
import { z } from "zod";
const emailSchema = z.string().email();

export default function App() {
  const [email, setEmail] = useState<string>("");
  const [submitPressed, setSubmitPressed] = useState(false);

  const handleValidEmail = (value: string) => {
    setEmail(value);
  };

  const handleSubmit = () => {
    setSubmitPressed(true);

    const parsed = emailSchema.safeParse(email);
    if (parsed.success) {
      alert(`Email válido enviado: ${parsed.data}`);
    } else {
      alert("Por favor, ingresa un email válido antes de continuar.");
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.select({ ios: "padding", android: undefined })}
      className="flex-1 bg-gray-100 px-5 justify-center"
    >
      <Text className="text-3xl mb-8 font-bold self-center">
        Login
      </Text>

      <EmailInput onValidEmail={handleValidEmail} />

      <TouchableOpacity className="mt-8 bg-blue-500 py-4 rounded-xl" onPress={handleSubmit}>
        <Text className="text-white text-lg font-semibold text-center">
          Entrar
        </Text>
      </TouchableOpacity>

      {/* Error visual debajo */}
      {submitPressed && !emailSchema.safeParse(email).success && (
        <View className="mt-4 px-4 py-3 bg-red-200 rounded-lg">
          <Text className="text-red-600 font-semibold text-base">
            Por favor, ingresa un email válido.
          </Text>
        </View>
      )}
    </KeyboardAvoidingView>
  );
}
