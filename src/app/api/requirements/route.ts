import { NextResponse } from "next/server";

export async function GET(request: Request) {
  return NextResponse.json({
    requirements: [
      "You must be a high school student to participate.",
      "Your API must be creative and purposeful.",
      "Your API must have at least three GET and three POST endpoints.",
      "Your API must have at least one PUT and one DELETE endpoint.",
      "Your API must have a database to store data.",
      "AI is allowed in a reasonable amount; fully vibe-coded projects will be rejected. Documentation and README must be written by you.",
      "Document your entire API using Swagger (OpenAPI).",
      "Log at least five hours of work using Hackatime and get $25 grant.",
      "If you add JWT authentication and create a protected path for authenticated users and log at least 8 hours, you will get $40 grant",
    ]
  });
}
