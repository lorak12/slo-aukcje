"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { productFormSchema } from "@/schemas/productFormSchema";
import { createProduct } from "@/actions/productActions";
import { toast } from "@/components/ui/use-toast";
import { CircleCheck, CircleX } from "lucide-react";
import { useRouter } from "next/navigation";

export function ProductForm() {
  const router = useRouter();

  const form = useForm<z.infer<typeof productFormSchema>>({
    resolver: zodResolver(productFormSchema),
    defaultValues: {
      name: "",
      startingPrice: 0,
    },
  });

  async function onSubmit(values: z.infer<typeof productFormSchema>) {
    try {
      toast({
        title: "Sukces!",
        description: "Produkt został dodany bez żadnych przeszkód.",
        action: <CircleCheck className="w-4 h-4 text-green-500" />,
      });
      await createProduct(values);
      router.push("/dashboard/produkty");
      router.refresh();
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Uh oh! Coś poszło nie tak.",
        description: "W żądaniu pojawił się problem.",
        action: <CircleX className="w-4 h-4 text-white" />,
      });
      console.error(error);
      return error;
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nazwa</FormLabel>
              <FormControl>
                <Input placeholder="Nazwa..." {...field} />
              </FormControl>
              <FormDescription>Nazwa produktu</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="startingPrice"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Cena Wywoławcza</FormLabel>
              <FormControl>
                <Input {...field} type="number" inputMode="numeric" />
              </FormControl>
              <FormDescription>
                Cena wywoławcza od której zacznie się licytacja
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Utwórz</Button>
      </form>
    </Form>
  );
}
