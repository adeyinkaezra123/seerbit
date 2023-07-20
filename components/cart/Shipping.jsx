"use client";

import CartContext from "@/context/CartContext";
import axios from "axios";
import Link from "next/link";
import React, { useContext, useState } from "react";
import { toast } from "react-hot-toast";
import { BreadCrumbs, Modal, Button } from "../layouts";
import SeerbitCheckout from "seerbit-reactjs";
import { useRouter } from "next/navigation";
import AuthContext from "@/context/AuthContext";

const Shipping = ({ addresses }) => {
  const { cart } = useContext(CartContext);
  const { user } = useContext(AuthContext);

  const [showModal, setShowModal] = useState(false);
  const [shippingInfo, setShippinInfo] = useState("");

  const router = useRouter();

  const setShippingAddress = (address) => {
    setShippinInfo(address._id);
  };
  const close = (close) => {
    console.log(close);
  };
  const callback = (response) => {
    router.push("/me/orders?order_success=true");
  };

  const checkProgress = (progress) => {
    console.log(progress);
  };
  const openModal = () => {
    if (!shippingInfo) {
      return toast.error("Please select your shipping address");
    }
    setShowModal(true);
  };

  const checkoutHandler = async () => {
    if (!shippingInfo) {
      return toast.error("Please select your shipping address");
    }
    // move to seerbit checkoutpage
    try {
      const { data } = await axios.post(
        `${process.env.API_URL}/api/orders/checkout_session`,
        {
          items: cart?.cartItems,
          totalAmount: cart?.checkoutInfo?.totalAmount,
          shippingInfo,
        }
      );
      console.log(data);

      window.location.href = data.url;
    } catch (error) {
      console.log(error.response);
    }
  };

  // const checkoutWithVA = async () => {
  //   if (!shippingInfo) {
  //     return toast.error("Please select your shipping address");
  //   }
  // };
  const showVAModal = true;
  const breadCrumbs = [
    { name: "Home", url: "/" },
    { name: "Cart", url: "/cart" },
    { name: "Order", url: "" },
  ];
  const customizationOptions = {
    theme: {
      border_color: "#000000",
      background_color: "#004C64",
      button_color: "#0084A0",
    },
  };
  return (
    <>
      <Modal open={showVAModal}>
        <div className="mb-4">
          <label className="block mb-1"> Email </label>
          <input
            className="appearance-none border border-gray-200 bg-gray-100 rounded-md py-2 px-3 hover:border-gray-400 focus:outline-none focus:border-gray-400 w-full"
            type="text"
            placeholder="Type your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
      </Modal>
      <div>
        <BreadCrumbs breadCrumbs={breadCrumbs} />
        <Modal open={showModal}>
          <h2 className="text-2xl font-semibold">Choose Checkout option</h2>

          <div className="flex flex-col p-4 gap-6 mt-10">
            <SeerbitCheckout
              className="rounded-full inline-flex duration-300 items-center cursor-pointer justify-center text-base font-semibold transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground shadow hover:opacity-75 px-6  py-3"
              type="div"
              tranref={`${shippingInfo}${new Date().getTime()}`}
              currency={"NGN"}
              description={cart?.cartItems[0].name}
              country={"NG"}
              clientappcode="seerbitstore"
              public_key={process.env.SEERBIT_PUBLIC_KEY}
              callback={callback}
              close={close}
              scriptStatus={checkProgress}
              amount={cart?.checkoutInfo?.totalAmount}
              tag={"button"}
              full_name={user?.name}
              email={user?.email}
              mobile_no={"00000000000"}
              display_fee
              tokenize={false}
              customization={customizationOptions}
              version={"2"}
              title={"Simple Checkout"}
              // planId={options.planId}
            />
            <Button customClass="rounded-full" onClick={checkoutHandler}>
              Standard Checkout
            </Button>
            <Button customClass="rounded-full" onClick={checkoutHandler}>
              Virtual Account
            </Button>
          </div>
        </Modal>

        <section className="py-10 bg-gray-50">
          <div className="container max-w-screen-xl mx-auto px-4">
            <div className="flex flex-col md:flex-row gap-4 lg:gap-8">
              <main className="md:w-2/3">
                <article className="border border-gray-200 bg-white shadow-sm rounded p-4 lg:p-6 mb-5">
                  <h2 className="text-xl font-semibold mb-5">
                    Shipping information
                  </h2>

                  <div className="grid sm:grid-cols-2 gap-4 mb-6">
                    {addresses?.map((address) => (
                      <label
                        key={address.zipCode}
                        className="flex p-3 border border-gray-200 rounded-md bg-gray-50 hover:border-blue-400 hover:bg-blue-50 cursor-pointer"
                        onClick={() => setShippingAddress(address)}
                      >
                        <span>
                          <input
                            name="shipping"
                            type="radio"
                            className="h-4 w-4 mt-1"
                          />
                        </span>
                        <p className="ml-2">
                          <span>{address.street}</span>
                          <small className="block text-sm text-gray-400">
                            {address.city}, {address.state}, {address.zipCode}
                            <br />
                            {address.country}
                            <br />
                            {address.phoneNo}
                          </small>
                        </p>
                      </label>
                    ))}
                  </div>

                  <Link
                    href="/address/new"
                    className="px-4 py-2 inline-block text-blue-600 border border-gray-300 rounded-md hover:bg-gray-100"
                  >
                    <i className="mr-1 fa fa-plus"></i> Add new address
                  </Link>

                  <div className="flex justify-end space-x-2 mt-10">
                    <Link
                      href="/cart"
                      className="px-5 py-2 inline-block text-gray-700 bg-white shadow-sm border border-gray-200 rounded-md hover:bg-gray-100 hover:text-blue-600"
                    >
                      Back
                    </Link>
                    <a
                      className="px-5 py-2 inline-block text-white bg-green-600 border border-transparent rounded-md hover:bg-green-700 cursor-pointer"
                      onClick={openModal}
                    >
                      Checkout
                    </a>
                  </div>
                </article>
              </main>
              <aside className="md:w-1/3">
                <article
                  className="text-gray-600"
                  style={{ maxWidth: "350px" }}
                >
                  <h2 className="text-lg font-semibold mb-3">Summary</h2>
                  <ul>
                    <li className="flex justify-between mb-1">
                      <span>Amount:</span>
                      <span>${cart?.checkoutInfo?.amount}</span>
                    </li>
                    <li className="flex justify-between mb-1">
                      <span>Est TAX:</span>
                      <span>${cart?.checkoutInfo?.tax}</span>
                    </li>
                    <li className="border-t flex justify-between mt-3 pt-3">
                      <span>Total Amount:</span>
                      <span className="text-gray-900 font-bold">
                        ${cart?.checkoutInfo?.totalAmount}
                      </span>
                    </li>
                  </ul>

                  <hr className="my-4" />

                  <h2 className="text-lg font-semibold mb-3">Items in cart</h2>

                  {cart?.cartItems?.map((item) => (
                    <figure className="flex items-center mb-4 leading-5">
                      <div>
                        <div className="block relative w-20 h-20 rounded p-1 border border-gray-200">
                          <img
                            width="50"
                            height="50"
                            src={item.image}
                            alt="Title"
                          />
                          <span className="absolute -top-2 -right-2 w-6 h-6 text-sm text-center flex items-center justify-center text-white bg-gray-400 rounded-full">
                            {item.quantity}
                          </span>
                        </div>
                      </div>
                      <figcaption className="ml-3">
                        <p>{item.name.substring(0, 50)}</p>
                        <p className="mt-1 text-gray-400">
                          Total: ${item.quantity * item.price}
                        </p>
                      </figcaption>
                    </figure>
                  ))}
                </article>
              </aside>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

// const VirtualAccount = () => {
//   return (

//   )
// }

export default Shipping;
