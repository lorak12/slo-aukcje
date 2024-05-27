import { getProducts } from "@/actions/productActions";
import DashboardClient from "./DashboardClient";

async function Page() {
  const products = await getProducts();
  return <DashboardClient products={products} />;
}

export default Page;
