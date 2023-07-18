import React from "react";

function Button({ customClass, children, disabled, onClick, type, ...rest }) {
  return (
    <button
      type={type}
      className={`inline-flex duration-300 items-center cursor-pointer justify-center rounded-md text-base font-bold font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground shadow hover:opacity-75 px-6  py-3 ${
        customClass || ""
      } ${disabled ? "cursor-not-allowed bg-black/40" : ""}`}
      onClick={onClick}
      {...rest}
    >
      {children}
    </button>
  );
}

export default Button;
