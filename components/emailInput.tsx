// /components/EmailInput.tsx

import React, { useState } from "react";
import { View, TextInput, Text, StyleSheet } from "react-native";
import { emailSchema } from "../lib/schemas/emailSchema";
import errorMessages from "../lib/constants/errorMessages";

interface Props {
  onValidEmail: (email: string) => void;
}

const EmailInput: React.FC<Props> = ({ onValidEmail }) => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState<string | null>(null);

  const validateEmail = (value: string) => {
    try {
      const parsedEmail = emailSchema.parse(value);
      setError(null);
      onValidEmail(parsedEmail);
    } catch (err: any) {
      if (err.errors && err.errors.length > 0) {
        setError(err.errors[0].message);
      } else {
        setError("Error desconocido");
      }
    }
  };

  const handleChange = (text: string) => {
    setEmail(text);
    validateEmail(text);
  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Introduce tu email"
        value={email}
        onChangeText={handleChange}
        autoCapitalize="none"
        keyboardType="email-address"
        style={[styles.input, error && styles.inputError]}
      />
      {error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
    width: "100%",
  },
  input: {
    height: 50,
    borderColor: "#ccc",
    borderWidth: 1,
    paddingHorizontal: 15,
    borderRadius: 8,
    fontSize: 16,
  },
  inputError: {
    borderColor: "red",
  },
  errorText: {
    color: "red",
    marginTop: 5,
    fontSize: 14,
  },
});

export default EmailInput;
