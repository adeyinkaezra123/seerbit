import Header from "@/components/layouts/Header";
import { GlobalProvider } from "./GlobalProvider";
import "./styles/globals.css";
import { Urbanist } from "@next/font/google";
const font = Urbanist({ subsets: ["latin"] });

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head />
      <body className={font.className}>
        <GlobalProvider>
          <Header />
          {children}
        </GlobalProvider>
      </body>
    </html>
  );
}
