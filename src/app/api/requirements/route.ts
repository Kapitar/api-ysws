import { NextResponse } from "next/server";

export async function GET(request: Request) {
  return NextResponse.json(
    { 
      success: true, 
      requirements: {
        "requirement_1": "You need to be a high schooler!",
        "requirement_2": "Your YSWS must be creative and have purpose",
        "requirement_3": "Create 3 API routes following RESTful API Guidelines (they must have GET, POST, PUT, DELETE methods)",
        "requirement_4": "Routes must include /api/auth/login and /api/auth/register",
        "requirement_5": "One of the 3 API routes must be protected with authentication",
      }
    }
  );
}
