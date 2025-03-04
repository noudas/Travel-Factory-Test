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
      className={`px-4 py-2 rounded-md font-medium transition-all duration-200
        ${disabled ? "bg-gray-300 text-gray-500 cursor-not-allowed" 
                   : "bg-blue-500 text-white hover:bg-blue-400 active:bg-blue-600"} 
        ${className}`}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
};
