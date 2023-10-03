import React, { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

const Button: React.FC<Props> = ({ children }) => {
  return (
    <button className="bg-blue-600 text-white rounded w-full h-full p-4 border border-[#EAEDF2] font-medium">
      {children}
    </button>
  );
};
export default Button;
