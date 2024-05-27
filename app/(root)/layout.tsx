import { Navbar } from "@/components/Navbar";
import { ThemeProvider } from "@/providers/theme-privder";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Navbar />
      {children}
    </>
  );
}
