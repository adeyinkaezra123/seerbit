"use client";

import Link from "next/link";
import React, { useState } from "react";
import { signIn } from "next-auth/react";
import { toast } from "react-hot-toast";
import { useRouter, useSearchParams } from "next/navigation";
import { parseCallbackUrl } from "@/helpers/helpers";
import { Button } from "../layouts";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const router = useRouter();
  const params = useSearchParams();
  const callBackUrl = params.get("callbackUrl");

  const submitHandler = async (e) => {
    e.preventDefault();

    const data = await signIn("credentials", {
      email,
      password,
      callbackUrl: callBackUrl ? parseCallbackUrl(callBackUrl) : "/",
    });

    if (data?.error) {
      toast.error(data?.error);
    }

    if (data?.ok) {
      router.push("/");
    }
  };

  return (
    <div className="flex items-center justify-center w-full h-[100vh]">
      <div
        style={{ maxWidth: "480px" }}
        className="mb-20 w-1/3 p-4 md:p-7 rounded bg-white shadow-lg"
      >
        <form onSubmit={submitHandler} className="flex flex-col gap-4">
          <h2 className="mb-5 text-2xl font-semibold">Login</h2>

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

          <div className="mb-4">
            <label className="block mb-1"> Password </label>
            <input
              className="appearance-none border border-gray-200 bg-gray-100 rounded-md py-2 px-3 hover:border-gray-400 focus:outline-none focus:border-gray-400 w-full"
              type="password"
              placeholder="Type your password"
              minLength={6}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <Button
            type="submit"
            customClass="my-2 w-full inline-block rounded-full"
          >
            Login
          </Button>

          <hr className="mt-4" />

          <p className="text-center mt-5">
            Don't have an account?{" "}
            <Link href="/register" className="pl-2 text-blue-500">
              Register
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
