import { NextResponse } from "next/server";

export async function GET(request: Request) {
  return NextResponse.json({
    faq: {
      "What languages can I use?":
        "You can use any language to create your API",
      "What can I buy for this grant?":
        "You can buy anything that helps you build your API, such as a Raspberry Pi or Cloud Credits",
      "Where can I ask for help?":
        "You can ask for help in the #endpointer channel on the Hack Club Slack",
      "When does it end?":
        "The Endpointer program ends on August 12, 23:59 EST",
      "Can I double dip with SOM":
        "Yes, you can double dip with the Summer of Making program",
      "How can I track time writting Swagger documentation?":
        "You can use VS Code extension (OpenAPI (Swagger) Editor) for this. It will create an yml file for you and you will be able to preview documentation in VS Code.",
    },
  });
}
