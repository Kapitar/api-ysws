"use client";

import JSONPlaceholder from "@/components/JSONPlaceholder";
import { FormEvent, useState } from "react";
import { IoIosSend } from "react-icons/io";
import { redirect } from "next/navigation";
import Loader from "@/components/Loader";
import Countdown from "react-countdown";

export default function Home() {
  const [data, setData] = useState({});
  const [isLoading, setLoading] = useState(false);
  const [success, setSuccess] = useState(true);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setLoading(true);
    const formData = new FormData(event.currentTarget);
    const path = formData.get("path");

    if (path === "gallery") {
      redirect("gallery");
    } else if (path === "submit") {
      redirect("https://forms.hackclub.com/endpointer");
    }

    fetch(`/api/${path}`).then(async (res) => {
      console.log(res);
      if (res.status !== 200) {
        setData({
          success: false,
          message: "Invalid request",
        });
        setSuccess(false);
      } else {
        const data = await res.json();
        setData(data);
        setSuccess(true);
      }
      setLoading(false);
    });
  }

  return (
    <div className="container mx-auto h-screen items-center flex justify-center">
      <div className="text-center">
        <h1 className="font-bold text-5xl">Endpointer</h1>
        <p className="text-xl mt-3">
          You ship: Amazing REST API <br />
          We Ship: Cloud Credits / Raspberry PI worth $30
        </p>
        <form className="flex justify-center mt-8 gap-x-4" onSubmit={onSubmit}>
          <div className="flex">
            <span className="bg-gray-700 py-2.5 px-4 text-white rounded-l-lg flex items-center">
              https://endpointer.hackclub.com/api/
            </span>
            <select
              className="text-white py-2.5 px-4 rounded-r-lg border-t-4 border-b-4 border-r-4 border-gray-700"
              name="path"
            >
              <option value="requirements">requirements</option>
              <option value="faq">faq</option>
              <option value="gallery">gallery</option>
              <option value="submit">submit</option>
            </select>
          </div>
          <button
            type="submit"
            className="py-2.5 px-4 bg-blue-700 rounded-lg hover:bg-blue-800 cursor-pointer"
          >
            <IoIosSend className="inline-block mr-2" />
            Send
          </button>
        </form>
        <div className="mt-8 text-left w-full max-w-4xl">
          <h1 className="font-bold text-xl mb-2">
            Result
            {!!Object.keys(data).length && success && (
              <span className="text-green-500 text-sm font-normal">
                {" "}
                200 Success
              </span>
            )}
            {!!Object.keys(data).length && !success && (
              <span className="text-red-500 text-sm font-normal">
                {" "}
                404 Error
              </span>
            )}
          </h1>
          <div className="w-full border-2 border-gray-700 rounded-2xl p-4">
            {isLoading && <Loader />}

            {!isLoading && <JSONPlaceholder data={data} />}
          </div>
        </div>

        <h1 className="mt-16 text-4xl font-bold mb-3">Until the end</h1>
        <Countdown className="text-4xl font-bold text-amber-400" date={new Date("August 10, 2025 11:59 EST")} />
      </div>
    </div>
  );
}
