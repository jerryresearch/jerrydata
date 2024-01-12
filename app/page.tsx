"use client";

import { useState, ChangeEvent, FormEvent, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import Loading from "@/components/Loading";

export default function Home() {
  const router = useRouter();
  const [file, setFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    router.push("/user/login");
  }, [router]);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!file) {
      return;
    }
    const formData = new FormData();
    formData.append("file", file);

    setIsLoading(true);

    try {
      const response = await axios.post("/api/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      router.push(`/file/${response.data.collection}`);
    } catch (error) {
      alert("Error uploading file");
      console.error("Error uploading file:", error);
    }
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
    }
  };

  return (
    <div>
      {isLoading ? (
        <Loading />
      ) : (
        <></>
        // <main className="flex min-h-screen flex-col items-center justify-center">
        //   <form onSubmit={handleSubmit}>
        //     <h1 className="text-2xl font-medium mb-4">Upload a file</h1>
        //     <div className="flex gap-4">
        //       <input
        //         type="file"
        //         accept=".csv"
        //         onChange={handleFileChange}
        //         className="bg-gray-700 p-2 text-white"
        //       />
        //       <button className="bg-primary rounded-md text-white px-4 h-12">
        //         Upload
        //       </button>
        //     </div>
        //   </form>
        // </main>
      )}
    </div>
  );
}
