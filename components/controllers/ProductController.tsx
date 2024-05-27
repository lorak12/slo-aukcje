"use client";
import React, { Dispatch, SetStateAction, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Product } from "@prisma/client";
import { Check, ChevronsUpDown } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

function ProductController({
  products,
  productId,
  setProductId,
}: {
  products: Product[] | null;
  productId: string;
  setProductId: Dispatch<SetStateAction<string>>;
}) {
  if (!products || products.length <= 0) return null;

  const [open, setOpen] = useState(false);

  return (
    <Card className="col-span-2">
      <CardHeader>
        <CardTitle>Kontroler produktu</CardTitle>
        <CardDescription>
          Wybierz produkt który będzie właśnie licytowany.
        </CardDescription>
        <CardContent className="p-0">
          <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                role="combobox"
                aria-expanded={open}
                className="w-[200px] justify-between"
              >
                {productId
                  ? products.find((product) => product.id === productId)?.name
                  : "Wybierz produkt"}
                <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[200px] p-0">
              <Command
                defaultValue={
                  products.find((product) => product.id === productId)?.name
                }
              >
                <CommandInput placeholder="Szukaj..." />
                <CommandEmpty>Brak wyników.</CommandEmpty>
                <CommandList>
                  {products.map((product) => (
                    <CommandItem
                      key={product.id}
                      value={product.name}
                      onSelect={(currentValue) => {
                        const id = products.find(
                          (product) => product.name === currentValue
                        )?.id;
                        setProductId(id ?? "");
                        setOpen(false);
                      }}
                    >
                      <Check
                        className={cn(
                          "mr-2 h-4 w-4",
                          productId === product.id ? "opacity-100" : "opacity-0"
                        )}
                      />
                      {product.name}
                    </CommandItem>
                  ))}
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>
        </CardContent>
      </CardHeader>
    </Card>
  );
}

export default ProductController;
