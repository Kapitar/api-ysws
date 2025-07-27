"use client";

import CustomListBox from "@/components/CustomListBox";
import JSONPlaceholder from "@/components/JSONPlaceholder";
import Loader from "@/components/Loader";
import TerminalPlaceholder from "@/components/TerminalPlaceholder";
import { FormEvent, useState } from "react";
import { IoIosSend } from "react-icons/io";

export default function Test() {
  const [isLoading, setLoading] = useState(false);
  const [data, setData] = useState({});

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setLoading(true);
    const formData = new FormData(event.currentTarget);
    const path = formData.get("path") as string;
    const method = formData.get("method") as string;

    fetch(path, {
      method: method,
    }).then(async (res) => {
      try {
        const data = await res.json();
        setData(data);
      } catch(e) {
        setData({ error: "Failed to make a request." });
      }
      setLoading(false);
    });
  }

  return (
    <div className="container px-4 mx-auto">
      <TerminalPlaceholder fetchUrl="https://endpointer.hackclub.com/api/test" />

      <form onSubmit={onSubmit} className="flex mt-16">
        <CustomListBox
          options={[
            { name: "GET", className: "text-green-400" },
            { name: "POST", className: "text-yellow-300" },
            { name: "PUT", className: "text-blue-400" },
            { name: "DELETE", className: "text-red-400" },
          ]}
        />
        <div className="border-t-4 border-b-4 border-gray-700 flex justify-center items-center text-gray-500">
          |
        </div>
        <input
          type="text"
          name="path"
          placeholder="Enter API endpoint (e.g. http://localhost:3000/api/test)"
          className="w-full text-white py-2.5 px-4 border-4 md:rounded-r-lg md:rounded-l-none md:border-l-0 md:border-t-4 md:border-b-4 md:border-r-4 rounded-lg md:mt-0 md:mb-0 mt-3 mb-3 border-gray-700 focus:outline-none"
        />
        <button
          type="submit"
          className="py-2.5 px-4 bg-blue-700 rounded-lg hover:bg-blue-800 cursor-pointer w-32 ml-4"
        >
          <IoIosSend className="inline-block mr-2" />
          Send
        </button>
      </form>

      <div className="w-full border-2 border-gray-700 rounded-2xl p-4 mt-8">
        {isLoading && <Loader />}

        {!isLoading && <JSONPlaceholder data={data} />}
      </div>
    </div>
  );
}
