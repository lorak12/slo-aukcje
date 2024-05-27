import React from "react";
import { ProductForm } from "./ProductForm";
import { getProduct } from "@/actions/productActions";

async function Page({ params }: { params: { productId: string } }) {
  const product = await getProduct(params.productId);

  return (
    <div>
      <ProductForm initialData={product} />
    </div>
  );
}

export default Page;
