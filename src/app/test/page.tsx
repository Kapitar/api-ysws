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
  const [statusCode, setStatus] = useState<Number>();
  const [activeTab, setActiveTab] = useState("query");
  const [queryParams, setQueryParams] = useState<
    { key: string; value: string }[]
  >([{ key: "", value: "" }]);
  const [authorization, setAuthorization] = useState("");
  const [bodyParams, setBodyParams] = useState("");

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setLoading(true);
    const formData = new FormData(event.currentTarget);
    const path = formData.get("path") as string;
    const method = formData.get("method") as string;

    const urlParams: Record<string, string> = {};
    queryParams.forEach(({ key, value }) => {
      urlParams[key] = value;
    });

    const headers: Record<string, string> = {};
    if (authorization) headers.Authorization = authorization;
    if (method !== "GET") headers["Content-Type"] = "application/json";

    const init: RequestInit = { method, headers };

    if (method !== "GET" && bodyParams) {
      try {
        init.body = JSON.parse(bodyParams);
        init.body = bodyParams;
      } catch {
        setData({ error: "Invalid JSON format in body params." });
        setLoading(false);
        return;
      }
    }

    fetch(path + "?" + new URLSearchParams(urlParams).toString(), init).then(
      async (res) => {
        try {
          const data = await res.json();
          setData(data);
        } catch (e) {
          setData({ error: "Failed to make a request." });
        }
        setStatus(res.status);
        setLoading(false);
      }
    );
  }

  return (
    <div className="container px-4 mx-auto">
      <TerminalPlaceholder fetchUrl="https://endpointer.hackclub.com/api/test" />

      <form onSubmit={onSubmit} className="flex mt-8">
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
          required
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

      <ul className="flex gap-x-8 mt-6 mb-6 cursor-pointer">
        <div
          onClick={() => setActiveTab("query")}
          className={`pb-2 border-b-2 ${
            activeTab === "query" ? "border-amber-400" : "border-transparent"
          }`}
        >
          <li className="hover:text-gray-300">Query Params</li>
        </div>
        <div
          onClick={() => setActiveTab("body")}
          className={`pb-2 border-b-2 ${
            activeTab === "body" ? "border-amber-400" : "border-transparent"
          }`}
        >
          <li className="hover:text-gray-300">Body Params</li>
        </div>
        <div
          onClick={() => setActiveTab("authorization")}
          className={`pb-2 border-b-2 ${
            activeTab === "authorization"
              ? "border-amber-400"
              : "border-transparent"
          }`}
        >
          <li className="hover:text-gray-300">Authorization</li>
        </div>
      </ul>

      {activeTab === "query" && (
        <>
          <div className="flex flex-col gap-y-2">
            {queryParams.map((param, i) => (
              <div className="flex gap-x-2" key={i}>
                <input
                  type="text"
                  placeholder="Key"
                  value={param.key}
                  onChange={(e) => {
                    const newParams = [...queryParams];
                    newParams[i].key = (e.target as HTMLInputElement).value;
                    setQueryParams(newParams);
                  }}
                  className="px-4 py-2 rounded-xl border-2 border-gray-700 w-full"
                />
                <input
                  type="text"
                  placeholder="Value"
                  value={param.value}
                  onChange={(e) => {
                    const newParams = [...queryParams];
                    newParams[i].value = (e.target as HTMLInputElement).value;
                    setQueryParams(newParams);
                  }}
                  className="px-4 py-2 rounded-xl border-2 border-gray-700 w-full"
                />
                <button
                  className="py-2 px-4 bg-red-500 rounded-lg hover:bg-red-600 cursor-pointer w-32"
                  onClick={() => {
                    const newParams = [...queryParams];
                    newParams.splice(i, 1);
                    setQueryParams(newParams);
                  }}
                >
                  Delete
                </button>
              </div>
            ))}
          </div>

          <button
            className="py-2 px-4 bg-green-500 rounded-lg hover:bg-green-600 cursor-pointer max-w-32 mt-4"
            onClick={() => {
              const newParams = [...queryParams, { key: "", value: "" }];
              setQueryParams(newParams);
            }}
          >
            Add more
          </button>
        </>
      )}

      {activeTab === "authorization" && (
        <input
          type="text"
          placeholder="Value"
          value={authorization}
          onChange={(e) =>
            setAuthorization((e.target as HTMLInputElement).value)
          }
          className="px-4 py-2 rounded-xl border-2 border-gray-700 w-full"
        />
      )}

      {activeTab === "body" && (
        <textarea
          name="body"
          value={bodyParams}
          onChange={(e) =>
            setBodyParams((e.target as HTMLTextAreaElement).value)
          }
          placeholder="Enter request body (JSON format)"
          className="w-full h-48 px-4 py-2 rounded-xl border-2 border-gray-700"
        ></textarea>
      )}

      <h1 className="font-bold text-xl mb-2 mt-8">
        Result{" "}
        {statusCode && statusCode.toString().startsWith("2") && (
          <span className="text-green-500 text-sm font-normal">
            {statusCode.toString()} Success
          </span>
        )}
        {statusCode &&
          (statusCode.toString().startsWith("4") ||
            statusCode.toString().startsWith("5")) && (
            <span className="text-red-500 text-sm font-normal">
              {statusCode.toString()} Error
            </span>
          )}
      </h1>
      <div className="w-full border-2 border-gray-700 rounded-2xl p-4">
        {isLoading && <Loader />}

        {!isLoading && <JSONPlaceholder data={data} />}
      </div>
    </div>
  );
}
