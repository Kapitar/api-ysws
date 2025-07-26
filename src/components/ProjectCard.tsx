"use client";

import JSONPlaceholder from "./JSONPlaceholder";
import { RxOpenInNewWindow } from "react-icons/rx";
import { FaGithub } from "react-icons/fa";

interface ProjectCardProps {
  id: string;
  name: string;
  description: string;
  githubLink: string;
  swaggerLink: string;
  createdAt: Date;
}

export default function ProjectCard({
  id,
  name,
  description,
  githubLink,
  swaggerLink,
  createdAt,
}: ProjectCardProps) {
  const data = {
    id: id,
    name: name,
    description: description,
    createdAt: createdAt.toISOString(),
  };

  return (
    <div className="w-full h-full">
      <div className="border-2 border-gray-700 rounded-xl px-4 py-4 h-full flex flex-col gap-4">
        <JSONPlaceholder data={data} />

        <div className="mt-auto flex gap-x-3">
          <a href={swaggerLink} className="py-2.5 px-4 bg-blue-700 rounded-lg hover:bg-blue-800">
            <RxOpenInNewWindow className="inline-block mr-2" />
            Try it out!
          </a>

          <a href={githubLink} className="py-2.5 px-4 bg-gray-700 rounded-lg hover:bg-gray-800">
            <FaGithub className="inline-block mr-2" />
            Github
          </a>
        </div>
      </div>
    </div>
  );
}
