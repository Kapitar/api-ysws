import { NextResponse } from "next/server";

export async function GET(request: Request) {
  return NextResponse.json(
    { 
      submit: "Go to https://apiysws.hackclub.com/submit",
    }
  );
}
