import { NextResponse } from "next/server";
import { anthropic } from "@/lib/anthropic";
import { SYSTEM_PROMPT, REPORT_SCHEMA } from "@/lib/prompt";

export const maxDuration = 30;

export async function POST(request: Request) {
  const { transcript } = await request.json();

  if (!transcript || typeof transcript !== "string" || !transcript.trim()) {
    return NextResponse.json({ error: "Missing transcript." }, { status: 400 });
  }

  try {
    const message = await anthropic.messages.create({
      model: "claude-sonnet-5",
      max_tokens: 2000,
      system: SYSTEM_PROMPT,
      output_config: {
        format: {
          type: "json_schema",
          schema: REPORT_SCHEMA,
        },
      },
      messages: [{ role: "user", content: transcript }],
    });

    const block = message.content.find((b) => b.type === "text");
    if (!block || block.type !== "text") {
      throw new Error("Unexpected response format from model.");
    }

    const parsed = JSON.parse(block.text);
    return NextResponse.json(parsed);
  } catch (err) {
    console.error("Generate error:", err);
    return NextResponse.json(
      { error: "Failed to generate report. Please try again." },
      { status: 500 }
    );
  }
}
