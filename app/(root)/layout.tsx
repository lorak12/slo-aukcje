import { Navbar } from "@/components/Navbar";
import { ThemeProvider } from "@/providers/theme-privder";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
      >
        <Navbar />
        {children}
      </ThemeProvider>
    </>
  );
}
