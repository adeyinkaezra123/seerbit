"use client";

import { useRouter } from "next/navigation";
import { createContext, useState, useEffect } from "react";
import { toast } from "react-hot-toast";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  const router = useRouter();

  useEffect(() => {
    setCartToState();
  }, []);

  const setCartToState = () => {
    setCart(
      localStorage.getItem("cart")
        ? JSON.parse(localStorage.getItem("cart"))
        : []
    );
  };

  const addItemToCart = async ({
    product,
    name,
    price,
    image,
    stock,
    seller,
    quantity = 1,
  }) => {
    const item = {
      product,
      name,
      price,
      image,
      stock,
      seller,
      quantity,
    };

    const isItemExist = cart?.cartItems?.find(
      (i) => i.product === item.product
    );

    let newCartItems;
    if (isItemExist) {
      newCartItems = cart?.cartItems?.map((i) =>
        i.product === isItemExist.product ? item : i
        
      );
      toast("Item is already in the cart");
    } else {
      newCartItems = [...(cart?.cartItems || []), item];
      toast.success("Item sucessfully deleted from cart");
    }

    localStorage.setItem("cart", JSON.stringify({ cartItems: newCartItems }));
    setCartToState();
  };

  const deleteItemFromCart = (id) => {
    const newCartItems = cart?.cartItems?.filter((i) => i.product !== id);

    localStorage.setItem("cart", JSON.stringify({ cartItems: newCartItems }));
    setCartToState();
    toast.success("Item sucessfully deleted from cart");
  };

  const saveOnCheckout = ({ amount, tax, totalAmount }) => {
    const checkoutInfo = {
      amount,
      tax,
      totalAmount,
    };

    const newCart = { ...cart, checkoutInfo };

    localStorage.setItem("cart", JSON.stringify(newCart));
    setCartToState();
    router.push("/shipping");
  };

  const clearCart = () => {
    localStorage.removeItem("cart");
    setCartToState();
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addItemToCart,
        saveOnCheckout,
        deleteItemFromCart,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartContext;
