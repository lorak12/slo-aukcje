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
import { bidFormSchema } from "@/schemas/bidFormSchema";
import { createBid } from "@/actions/bidsActions";
import { SheetClose } from "@/components/ui/sheet";

export function BidForm({ productId }: { productId: string }) {
  // TODO: dodać gdy bedzie auth zeby bidder sie robił jako klasa którą jesteś
  const form = useForm<z.infer<typeof bidFormSchema>>({
    resolver: zodResolver(bidFormSchema),
  });

  async function onSubmit(data: z.infer<typeof bidFormSchema>) {
    await createBid(data, productId);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 w-full">
        <FormField
          control={form.control}
          name="price"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nowa cena</FormLabel>
              <FormControl>
                <Input {...field} type="number" />
              </FormControl>
              <FormDescription>
                Cena którą jesteś wstanie zapłacić.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex justify-end w-full">
          <SheetClose asChild>
            <Button type="submit">Submit</Button>
          </SheetClose>
        </div>
      </form>
    </Form>
  );
}
