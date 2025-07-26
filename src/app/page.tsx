"use client";

import JSONPlaceholder from "@/components/JSONPlaceholder";
import { FormEvent, useState } from "react";
import { IoIosSend } from "react-icons/io";
import JSONPretty from "react-json-pretty";

export default function Home() {
  const [data, setData] = useState({});
  const [isLoading, setLoading] = useState(false);
  const [success, setSuccess] = useState(true);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    const formData = new FormData(event.currentTarget);
    const path = formData.get("path");
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
          We Ship: Cloud Credits / Raspberry PI
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
              <option value="submit">submit</option>
              <option value="gallery">gallery</option>
              <option value="faq">faq</option>
            </select>
          </div>
          <button
            type="submit"
            className="py-2.5 px-4 bg-blue-700 rounded-lg hover:bg-blue-800"
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
            {isLoading && (
              <div className="loader">
                <svg
                  aria-hidden="true"
                  className="inline w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-gray-600 dark:fill-gray-300"
                  viewBox="0 0 100 101"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                    fill="currentColor"
                  />
                  <path
                    d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                    fill="currentFill"
                  />
                </svg>
                <span className="sr-only">Loading...</span>
              </div>
            )}

            {!isLoading && <JSONPlaceholder data={data} />}
          </div>
        </div>
      </div>
    </div>
  );
}
