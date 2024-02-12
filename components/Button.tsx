import React, { ReactNode } from "react";

interface Props {
  children: ReactNode;
  isLoading: boolean;
}

const Button: React.FC<Props> = ({ children, isLoading }) => {
  return (
    <button
      className={`bg-primary text-white rounded-[6px] w-full h-full font-medium ${
        isLoading && "opacity-50 cursor-not-allowed"
      }`}
    >
      {children}
    </button>
  );
};
export default Button;
