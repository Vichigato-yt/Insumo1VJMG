// app/register.tsx
import React from "react";
import {
  KeyboardAvoidingView,
  Platform,
  Text,
  TouchableWithoutFeedback,
  Keyboard,
  View,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerSchema, RegisterForm } from "@/lib/schemas/emailSchema";
import EmailInput from "@/components/emailInput";
import PasswordInput from "@/components/passwordInput";
import AuthButton from "@/components/AuthButton";
import { useRouter } from "expo-router";

export default function Register() {
  const router = useRouter();

  const { handleSubmit, setValue, watch, formState } =
    useForm<RegisterForm>({
      resolver: zodResolver(registerSchema),
      mode: "onChange",
      defaultValues: { name: "", email: "", password: "", confirmPassword: "" },
    });

  const values = watch();
  const isValid = formState.isValid;

  const onSubmit = (data: RegisterForm) => {
    alert(`Registrado: ${data.email}`);
    router.replace("/Login");
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.select({ ios: "padding", android: undefined })}
      className="flex-1 bg-gray-100 px-5 justify-center"
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View>
          <Text className="text-3xl mb-6 font-bold self-center">Crear cuenta</Text>

          <Text className="text-sm text-gray-600 mb-2">Nombre</Text>
          <TextInput
            className="border rounded-lg px-4 py-3 mb-4 bg-white"
            placeholder="Tu nombre"
            onChangeText={(v) => setValue("name", v, { shouldValidate: true })}
          />

          <EmailInput
            value={values.email}
            onChange={(v) => setValue("email", v, { shouldValidate: true })}
            error={formState.errors.email?.message as string}
          />

          <PasswordInput
            value={values.password}
            onChange={(v) => setValue("password", v, { shouldValidate: true })}
            error={formState.errors.password?.message as string}
          />

          <PasswordInput
            value={values.confirmPassword}
            onChange={(v) => setValue("confirmPassword", v, { shouldValidate: true })}
            placeholder="Repite la contraseña"
            error={formState.errors.confirmPassword?.message as string}
          />

          <AuthButton title="Registrarme" onPress={handleSubmit(onSubmit)} disabled={!isValid} />

          <View className="mt-4 flex-row justify-center">
            <Text className="text-gray-600 mr-1">¿Ya tienes cuenta?</Text>

            <TouchableOpacity onPress={() => router.push("/Login")}>
              <Text className="text-blue-600 font-semibold">Inicia sesión</Text>
            </TouchableOpacity>
          </View>

          {formState.isSubmitted && !isValid && (
            <View className="mt-4 px-4 py-3 bg-red-200 rounded-lg">
              <Text className="text-red-600 font-semibold text-base">
                Corrige los errores para continuar.
              </Text>
            </View>
          )}
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}
