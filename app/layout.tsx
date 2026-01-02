import "./globals.css";
import Navigation from "@/components/Navigation";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <title>Wishlist App</title>
      </head>
      <body suppressHydrationWarning>
        <Navigation />
        {children}
      </body>
    </html>
  );
}
