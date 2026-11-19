import fs from "node:fs";
import path from "node:path";
import { TEMPLATES } from "../../app/(index)/data/templates";
import { findTemplate } from "../../app/(index)/components/detail/detail-content";
import { SITE_URL } from "../site";
import {
  buildWebflowManifest,
  buildWebflowPromptMarkdown,
  type WebflowTemplateManifest,
} from "../webflow/manifest";

export const MCP_PROTOCOL_VERSION = "2024-11-05";

export const MCP_SERVER_INFO = {
  name: "openlanding-mcp",
  version: "1.0.0",
} as const;

export const MCP_TOOLS = [
  {
    name: "list_templates",
    description:
      "List public OpenLandingPage templates with their categories, stack, live preview URL, and Webflow manifest URL.",
    inputSchema: {
      type: "object",
      properties: {
        category: {
          type: "string",
          description: "Optional category ID filter (e.g. '3d', 'saas', 'editorial', 'gsap', 'threejs').",
        },
        query: {
          type: "string",
          description: "Optional case-insensitive search substring matched against slug, title, industry, or description.",
        },
        limit: {
          type: "number",
          description: "Maximum number of templates to return (1-200, default 50).",
        },
      },
      additionalProperties: false,
    },
  },
  {
    name: "get_webflow_manifest",
    description:
      "Retrieve the structured Webflow import manifest for a template slug: color/font/size variables, site assets, native vs. hybrid-embed section list, and custom-code blocks.",
    inputSchema: {
      type: "object",
      properties: {
        slug: {
          type: "string",
          description: "Template slug (e.g. 'snoot', 'tolvar', 'lumen').",
        },
      },
      required: ["slug"],
      additionalProperties: false,
    },
  },
  {
    name: "get_webflow_section",
    description:
      "Retrieve a single section specification and its associated CSS rules and custom-code blocks for step-by-step Webflow page construction.",
    inputSchema: {
      type: "object",
      properties: {
        slug: {
          type: "string",
          description: "Template slug (e.g. 'snoot').",
        },
        sectionId: {
          type: "string",
          description: "Section identifier from get_webflow_manifest (e.g. 'section-1').",
        },
      },
      required: ["slug", "sectionId"],
      additionalProperties: false,
    },
  },
  {
    name: "get_webflow_prompt",
    description:
      "Retrieve the complete Webflow MCP Markdown playbook for importing a template into Webflow.",
    inputSchema: {
      type: "object",
      properties: {
        slug: {
          type: "string",
          description: "Template slug (e.g. 'snoot').",
        },
      },
      required: ["slug"],
      additionalProperties: false,
    },
  },
] as const;

export function loadOrBuildWebflowManifest(slug: string): WebflowTemplateManifest | null {
  const normalized = slug.trim().toLowerCase();
  if (!/^[a-z0-9-]+$/.test(normalized)) return null;

  const template = findTemplate(TEMPLATES, normalized);
  if (!template) return null;

  const jsonPath = path.join(process.cwd(), "public", "copy", `${normalized}-webflow.json`);
  if (fs.existsSync(jsonPath)) {
    try {
      return JSON.parse(fs.readFileSync(jsonPath, "utf8")) as WebflowTemplateManifest;
    } catch {
      // Fall through to in-memory build if JSON on disk is unreadable
    }
  }

  return buildWebflowManifest({ template });
}

export function loadOrBuildWebflowPrompt(slug: string): string | null {
  const normalized = slug.trim().toLowerCase();
  if (!/^[a-z0-9-]+$/.test(normalized)) return null;

  const template = findTemplate(TEMPLATES, normalized);
  if (!template) return null;

  const mdPath = path.join(process.cwd(), "public", "copy", `${normalized}-webflow-prompt.md`);
  if (fs.existsSync(mdPath)) {
    try {
      return fs.readFileSync(mdPath, "utf8");
    } catch {
      // Fall through
    }
  }

  const manifest = loadOrBuildWebflowManifest(normalized);
  return manifest ? buildWebflowPromptMarkdown(manifest) : null;
}

interface JsonRpcRequest {
  jsonrpc?: string;
  id?: string | number | null;
  method?: string;
  params?: Record<string, unknown>;
}

interface McpToolResult {
  content: Array<{ type: "text"; text: string }>;
  isError?: boolean;
}

function toolSuccess(data: unknown): McpToolResult {
  const text = typeof data === "string" ? data : JSON.stringify(data, null, 2);
  return { content: [{ type: "text", text }] };
}

function toolError(message: string): McpToolResult {
  return {
    isError: true,
    content: [{ type: "text", text: message }],
  };
}

function executeToolCall(name: string, args: Record<string, unknown> = {}): McpToolResult {
  switch (name) {
    case "list_templates": {
      const category = typeof args.category === "string" ? args.category.trim().toLowerCase() : "";
      const query = typeof args.query === "string" ? args.query.trim().toLowerCase() : "";
      const rawLimit = typeof args.limit === "number" && Number.isFinite(args.limit) ? args.limit : 50;
      const limit = Math.min(200, Math.max(1, Math.floor(rawLimit)));

      const items = TEMPLATES.filter((t) => {
        if (category && category !== "all" && !t.categories.includes(category as never)) {
          return false;
        }
        if (query) {
          const haystack = `${t.slug} ${t.title} ${t.industry} ${t.description}`.toLowerCase();
          if (!haystack.includes(query)) return false;
        }
        return true;
      })
        .slice(0, limit)
        .map((t) => ({
          slug: t.slug,
          title: t.title,
          industry: t.industry,
          category: t.category,
          categories: t.categories,
          stack: t.stack,
          hasDownload: Boolean(t.hasDownload),
          liveUrl: `${SITE_URL}/templates/${t.slug}`,
          manifestUrl: `${SITE_URL}/copy/${t.slug}-webflow.json`,
          webflowPromptUrl: `${SITE_URL}/copy/${t.slug}-webflow-prompt.md`,
        }));

      return toolSuccess(items);
    }

    case "get_webflow_manifest": {
      const slug = typeof args.slug === "string" ? args.slug : "";
      if (!slug.trim()) {
        return toolError("Missing required parameter 'slug'.");
      }
      const manifest = loadOrBuildWebflowManifest(slug);
      if (!manifest) {
        return toolError(`Unknown template slug '${slug}'. Call list_templates to see available slugs.`);
      }
      return toolSuccess(manifest);
    }

    case "get_webflow_section": {
      const slug = typeof args.slug === "string" ? args.slug : "";
      const sectionId = typeof args.sectionId === "string" ? args.sectionId.trim() : "";
      if (!slug.trim() || !sectionId) {
        return toolError("Missing required parameters 'slug' and 'sectionId'.");
      }
      const manifest = loadOrBuildWebflowManifest(slug);
      if (!manifest) {
        return toolError(`Unknown template slug '${slug}'. Call list_templates to see available slugs.`);
      }
      const section = manifest.sections.find((s) => s.id === sectionId);
      if (!section) {
        const validIds = manifest.sections.map((s) => s.id).join(", ");
        return toolError(`Unknown sectionId '${sectionId}' for template '${slug}'. Valid sectionIds: ${validIds}`);
      }
      return toolSuccess({
        slug: manifest.slug,
        title: manifest.title,
        section,
        variables: manifest.variables,
        customCodeBlocks:
          section.deliveryMode === "hybrid-embed"
            ? manifest.customCodeBlocks
            : manifest.customCodeBlocks.filter((b) => b.location === "head"),
      });
    }

    case "get_webflow_prompt": {
      const slug = typeof args.slug === "string" ? args.slug : "";
      if (!slug.trim()) {
        return toolError("Missing required parameter 'slug'.");
      }
      const prompt = loadOrBuildWebflowPrompt(slug);
      if (!prompt) {
        return toolError(`Unknown template slug '${slug}'. Call list_templates to see available slugs.`);
      }
      return toolSuccess(prompt);
    }

    default:
      return toolError(`Unknown tool '${name}'. Available tools: ${MCP_TOOLS.map((t) => t.name).join(", ")}.`);
  }
}

function handleSingleJsonRpc(req: JsonRpcRequest): Record<string, unknown> | null {
  const isNotification = req.id === undefined;
  const id = req.id ?? null;

  if (!req || typeof req !== "object" || req.jsonrpc !== "2.0" || typeof req.method !== "string") {
    return {
      jsonrpc: "2.0",
      id,
      error: { code: -32600, message: "Invalid Request" },
    };
  }

  switch (req.method) {
    case "notifications/initialized":
    case "notifications/cancelled":
      return null;

    case "initialize":
      return {
        jsonrpc: "2.0",
        id,
        result: {
          protocolVersion: MCP_PROTOCOL_VERSION,
          capabilities: { tools: {} },
          serverInfo: MCP_SERVER_INFO,
          instructions:
            "Use list_templates to discover OpenLandingPage templates, get_webflow_manifest(slug) for Webflow tokens/assets/sections, and get_webflow_section(slug, sectionId) to import each section into Webflow with the official Webflow MCP.",
        },
      };

    case "ping":
      return {
        jsonrpc: "2.0",
        id,
        result: {},
      };

    case "tools/list":
      return {
        jsonrpc: "2.0",
        id,
        result: {
          tools: MCP_TOOLS,
        },
      };

    case "tools/call": {
      const params = req.params ?? {};
      const toolName = typeof params.name === "string" ? params.name : "";
      const toolArgs =
        params.arguments && typeof params.arguments === "object" && !Array.isArray(params.arguments)
          ? (params.arguments as Record<string, unknown>)
          : {};
      const result = executeToolCall(toolName, toolArgs);
      return {
        jsonrpc: "2.0",
        id,
        result,
      };
    }

    default:
      if (isNotification) return null;
      return {
        jsonrpc: "2.0",
        id,
        error: { code: -32601, message: `Method not found: ${req.method}` },
      };
  }
}

export async function handleJsonRpcPayload(
  rawText: string
): Promise<{ status: number; body: unknown | null }> {
  let parsed: unknown;
  try {
    parsed = JSON.parse(rawText);
  } catch {
    return {
      status: 400,
      body: {
        jsonrpc: "2.0",
        id: null,
        error: { code: -32700, message: "Parse error" },
      },
    };
  }

  if (Array.isArray(parsed)) {
    if (parsed.length === 0) {
      return {
        status: 400,
        body: {
          jsonrpc: "2.0",
          id: null,
          error: { code: -32600, message: "Invalid Request" },
        },
      };
    }
    const responses = parsed
      .map((item) => handleSingleJsonRpc(item as JsonRpcRequest))
      .filter((item): item is Record<string, unknown> => item !== null);
    if (responses.length === 0) {
      return { status: 202, body: null };
    }
    return { status: 200, body: responses };
  }

  const response = handleSingleJsonRpc(parsed as JsonRpcRequest);
  if (response === null) {
    return { status: 202, body: null };
  }
  return { status: 200, body: response };
}
