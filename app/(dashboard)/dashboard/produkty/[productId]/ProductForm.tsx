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
import {
  productFormSchema,
  productFormSchemaFull,
} from "@/schemas/productFormSchema";
import { createProduct, updateProduct } from "@/actions/productActions";
import { toast } from "@/components/ui/use-toast";
import { CircleCheck, CircleX } from "lucide-react";
import { useRouter } from "next/navigation";
import { Product } from "@prisma/client";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { statuses } from "@/components/ui/constants";
import { Checkbox } from "@/components/ui/checkbox";

export function ProductForm(initialData: { initialData: Product | null }) {
  const router = useRouter();

  const initialFormData = initialData.initialData?.id
    ? { ...initialData.initialData }
    : {
        name: "",
        startingPrice: 0,
      };

  const form = useForm<z.infer<typeof productFormSchemaFull>>({
    resolver: zodResolver(
      initialData.initialData?.id ? productFormSchemaFull : productFormSchema
    ),
    defaultValues: initialFormData,
  });

  async function onSubmit(values: z.infer<typeof productFormSchemaFull>) {
    try {
      if (initialData.initialData?.id) {
        await updateProduct(values, initialData.initialData?.id ?? "");
      } else {
        toast({
          title: "Sukces!",
          description: "Produkt został dodany bez żadnych przeszkód.",
          action: <CircleCheck className="w-4 h-4 text-green-500" />,
        });
        await createProduct(values);
      }
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
        {initialData.initialData?.id ? (
          <>
            <FormField
              control={form.control}
              name="endingPrice"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Cena Końcowa</FormLabel>
                  <FormControl>
                    <Input {...field} type="number" inputMode="numeric" />
                  </FormControl>
                  <FormDescription>
                    Cena na której zakończyła się licytacja
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="buyer"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Klasa</FormLabel>
                  <FormControl>
                    <Input placeholder="Klasa..." {...field} />
                  </FormControl>
                  <FormDescription>
                    Klasa która wygrała licytacje
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="status"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Status</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Wybierz status licytacji" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {statuses.map((status) => (
                        <SelectItem value={status.value} key={status.value}>
                          <div className="flex gap-2 items-center">
                            <status.icon className="w-4 h-4" />
                            {status.label}
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormDescription>
                    Status w jakim jest licytacja
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="isVisible"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel>Czy licytacja ma być wyświetlana?</FormLabel>
                    <FormDescription>
                      Jeżeli tak to zaznacz tą opcje
                    </FormDescription>
                  </div>
                </FormItem>
              )}
            />
          </>
        ) : null}

        <Button type="submit">Utwórz</Button>
      </form>
    </Form>
  );
}
