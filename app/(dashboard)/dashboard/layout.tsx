import { getVisibleProduct } from "@/actions/productActions";
import { ReactNode } from "react";
import LayoutNavbar from "./LayoutNavbar";
import { validateRequest } from "@/auth";
import { redirect } from "next/navigation";

async function DashboardLayout({ children }: { children: ReactNode }) {
  const { user } = await validateRequest();
  if (!user) {
    return redirect("/login");
  }

  const product = await getVisibleProduct();

  return <LayoutNavbar product={product}>{children}</LayoutNavbar>;
}
export default DashboardLayout;
