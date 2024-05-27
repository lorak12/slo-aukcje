"use client";
import ProductCard from "@/components/ProductCard";
import AuctionController from "@/components/controllers/AuctionController";
import ProductController from "@/components/controllers/ProductController";
import { Product } from "@prisma/client";
import React, { useState } from "react";

function DashboardClient({ products }: { products: Product[] | null }) {
  if (!products || products.length <= 0) return null;

  const initialState = products.find(
    (product) => product.isVisible === true
  )?.id;

  const [productId, setProductId] = useState<string>(initialState ?? "");

  return (
    <div className="grid grid-cols-4 gap-8">
      <ProductController
        products={products}
        productId={productId}
        setProductId={setProductId}
      />
      <AuctionController
        product={products.find((product) => product.id === productId)}
      />
      <div></div>
      <ProductCard
        product={products.find((product) => product.id === productId)}
      />
    </div>
  );
}

export default DashboardClient;
