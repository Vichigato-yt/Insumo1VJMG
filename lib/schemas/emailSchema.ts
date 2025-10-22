
import { z } from "zod";
import errorMessages from "../constants/errorMessages";

export const emailSchema = z
  .string()
  .min(1, { message: errorMessages.email.required }) // No vacío
  .email({ message: errorMessages.email.invalid })   // Formato email válido
  .transform((val) => val.trim().toLowerCase());     // Limpia espacios y pasa a minúsculas
