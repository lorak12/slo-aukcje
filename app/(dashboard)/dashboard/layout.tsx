import { getVisibleProduct } from "@/actions/productActions";
import { ReactNode } from "react";
import LayoutNavbar from "./LayoutNavbar";

async function DashboardLayout({ children }: { children: ReactNode }) {
  const product = await getVisibleProduct();

  return <LayoutNavbar product={product}>{children}</LayoutNavbar>;
}
export default DashboardLayout;
