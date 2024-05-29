export default async function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="grid place-content-center min-h-screen">{children}</main>
  );
}
