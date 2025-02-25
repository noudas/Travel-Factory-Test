import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  className = "",
  disabled = false,
  children,
  ...props
}) => {
  return (
    <button
      className={`px-4 py-2 rounded-lg font-medium transition ${
        disabled
          ? "bg-gray-400 cursor-not-allowed"
          : "bg-blue-500 hover:bg-blue-600 text-white"
      } ${className}`}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
};
