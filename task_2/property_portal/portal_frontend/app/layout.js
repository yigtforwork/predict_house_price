import "./globals.css";
import PortalNav from "@/components/PortalNav";

export const metadata = {
  title: "Property Analytics Portal",
  description: "Property value estimation and market analysis portal"
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <PortalNav />
        <main>{children}</main>
      </body>
    </html>
  );
}