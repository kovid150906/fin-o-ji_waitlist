import "./globals.css";

export const metadata = {
  title: "fin-o-ji | Your personal AI insurance advocate",
  description: "We simplify your insurance journey, ensure better decisions, and give you peace of mind.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
