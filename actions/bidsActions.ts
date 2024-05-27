"use server";
import prisma from "@/lib/prisma";
import { bidFormSchema } from "@/schemas/bidFormSchema";
import { revalidatePath } from "next/cache";
import { z } from "zod";

export async function getBids(productId: string) {
  if (!productId) {
    throw new Error("No product id provided");
  }
  const bids = await prisma.bid.findMany({
    where: {
      productId: productId,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
  revalidatePath("/");
  return bids;
}

export async function createBid(
  values: z.infer<typeof bidFormSchema>,
  productId: string
) {
  const product = await prisma.product.findUnique({
    where: { id: productId },
    include: { Bids: true },
  });

  if (!product) {
    throw new Error("Product not found");
  }

  // Sprawdzamy, czy nowa cena jest większa niż startingPrice
  if (values.price < product.startingPrice) {
    throw new Error("Bid price must be greater than starting price");
  }

  // Sprawdzamy, czy nowa cena jest większa niż ostatnia cena z innej oferty
  const highestBid = product.Bids.reduce(
    (max, bid) => (bid.price > max ? bid.price : max),
    0
  );

  if (values.price <= highestBid) {
    throw new Error("Bid price must be higher than the current highest bid");
  }

  // Tworzymy nową ofertę (Bid)
  const newBid = await prisma.bid.create({
    data: {
      price: values.price,
      bidder: "Brak",
      productId: productId,
    },
  });

  // Aktualizujemy produkt
  await prisma.product.update({
    where: { id: productId },
    data: {
      endingPrice: values.price,
      Bids: {
        connect: {
          id: newBid.id,
        },
      },
    },
  });

  revalidatePath("/");
}
