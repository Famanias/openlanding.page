import { NextResponse } from "next/server";
import {
  MCP_PROTOCOL_VERSION,
  MCP_SERVER_INFO,
  MCP_TOOLS,
  handleJsonRpcPayload,
} from "../../../lib/mcp/openlanding-mcp";

const CORS_HEADERS: Record<string, string> = {
  "access-control-allow-origin": "*",
  "access-control-allow-methods": "GET, POST, OPTIONS",
  "access-control-allow-headers": "Content-Type, Accept, MCP-Protocol-Version, Mcp-Session-Id",
};

export async function OPTIONS() {
  return new NextResponse(null, {
    status: 204,
    headers: CORS_HEADERS,
  });
}

export async function GET() {
  return NextResponse.json(
    {
      ...MCP_SERVER_INFO,
      protocolVersion: MCP_PROTOCOL_VERSION,
      endpoint: "/api/mcp",
      transport: "streamable-http",
      tools: MCP_TOOLS.map((t) => t.name),
    },
    {
      status: 200,
      headers: CORS_HEADERS,
    }
  );
}

export async function POST(request: Request) {
  const rawText = await request.text();
  const { status, body } = await handleJsonRpcPayload(rawText);

  if (body === null) {
    return new NextResponse(null, {
      status,
      headers: CORS_HEADERS,
    });
  }

  return NextResponse.json(body, {
    status,
    headers: CORS_HEADERS,
  });
}
