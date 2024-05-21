import React from "react";

function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="container mx-auto py-12 flex items-center justify-center min-h-screen">
      {children}
    </main>
  );
}

export default AuthLayout;
