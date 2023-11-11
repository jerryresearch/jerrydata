import React, { ReactNode } from "react";

interface Props {
  children: ReactNode;
  isLoading: boolean;
}

const Button: React.FC<Props> = ({ children, isLoading }) => {
  return (
    <button
      className={`bg-blue-600 text-white rounded w-full h-full border border-[#EAEDF2] font-medium ${
        isLoading && "opacity-50 cursor-not-allowed"
      }`}
    >
      {children}
    </button>
  );
};
export default Button;
