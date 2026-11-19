import { describe, it, expect } from "vitest";
import { GET, POST, OPTIONS } from "./route";

describe("/api/mcp route", () => {
  it("returns server metadata and CORS headers on GET and OPTIONS", async () => {
    const optRes = await OPTIONS();
    expect(optRes.status).toBe(204);
    expect(optRes.headers.get("access-control-allow-origin")).toBe("*");

    const getRes = await GET();
    expect(getRes.status).toBe(200);
    const info = await getRes.json();
    expect(info.name).toBe("openlanding-mcp");
    expect(info.tools).toEqual(
      expect.arrayContaining(["list_templates", "get_webflow_manifest", "get_webflow_section", "get_webflow_prompt"])
    );
  });

  it("handles initialize and tools/list JSON-RPC requests", async () => {
    const initRes = await POST(
      new Request("http://localhost/api/mcp", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ jsonrpc: "2.0", id: 1, method: "initialize", params: {} }),
      })
    );
    expect(initRes.status).toBe(200);
    const initJson = await initRes.json();
    expect(initJson.result.serverInfo.name).toBe("openlanding-mcp");

    const listRes = await POST(
      new Request("http://localhost/api/mcp", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ jsonrpc: "2.0", id: 2, method: "tools/list" }),
      })
    );
    const listJson = await listRes.json();
    expect(listJson.result.tools).toHaveLength(4);
  });

  it("returns HTTP 202 with empty body for JSON-RPC notifications without an id", async () => {
    const res = await POST(
      new Request("http://localhost/api/mcp", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ jsonrpc: "2.0", method: "notifications/initialized" }),
      })
    );
    expect(res.status).toBe(202);
    expect(await res.text()).toBe("");
  });

  it("executes list_templates, get_webflow_manifest, get_webflow_section, and get_webflow_prompt", async () => {
    const callTool = async (name: string, args: Record<string, unknown>) => {
      const res = await POST(
        new Request("http://localhost/api/mcp", {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify({ jsonrpc: "2.0", id: 10, method: "tools/call", params: { name, arguments: args } }),
        })
      );
      return res.json();
    };

    const listOut = await callTool("list_templates", { query: "snoot", limit: 5 });
    expect(listOut.result.isError).toBeFalsy();
    expect(JSON.parse(listOut.result.content[0].text)).toEqual(
      expect.arrayContaining([expect.objectContaining({ slug: "snoot" })])
    );

    const manifestOut = await callTool("get_webflow_manifest", { slug: "snoot" });
    const manifest = JSON.parse(manifestOut.result.content[0].text);
    expect(manifest.slug).toBe("snoot");
    expect(manifest.sections.length).toBeGreaterThan(0);

    const sectionOut = await callTool("get_webflow_section", {
      slug: "snoot",
      sectionId: manifest.sections[0].id,
    });
    expect(sectionOut.result.isError).toBeFalsy();
    expect(JSON.parse(sectionOut.result.content[0].text).section.id).toBe(manifest.sections[0].id);

    const promptOut = await callTool("get_webflow_prompt", { slug: "snoot" });
    expect(promptOut.result.content[0].text).toContain("data_variable_tool");
  });

  it("returns structured JSON-RPC and tool errors for invalid JSON, unknown methods, and unknown slugs", async () => {
    const badJsonRes = await POST(
      new Request("http://localhost/api/mcp", {
        method: "POST",
        body: "{bad-json",
      })
    );
    expect(badJsonRes.status).toBe(400);
    expect((await badJsonRes.json()).error.code).toBe(-32700);

    const badMethodRes = await POST(
      new Request("http://localhost/api/mcp", {
        method: "POST",
        body: JSON.stringify({ jsonrpc: "2.0", id: 3, method: "unknown/method" }),
      })
    );
    expect((await badMethodRes.json()).error.code).toBe(-32601);

    const badSlugRes = await POST(
      new Request("http://localhost/api/mcp", {
        method: "POST",
        body: JSON.stringify({
          jsonrpc: "2.0",
          id: 4,
          method: "tools/call",
          params: { name: "get_webflow_manifest", arguments: { slug: "nonexistent-slug" } },
        }),
      })
    );
    const badSlugJson = await badSlugRes.json();
    expect(badSlugJson.result.isError).toBe(true);
    expect(badSlugJson.result.content[0].text).toContain("Unknown template slug");
  });
});
