import { timingSafeEqual } from "node:crypto";
import { type IncomingMessage, type ServerResponse, createServer } from "node:http";

import { StreamableHTTPServerTransport } from "@modelcontextprotocol/sdk/server/streamableHttp.js";

import { exigir } from "./config.ts";
import { criarServidor } from "./server.ts";
import { Buffer } from "node:buffer";
import process from "node:process";

const PORTA = Number(process.env.MCP_PORTA ?? 3333);
const TOKEN = Buffer.from(`Bearer ${exigir("MCP_TOKEN")}`);

function autorizado(req: IncomingMessage): boolean {
  const recebido = Buffer.from(req.headers.authorization ?? "");
  return recebido.length === TOKEN.length && timingSafeEqual(recebido, TOKEN);
}

function responderErro(res: ServerResponse, status: number, mensagem: string): void {
  res.writeHead(status, { "Content-Type": "application/json" });
  res.end(JSON.stringify({ jsonrpc: "2.0", error: { code: -32000, message: mensagem }, id: null }));
}

const http = createServer(async (req: IncomingMessage, res: ServerResponse) => {
  if (new URL(req.url ?? "/", "http://localhost").pathname !== "/mcp") {
    return responderErro(res, 404, "use /mcp");
  }
  if (!autorizado(req)) return responderErro(res, 401, "token ausente ou invalido");
  
  if (req.method !== "POST") return responderErro(res, 405, "metodo nao permitido");

  const servidor = criarServidor();
  const transporte = new StreamableHTTPServerTransport({ sessionIdGenerator: undefined });
  res.on("close", () => {
    void transporte.close();
    void servidor.close();
  });

  try {
    await servidor.connect(transporte);
    await transporte.handleRequest(req, res);
  } catch (erro) {
    console.error(erro);
    if (!res.headersSent) responderErro(res, 500, "erro interno");
  }
});

// 0.0.0.0: necessario no Docker para o servidor ser alcancado de fora do container.
http.listen(PORTA, "0.0.0.0", () => {
  console.log(`servidor MCP suporte-slowdev em http://0.0.0.0:${PORTA}/mcp`);
});
