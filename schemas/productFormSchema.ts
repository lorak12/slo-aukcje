import z from "zod";
export const productFormSchema = z.object({
  name: z
    .string()
    .min(1, { message: "Nazwa produktu musi być dłuższa niż jeden znak" }),

  startingPrice: z.coerce
    .number()
    .nonnegative({ message: "Cena nie może być ujemna" }),
});
