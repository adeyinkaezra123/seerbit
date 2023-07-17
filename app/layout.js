import Header from "@/components/layouts/Header";
import { GlobalProvider } from "./GlobalProvider";
import "./styles/globals.css";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head />
      <body>
        <GlobalProvider>
          <Header />
          {children}
        </GlobalProvider>
      </body>
    </html>
  );
}
