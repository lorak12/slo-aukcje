import z from "zod";

export const bidFormSchema = z.object({
  price: z.coerce.number().nonnegative({ message: "Cena nie może być ujemna" }),
});
