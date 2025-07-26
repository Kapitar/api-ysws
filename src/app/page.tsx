"use client";

import { useEffect, useState } from "react";
import { IoIosSend } from "react-icons/io";
import JSONPretty from "react-json-pretty";

export default function Home() {
  const [data, setData] = useState(null);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/requirements")
      .then((res) => res.json())
      .then((data) => {
        setData(data);
        setLoading(false);
      });
  }, []);

  return (
    <div className="container mx-auto h-screen items-center flex justify-center">
      <div className="text-center">
        <h1 className="font-bold text-5xl">API YSWS</h1>
        <p className="text-xl mt-3">
          You ship: API, We Ship: Cloud Credits / Raspberry PI
        </p>
        <form className="flex justify-center mt-8 gap-x-4" action="">
          <div className="flex">
            <span className="bg-gray-700 py-2.5 px-4 text-white rounded-l-lg flex items-center">
              https://apiysws.hackclub.com/api/
            </span>
            <input
              className="text-white py-2.5 px-4 rounded-r-lg border-t-4 border-b-4 border-r-4 border-gray-700"
              type="text"
            />
          </div>
          <button type="submit" className="py-2.5 px-4 bg-blue-700 rounded-lg">
            <IoIosSend className="inline-block mr-2" />
            Send
          </button>
        </form>
        <div className="mt-8 text-left">
          <h1 className="font-bold text-xl mb-2">Result</h1>
          <div className="flex w-full border-2 border-gray-700 min-h-16 rounded-2xl p-4">
            <JSONPretty id="json-pretty" data={data}></JSONPretty>
          </div>
        </div>
      </div>
    </div>
  );
}
