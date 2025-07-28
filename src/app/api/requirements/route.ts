import { NextResponse } from "next/server";

export async function GET(request: Request) {
  return NextResponse.json({
    eligibility: {
      mustBeHighSchooler: true,
      description: "You must be a high school student.",
    },
    project: {
      ysws: {
        creative: true,
        purposeful: true,
        description:
          "Your API must be creative and have purpose.",
      },
    },
    your_api: {
      paths: [
        {
          name: "/path1",
          methods: ["GET", "POST", "PUT", "DELETE"],
        },
        {
          name: "/path2",
          methods: ["GET", "POST", "PUT", "DELETE"],
        },
        {
          name: "/path3",
          methods: ["GET", "POST", "PUT", "DELETE"],
          requiresAuth: true,
        },
      ],
      authRoutes: [
        {
          path: "/api/auth/register",
          method: "POST",
          description: "User registration using JWT",
        },
        {
          path: "/api/auth/login",
          method: "POST",
          description: "User login using JWT",
        },
      ],
      description: "Your API must have at least three paths, each supporting multiple methods. At least one path must require authentication.",
    },
    documentation: {
      format: "Swagger (OpenAPI)",
      description: "Document your entire API using Swagger.",
    },
    timeTracking: {
      tool: "Hackatime",
      minimumHours: 3,
      description: "Log at least three hours using Hackatime.",
    },
  });
}
