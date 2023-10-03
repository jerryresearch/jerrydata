import React, { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

const Button: React.FC<Props> = ({ children }) => {
  return (
    <button className="bg-blue-600 text-white rounded py-2 border border-slate-200 font-medium">
      {children}
    </button>
  );
};
export default Button;
