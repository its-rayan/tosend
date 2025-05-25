import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Mademail",
  description: "The Design-First, AI-Enhanced Email Builder for Teams",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
