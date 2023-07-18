"use client";

import { AuthProvider } from "@/context/AuthContext";
import { CartProvider } from "@/context/CartContext";
import { OrderProvider } from "@/context/OrderContext";
import { ProductProvider } from "@/context/ProductContext";
import { SessionProvider } from "next-auth/react";

import { Toaster, resolveValue } from "react-hot-toast";

export function GlobalProvider({ children }) {
  return (
    <>
      <AuthProvider>
        <Toaster position="top-center" containerClassName="font-sans font-medium " />
        <CartProvider>
          <OrderProvider>
            <ProductProvider>
              <SessionProvider>{children}</SessionProvider>
            </ProductProvider>
          </OrderProvider>
        </CartProvider>
      </AuthProvider>
    </>
  );
}
