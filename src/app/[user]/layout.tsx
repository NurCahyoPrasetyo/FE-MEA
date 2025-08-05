import NavBar from "@/components/NavBar";
import "../../styles/globals.css";

export default function UserLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <NavBar />
      <main className="page">{children}</main>
    </html>
  );
}
