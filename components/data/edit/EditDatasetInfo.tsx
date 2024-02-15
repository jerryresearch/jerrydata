"use client";

import Image from "next/image";
import React, { useState } from "react";
import DeleteModal from "../../DeleteModal";
import EditHeader from "./EditHeader";

type Props = {
  dataset: Dataset;
  userId: string;
  userName: string;
};

const EditDatasetInfo = ({ dataset, userId, userName }: Props) => {
  const [name, setName] = useState(dataset.name);
  const [description, setDescription] = useState(dataset.description);
  const [isUpdated, setIsUpdated] = useState(false);

  const [open, setOpen] = useState(false);
  const handleCloseModal = () => {
    setOpen(false);
  };

  return (
    <section className="text-[#080D19]">
      <EditHeader
        updates={isUpdated ? { name, description } : undefined}
        userId={userId}
        dataset={dataset}
        userName={userName}
        type="info"
      />
      <div className="md:pt-64">
        <div className="flex flex-col gap-6 items-start w-[420px] flex-shrink-0">
          <div className="flex flex-col gap-4 self-stretch">
            <label className="font-medium">Connection Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => {
                setIsUpdated(true);
                setName(e.target.value);
              }}
              className="h-[42px] py-[14px] px-3 rounded-[6px] border border-[#EEEEFF] bg-white focus:outline-none"
            />
          </div>
          <div className="flex flex-col gap-4 self-stretch">
            <label className="font-medium">Description</label>
            <textarea
              name="description"
              id="description"
              value={description}
              onChange={(e) => {
                setIsUpdated(true);
                setDescription(e.target.value);
              }}
              className="h-[120px] py-[14px] px-3 rounded-[6px] border border-[#EEEEFF] bg-white focus:outline-none"
            ></textarea>
          </div>
          <div className="pb-6">
            <button
              onClick={() => setOpen(true)}
              className="flex items-center justify-center px-5 py-1 gap-[6px] bg-[#F1F1F1] rounded-[6px] font-medium"
            >
              <Image
                src="/assets/delete.svg"
                alt="delete"
                width={20}
                height={20}
              />
              <span>Delete Dataset</span>
            </button>
          </div>
        </div>
      </div>
      <DeleteModal
        id={dataset._id}
        userId={userId}
        open={open}
        name={dataset.name}
        onClose={handleCloseModal}
      />
    </section>
  );
};

export default EditDatasetInfo;
