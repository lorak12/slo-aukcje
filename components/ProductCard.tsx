import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Table, TableBody, TableCell, TableRow } from "./ui/table";
import { Product } from "@prisma/client";
import { statuses } from "./ui/constants";

function ProductCard({ product }: { product: Product | undefined }) {
  if (!product) {
    return (
      <Card className="col-span-2">
        <CardHeader>
          <CardTitle>Informacje o produkcie</CardTitle>
          <CardDescription>
            Wszystkie własności licytowanego produktu
          </CardDescription>
        </CardHeader>
        <CardContent>Brak danych</CardContent>
      </Card>
    );
  }

  const status = statuses.find((status) => status.value === product.status);

  function renderStatus(status: any) {
    return (
      <div className="flex w-[100px] items-center">
        {status.icon && (
          <status.icon className="mr-2 h-4 w-4 text-muted-foreground" />
        )}
        <span>{status.label}</span>
      </div>
    );
  }

  return (
    <Card className="col-span-2">
      <CardHeader>
        <CardTitle>Informacje o produkcie</CardTitle>
        <CardDescription>
          Wszystkie własności licytowanego produktu
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableBody>
            <TableRow>
              <TableCell>Nazwa: {product.name}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Cena wywoławcza: {product.startingPrice}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Cena końcowa: {product.endingPrice}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="flex items-center gap-2">
                Status: {renderStatus(status)}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Klasa: {product.buyer}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}

export default ProductCard;
