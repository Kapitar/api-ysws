"use client";

import Loader from "@/components/Loader";
import ProjectCard from "@/components/ProjectCard";
import { useEffect, useState } from "react";

interface Submission {
  id: string;
  fields: {
    "Project Name": string;
    "Code URL": string;
    "Description": string;
    "Playable URL": string;
  };
}

export default function Gallery() {
  const [isLoading, setLoading] = useState(true);
  const [submissions, setSubmissions] = useState<Submission[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("https://api2.hackclub.com/v0.1/Hackmate/Hackmate Project Submission");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setSubmissions(data);
      } catch (error) {
        console.error("Fetch error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="container mx-auto">
      <div className="p-4 border-2 border-gray-700 rounded-2xl mt-10">
        <p>
          <span className="text-green-600 font-bold">orpheus@hackclub:</span>
          <span className="text-blue-600 font-bold">~</span>
          <span className="text-white font-bold">$ </span>
          <span className="text-blue-600">curl </span>
          https://endpointer.hackclub.com/api/gallery
        </p>
      </div>
      <div className="grid grid-cols-2 mt-8 gap-4 items-stretch">
        {isLoading ? <Loader /> : submissions.map((submission) => {
          return (
            <ProjectCard
              key={submission.id}
              id={submission.id}
              name={submission.fields['Project Name']}
              githubLink={submission.fields['Code URL']}
              swaggerLink={submission.fields['Playable URL']}
              description={submission.fields['Description'].trim()}
              createdAt={new Date()}
            />
          );
        })}
      </div>
    </div>
  );
}
