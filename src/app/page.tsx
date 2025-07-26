"use client";

import JSONPlaceholder from "@/components/JSONPlaceholder";
import { FormEvent, useState } from "react";
import { IoIosSend } from "react-icons/io";
import JSONPretty from "react-json-pretty";

export default function Home() {
  const [data, setData] = useState({});
  const [isLoading, setLoading] = useState(true);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const path = formData.get("path");
    fetch(`/api/${path}`).then(async (res) => {
      console.log(res);
      if (res.status !== 200) {
        setData({
          success: false,
          message: "Invalid request",
        });
      } else {
        const data = await res.json();
        setData(data);
      }
      setLoading(false);
    });
  }

  return (
    <div className="container mx-auto h-screen items-center flex justify-center">
      <div className="text-center">
        <h1 className="font-bold text-5xl">API YSWS</h1>
        <p className="text-xl mt-3">
          You ship: API, We Ship: Cloud Credits / Raspberry PI
        </p>
        <form className="flex justify-center mt-8 gap-x-4" onSubmit={onSubmit}>
          <div className="flex">
            <span className="bg-gray-700 py-2.5 px-4 text-white rounded-l-lg flex items-center">
              https://apiysws.hackclub.com/api/
            </span>
            <input
              className="text-white py-2.5 px-4 rounded-r-lg border-t-4 border-b-4 border-r-4 border-gray-700"
              type="text"
              name="path"
            />
          </div>
          <button type="submit" className="py-2.5 px-4 bg-blue-700 rounded-lg">
            <IoIosSend className="inline-block mr-2" />
            Send
          </button>
        </form>
        <div className="mt-8 text-left w-full max-w-4xl">
          <h1 className="font-bold text-xl mb-2">Result</h1>
          <div className="w-full border-2 border-gray-700 min-h-16 rounded-2xl p-4">
            <JSONPlaceholder data={data} />
          </div>
        </div>
      </div>
    </div>
  );
}
