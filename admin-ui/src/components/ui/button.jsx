import * as React from "react";

export function Button({ children, onClick, variant = "default", size = "md", className = "" }) {
  const base =
    "inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none";

  const variants = {
    default: "bg-amber-500 text-black hover:bg-amber-400",
    outline: "border border-gray-500 text-white hover:bg-gray-800",
    ghost: "bg-transparent hover:bg-gray-800",
    destructive: "bg-red-600 text-white hover:bg-red-500",
    secondary: "bg-gray-700 text-white hover:bg-gray-600",
  };

  const sizes = {
    sm: "px-2 py-1 text-sm",
    md: "px-4 py-2 text-base",
    lg: "px-6 py-3 text-lg",
  };

  return (
    <button
      onClick={onClick}
      className={`${base} ${variants[variant] || variants.default} ${sizes[size] || sizes.md} ${className}`}
    >
      {children}
    </button>
  );
}
