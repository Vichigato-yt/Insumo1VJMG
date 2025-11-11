// app/login.tsx
import React from "react";
import { KeyboardAvoidingView, Platform, Text, TouchableWithoutFeedback, Keyboard, View, TouchableOpacity } from "react-native";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema, LoginForm } from "@/lib/schemas/emailSchema";
import EmailInput from "@/components/emailInput";
import PasswordInput from "@/components/passwordInput";
import AuthButton from "@/components/AuthButton";
import { useRouter } from "expo-router";
import "@/global.css"

export default function Login() {
  const router = useRouter();

  const { control, handleSubmit, setValue, watch, formState } = useForm<LoginForm>({
    resolver: zodResolver(loginSchema),
    mode: "onChange",
    defaultValues: { email: "", password: "" },
  });

  const values = watch();
  const isValid = formState.isValid;

  const onSubmit = (data: LoginForm) => {
    alert(`Ingresaste: ${data.email}`);
    // router.replace("/home");
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.select({ ios: "padding", android: undefined })}
      className="flex-1 bg-gray-100 px-5 justify-center"
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View>
          <Text className="text-3xl mb-8 font-bold self-center">Iniciar sesión</Text>

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

          <AuthButton title="Entrar" onPress={handleSubmit(onSubmit)} disabled={!isValid} />

          <View className="mt-4 flex-row justify-center items-center">
            <Text className="text-gray-600 mr-1">¿No tienes cuenta?</Text>

            <TouchableOpacity onPress={() => router.push("/Register")}>
              <Text className="text-blue-600 font-semibold">Regístrate</Text>
            </TouchableOpacity>
          </View>

          {formState.isSubmitted && !isValid && (
            <View className="mt-4 px-4 py-3 bg-red-200 rounded-lg">
              <Text className="text-red-600 font-semibold text-base">Revisa los campos del formulario.</Text>
            </View>
          )}
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}
