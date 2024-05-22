import { DataTable } from "@/components/ui/data-table";
import { Product, columns } from "./columns";
import { getProducts } from "@/actions/productActions";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { CirclePlus } from "lucide-react";

async function Page() {
  const products = await getProducts();

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
      <DataTable columns={columns} data={products} filter="name" />
    </div>
  );
}

export default Page;
