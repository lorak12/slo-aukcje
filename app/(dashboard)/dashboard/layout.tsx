import { getVisibleProduct } from "@/actions/productActions";
import { ReactNode } from "react";
import LayoutNavbar from "./LayoutNavbar";
import { redirect } from "next/navigation";
import { checkRole } from "@/lib/roles";

async function DashboardLayout({ children }: { children: ReactNode }) {
  if (!checkRole("admin")) {
    redirect("/");
  }

  const product = await getVisibleProduct();

  return <LayoutNavbar product={product}>{children}</LayoutNavbar>;
}
export default DashboardLayout;
