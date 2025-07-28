"use client";

import JSONPlaceholder from "@/components/JSONPlaceholder";
import { FormEvent, useState } from "react";
import { IoIosSend } from "react-icons/io";
import { redirect } from "next/navigation";
import Loader from "@/components/Loader";

import dynamic from "next/dynamic";

export default function Home() {
  const [data, setData] = useState({});
  const [isLoading, setLoading] = useState(false);
  const [success, setSuccess] = useState(true);

  const NoSSRCountdown = dynamic(() => import("react-countdown"), {
    ssr: false,
  });

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setLoading(true);
    const formData = new FormData(event.currentTarget);
    const path = formData.get("path");

    if (path === "gallery") {
      redirect("gallery");
    } else if (path === "submit") {
      redirect("https://forms.hackclub.com/endpointer");
    } else if (path === "test") {
      redirect("test");
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
    <div className="container px-4 py-16 mx-auto min-h-screen items-center flex justify-center">
      <div className="text-center">
        <img
          className="justify-center mx-auto"
          alt="Endpointer"
          width={500}
          height={500}
          src="https://hc-cdn.hel1.your-objectstorage.com/s/v3/f8f4e0214d6f67c2171dc20d61c91d09fa88f429_endpointer.png"
        />
        <p className="text-xl">
          You ship: <span className="text-amber-400">Amazing REST API</span>{" "}
          <br />
          We Ship:{" "}
          <span className="text-fuchsia-400">
            Cloud Credits / Raspberry PI worth $30
          </span>
        </p>
        <form
          className="md:flex justify-center mt-8 gap-x-4"
          onSubmit={onSubmit}
        >
          <div className="md:flex">
            <span className="bg-gray-700 py-2.5 px-4 text-white md:rounded-l-lg md:rounded-r-none rounded-lg flex items-center">
              https://endpointer.hackclub.com/api/
            </span>
            <select
              className="text-white py-2.5 px-4 md:rounded-r-lg md:rounded-l-none md:border-l-none md:border-t-4 md:border-b-4 md:border-r-4 border-4 rounded-lg md:mt-0 md:mb-0 mt-3 mb-3 border-gray-700"
              name="path"
            >
              <option value="requirements">requirements</option>
              <option value="faq">faq</option>
              <option value="test">test</option>
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

        <h1 className="mt-16 text-3xl font-bold mb-2">Until the end</h1>
        <NoSSRCountdown
          className="text-5xl font-bold text-amber-400"
          date={new Date("August 12, 2025 23:59 EST")}
        />
      </div>
    </div>
  );
}
