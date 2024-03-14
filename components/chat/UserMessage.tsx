import Image from "next/image";
import React from "react";

type Props = {
  message: Message;
  mode: Boolean;
};

const UserMessage = ({ message, mode }: Props) => {
  return (
    <div className="flex flex-col gap-[30px]">
      {mode && (
        <div>
          <h3 className="text-[#61656C]">{message.mode.toUpperCase()} MODE</h3>
        </div>
      )}
      <div className="flex gap-4">
        <Image
          src="/assets/avatar.svg"
          alt="avatar"
          width={34}
          height={34}
          className="self-start"
        />
        <div className="flex flex-col w-full">
          <p className="text-primary font-semibold">You</p>
          <p className="text-[#080D19]">{message.content}</p>
        </div>
      </div>
    </div>
  );
};

export default UserMessage;
