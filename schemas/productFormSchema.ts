import z from "zod";
export const productFormSchema = z.object({
  name: z
    .string()
    .min(1, { message: "Nazwa produktu musi być dłuższa niż jeden znak" }),

  startingPrice: z.coerce
    .number()
    .nonnegative({ message: "Cena nie może być ujemna" }),
});
export const productFormSchemaFull = z.object({
  name: z
    .string()
    .min(1, { message: "Nazwa produktu musi być dłuższa niż jeden znak" }),

  startingPrice: z.coerce
    .number()
    .nonnegative({ message: "Cena nie może być ujemna" }),
  endingPrice: z.coerce
    .number()
    .nonnegative({ message: "Cena końcowa nie może być ujemna" }),
  isVisible: z.boolean(),
  buyer: z
    .string()
    .min(1, { message: "Nazwa kupującego musi być dłuższa niż jeden znak" }),
  status: z.string(),
});
