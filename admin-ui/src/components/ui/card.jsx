import * as React from "react";

export function Card({ children, className = "" }) {
  return (
    <div className={`rounded-xl border border-gray-700 bg-gray-900 p-4 shadow-md ${className}`}>
      {children}
    </div>
  );
}

export function CardContent({ children, className = "" }) {
  return <div className={`text-gray-300 ${className}`}>{children}</div>;
}
