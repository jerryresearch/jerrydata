import Image from "next/image";
import React, { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

const Message: React.FC<Props> = ({ children }) => {
  return (
    <div className="flex py-5 px-[14px] items-center rounded bg-[#F6F8FA]">
      <div className="flex w-full gap-[13px]">
        <Image
          src="/assets/user.svg"
          alt="avatar"
          width={34}
          height={34}
          className="self-start"
        />
        <div className="flex-1 inline-flex px-2 flex-col items-start gap-[10px] rounded bg-white">
          <div className="py-[10px] w-full px-2 text-[#17212F] text-sm">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Message;
