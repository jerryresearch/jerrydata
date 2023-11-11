import React from "react";

type Props = {
  records: any[];
  headers: [
    {
      name: string;
      datatype: string;
      isDisabled: boolean;
    }
  ];
};

const Data = ({ records, headers }: Props) => {
  return (
    <section className="flex px-7 py-5 items-center gap-[10px] bg-[#F6F8FA]">
      <section className="w-full overflow-x-auto p-5 rounded border border-[#EAEDF2] bg-white">
        <table className="w-full table-auto min-w-max text-left">
          <thead>
            <tr className="bg-[#F6F8FA]">
              {headers.map((head, index: number) => (
                <th
                  key={index}
                  className="text-[#17212F] rounded bg-[F8FAFC] font-medium p-5 gap-2"
                >
                  {head.name}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {records.map((row, index) => (
              <tr key={index}>
                {Object.values(row).map((value: any, index: number) => (
                  <td
                    key={index}
                    className="text-[#17212F] p-5 gap-2 font-medium border-b border-b-[#EAEDF2]"
                  >
                    {value}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </section>
  );
};

export default Data;
