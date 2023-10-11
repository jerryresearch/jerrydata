import React from "react";

type Props = {
  name: string;
  lastModified: string;
};

const RecentChat = ({ name, lastModified }: Props) => {
  return (
    <div className="w-full h-[160px] p-5 rounded border border-[#EAEDF2] bg-white">
      <table className="w-full table-auto min-w-max text-left">
        <thead>
          <tr className="bg-[#F8FAFC] rounded text-[#17212F]">
            <th className="font-medium p-5">Chat name</th>
            <th className="font-medium p-5">Last Updated</th>
            <th className="font-medium p-5">Action</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="font-medium p-5 text-primary">{name}</td>
            <td className="font-medium p-5">{lastModified} ago</td>
            <td className="font-medium p-5">Action</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default RecentChat;
