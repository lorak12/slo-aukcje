"use server";
import prisma from "@/lib/prisma";
import {
  productFormSchema,
  productFormSchemaFull,
} from "@/schemas/productFormSchema";
import { revalidatePath } from "next/cache";
import { z } from "zod";

export async function createProduct(values: z.infer<typeof productFormSchema>) {
  const validation = productFormSchema.safeParse(values);

  if (!validation.success) {
    throw new Error(validation.error.message);
  }

  await prisma.product.create({
    data: {
      name: values.name,
      buyer: "Brak",
      startingPrice: values.startingPrice,
      endingPrice: values.startingPrice, // set to startingPrice upon creation bc endingPrice won't be lower than startingPrice
      status: "none",
      isVisible: false,
    },
  }),
    revalidatePath("/dashboard");
}

export async function getProducts() {
  const products = await prisma.product.findMany();
  revalidatePath("/dashboard");
  return products;
}

export async function getProduct(id: string) {
  if (!id) {
    throw new Error("No product id provided");
  }

  const product = await prisma.product.findUnique({
    where: { id: id },
  });
  revalidatePath("/dashboard");
  return product;
}

export async function deleteProduct(id: string) {
  if (!id) {
    throw new Error("No product id provided");
  }

  await prisma.$transaction(async (prisma) => {
    await prisma.bid.deleteMany({
      where: {
        productId: id,
      },
    });

    await prisma.product.delete({
      where: { id: id },
    });
  });
}

export async function getVisibleProduct() {
  const product = await prisma.product.findFirst({
    where: {
      isVisible: true,
    },
  });
  revalidatePath("/dashboard");
  return product;
}

export async function updateProduct(
  values: z.infer<typeof productFormSchemaFull>,
  id: string
) {
  if (!id) {
    throw new Error("No product id provided");
  }

  const validation = productFormSchemaFull.safeParse(values);

  if (!validation.success) {
    throw new Error(validation.error.message);
  }

  await prisma.product.update({
    where: { id: id },
    data: {
      name: values.name,
      startingPrice: values.startingPrice,
      endingPrice: values.endingPrice,
      isVisible: values.isVisible,
      buyer: values.buyer,
      status: values.status,
    },
  });
  revalidatePath("/dashboard");
}

export async function enableProductVisibility(id: string) {
  if (!id) {
    throw new Error("No product id provided");
  }
  await prisma.product.updateMany({
    where: {
      isVisible: true,
    },
    data: {
      isVisible: false,
    },
  });

  await prisma.product.update({
    where: { id: id },
    data: {
      isVisible: true,
      status: "inProgress",
    },
  });
  revalidatePath("/");
}
export async function disableProductVisibility(id: string) {
  if (!id) {
    throw new Error("No product id provided");
  }
  await prisma.product.updateMany({
    where: {
      isVisible: true,
    },
    data: {
      isVisible: false,
      status: "ended",
    },
  });
  revalidatePath("/");
}
