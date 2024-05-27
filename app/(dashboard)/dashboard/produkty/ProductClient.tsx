"use client";
import { DataTable } from "@/components/ui/data-table";
import { columns } from "./columns";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { CirclePlus } from "lucide-react";
import { supabaseClient } from "@/lib/supabase";
import { useEffect, useState } from "react";

function ProductClient({ products }: { products: any }) {
  const [clientProducts, setClientProducts] = useState(products);

  useEffect(() => {
    const channel = supabaseClient
      .channel("schema-db-changes")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "Product",
        },
        (payload) => {
          switch (payload.eventType) {
            case "INSERT":
              setClientProducts((prevProducts: any) => [
                ...prevProducts,
                payload.new,
              ]);
              break;

            case "UPDATE":
              setClientProducts((prevProducts: any) =>
                prevProducts.map((product: any) =>
                  product.id === payload.old.id ? payload.new : product
                )
              );
              break;

            case "DELETE":
              setClientProducts((prevProducts: any) =>
                prevProducts.filter(
                  (product: any) => product.id !== payload.old.id
                )
              );
              break;

            default:
              break;
          }
        }
      )
      .subscribe();

    return () => {
      supabaseClient.removeChannel(channel);
    };
  }, [supabaseClient]);

  return (
    <div className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
      <div className="flex items-center justify-between">
        <h1 className="text-lg font-semibold md:text-2xl">Produkty</h1>
        <Button asChild className="gap-2">
          <Link href="/dashboard/produkty/new">
            Dodaj Produkt <CirclePlus className="w-4 h-4" />
          </Link>
        </Button>
      </div>
      <DataTable columns={columns} data={clientProducts} filter="name" />
    </div>
  );
}

export default ProductClient;
