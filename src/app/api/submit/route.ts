import { NextResponse } from "next/server";

export async function GET(request: Request) {
  return NextResponse.json({
    submit: "https://forms.hackclub.com/endpointer"
  });
}
