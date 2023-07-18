import Header from "@/components/layouts/Header";
import { GlobalProvider } from "./GlobalProvider";
import "./styles/globals.css";
import { Urbanist } from "@next/font/google";
const font = Urbanist({ subsets: ["latin"] });

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta name="next-size-adjust" />
      <body className={font.className}>
        <GlobalProvider>
          <Header />
          {children}
        </GlobalProvider>
      </body>
    </html>
  );
}
