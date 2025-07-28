"use client";

import Loader from "@/components/Loader";
import ProjectCard from "@/components/ProjectCard";
import TerminalPlaceholder from "@/components/TerminalPlaceholder";
import { useEffect, useState } from "react";

interface Submission {
  id: string;
  fields: {
    "Project Name": string;
    "Code URL": string;
    Description: string;
    "Playable URL": string;
  };
}

export default function Gallery() {
  const [isLoading, setLoading] = useState(true);
  const [submissions, setSubmissions] = useState<Submission[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://api2.hackclub.com/v0.1/Endpointer/Endpointer Project Submission"
        );
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
    <div className="container px-4 mx-auto">
      <TerminalPlaceholder fetchUrl="https://endpointer.hackclub.com/api/gallery" />
      <div className="grid md:grid-cols-2 grid-cols-1 mt-8 gap-4 items-stretch">
        {isLoading ? (
          <Loader />
        ) : (
          submissions.map((submission) => {
            return (
              <ProjectCard
                key={submission.id}
                id={submission.id}
                name={submission.fields["Project Name"]}
                githubLink={submission.fields["Code URL"]}
                swaggerLink={submission.fields["Playable URL"]}
                description={submission.fields["Description"].trim()}
              />
            );
          })
        )}
      </div>
    </div>
  );
}
