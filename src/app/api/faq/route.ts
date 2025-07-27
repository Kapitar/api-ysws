import { NextResponse } from "next/server";

export async function GET(request: Request) {
  return NextResponse.json(
    { 
      faq: {
        "What languages can I use?": "You can use any languages to create your API",
        "What can I buy for this grant?": "You can buy anything that helps you build your API, such as a Raspberry Pi or cloud credits",
        "Where can I ask for help?": "You can ask for help in the #endpointer channel on the Hack Club Slack",
        "When does it end?": "The Endpointer program ends on August 12, 23:59 EST",
      },
    }
  );
}
