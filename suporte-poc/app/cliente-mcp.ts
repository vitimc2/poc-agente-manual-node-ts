import { Client } from "@modelcontextprotocol/sdk/client/index.js";
import { StreamableHTTPClientTransport } from "@modelcontextprotocol/sdk/client/streamableHttp.js";
import { exigir } from "./config.ts";
import type Anthropic from "@anthropic-ai/sdk";

// O servidor e outro projeto, rodando em outro processo: aqui so existe o endereco.
export const MCP_URL = new URL(exigir("MCP_URL"));
const MCP_TOKEN = exigir("MCP_TOKEN");

export class ClienteMCP {
  private mcp = new Client({ name: "agente-acme", version: "0.1.0" });

  async conectar(): Promise<void> {
    const transporte = new StreamableHTTPClientTransport(MCP_URL, {
      requestInit: { headers: { Authorization: `Bearer ${MCP_TOKEN}` } },
    });
    await this.mcp.connect(transporte);
  }

  /** Traduz o catalogo do servidor MCP para o formato de tools da Anthropic. */
  async ferramentas(): Promise<Anthropic.Tool[]> {
    const { tools } = await this.mcp.listTools();
    return tools.map((t) => ({
      name: t.name,
      description: t.description ?? "",
      input_schema: t.inputSchema,
    }));
  }

  async chamar(nome: string, args: unknown): Promise<string> {
    await this.ferramentas();
    const resultado = await this.mcp.callTool({
      name: nome,
      arguments: args as Record<string, unknown>,
    });
    const blocos = (resultado.content ?? []) as Array<{ type: string; text?: string }>;
    const partes = blocos.filter((b) => b.type === "text").map((b) => b.text);
    return partes.join("\n") || JSON.stringify({ ok: true });
  }

  async fechar(): Promise<void> {
    await this.mcp.close();
  }
}