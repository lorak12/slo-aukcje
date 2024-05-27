import { getBids } from "@/actions/bidsActions";
import { getVisibleProduct } from "@/actions/productActions";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { BidForm } from "./BidForm";
import { formatPrice } from "@/lib/utils";

export default async function Home() {
  const product = await getVisibleProduct();
  if (!product) {
    return (
      <main className="m-12 flex items-center justify-center min-h-[calc(100vh-200px)]">
        <h1>Brak aktywnego produktu...</h1>
      </main>
    );
  }

  const bids = await getBids(product.id);

  return (
    <main className="grid grid-cols-2 m-12 min-h-[calc(100vh-200px)] gap-8 mt-16">
      <section className="flex flex-col gap-6">
        <h1>{product.name}</h1>
        <h2>Cena wywoławcza: {formatPrice(product.startingPrice)}</h2>
        <div>
          <Sheet>
            <SheetTrigger asChild>
              <Button>Licytuj</Button>
            </SheetTrigger>
            <SheetContent side="left">
              <SheetHeader>
                <SheetTitle>Podbij stawkę</SheetTitle>
                <SheetDescription>
                  Podaj nową kwotę którą jesteś wstanie zapłacić
                </SheetDescription>
              </SheetHeader>
              <div className="grid gap-4 py-4">
                <BidForm productId={product.id} />
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </section>
      <section className="flex  items-center flex-col">
        <div className="border p-4 rounded-xl w-[500px] h-fit scale-150 flex flex-col items-center justify-center">
          <Table className="max-w-[500px]">
            <TableHeader>
              <TableRow>
                <TableHead>Klasa</TableHead>
                <TableHead className="text-right">Aktualna Cena</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {bids.map((bid) => (
                <TableRow key={bid.id}>
                  <TableCell className="font-medium">{bid.bidder}</TableCell>
                  <TableCell className="text-right">
                    {formatPrice(bid.price)}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </section>
    </main>
  );
}
