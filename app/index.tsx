// App.tsx

import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, KeyboardAvoidingView, Platform } from "react-native";
import EmailInput from "@/components/emailInput";

export default function App() {
  const [emailValid, setEmailValid] = useState<string | null>(null);
  const [submitPressed, setSubmitPressed] = useState(false);

  const handleValidEmail = (email: string) => {
    setEmailValid(email);
  };

  const handleSubmit = () => {
    setSubmitPressed(true);
    if (emailValid) {
      alert(`Email válido enviado: ${emailValid}`);
    } else {
      alert("Por favor, ingresa un email válido antes de continuar.");
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.select({ ios: "padding", android: undefined })}
      style={styles.container}
    >
      <Text style={styles.title}>Login</Text>

      <EmailInput onValidEmail={handleValidEmail} />

      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Entrar</Text>
      </TouchableOpacity>

      {/* Mensaje de error sin animación */}
      {submitPressed && !emailValid && (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>Por favor, ingresa un email válido.</Text>
        </View>
      )}
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f7f7f7",
    padding: 20,
    justifyContent: "center",
  },
  title: {
    fontSize: 28,
    marginBottom: 30,
    fontWeight: "bold",
    alignSelf: "center",
  },
  button: {
    marginTop: 30,
    backgroundColor: "#007AFF",
    paddingVertical: 15,
    borderRadius: 10,
  },
  buttonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "600",
    textAlign: "center",
  },
  errorContainer: {
    marginTop: 20,
    paddingHorizontal: 15,
    paddingVertical: 10,
    backgroundColor: "#ffcccc",
    borderRadius: 8,
  },
  errorText: {
    color: "#b00020",
    fontWeight: "600",
    fontSize: 16,
  },
});
