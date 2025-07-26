import { NextResponse } from "next/server";

export async function GET(request: Request) {
  return NextResponse.json(
    { 
      gallery: "Go to https://apiysws.hackclub.com/gallery",
    }
  );
}
