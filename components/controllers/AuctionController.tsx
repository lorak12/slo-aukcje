import { Product } from "@prisma/client";
import { Button } from "../ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import {
  disableProductVisibility,
  enableProductVisibility,
} from "@/actions/productActions";

function AuctionController({ product }: { product: Product | undefined }) {
  if (!product) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Aukcja</CardTitle>
          <CardDescription>Wszystkie ustawienia aukcji</CardDescription>
        </CardHeader>
        <CardContent>Wybierz produkt</CardContent>
      </Card>
    );
  }
  return (
    <Card>
      <CardHeader>
        <CardTitle>Aukcja</CardTitle>
        <CardDescription>Wszystkie ustawienia aukcji</CardDescription>
      </CardHeader>
      <CardContent>
        {product?.isVisible ? (
          <Button
            variant={"destructive"}
            onClick={() => {
              disableProductVisibility(product.id);
            }}
          >
            Zakończ aukcje
          </Button>
        ) : (
          <Button
            onClick={() => {
              enableProductVisibility(product.id);
            }}
          >
            Zacznij aukcje
          </Button>
        )}
      </CardContent>
    </Card>
  );
}

export default AuctionController;
