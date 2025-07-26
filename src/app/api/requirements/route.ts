import { NextResponse } from "next/server";

export async function GET(request: Request) {
  return NextResponse.json(
    { 
      requirements: [
        "You need to be a high schooler!",
        "Your YSWS must be creative and have purpose",
        "Create 3 API endpoints following RESTful API Guidelines (each must have GET, POST, PUT, DELETE methods)",
        "Routes must include /api/auth/login and /api/auth/register",
        "One of the 3 API routes must be protected with authentication",
      ]
    }
  );
}
