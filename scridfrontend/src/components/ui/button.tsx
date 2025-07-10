// src/components/ui/button.tsx
import React from "react";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "default" | "outline" | "ghost";
  className?: string;
};

const Button: React.FC<ButtonProps> = ({ children, variant = "default", className = "", ...props }) => {
  let baseStyles = "px-4 py-2 rounded text-white transition font-medium";

  const variantStyles = {
    default: "bg-green-600 hover:bg-green-700",
    outline: "bg-white text-green-700 border border-green-600 hover:bg-green-50",
    ghost: "bg-transparent text-green-700 hover:underline"
  };

  return (
    <button className={`${baseStyles} ${variantStyles[variant]} ${className}`} {...props}>
      {children}
    </button>
  );
};

export { Button }; // <-- ensure this is a named export
