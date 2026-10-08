import { randomUUID } from "node:crypto";
import { join } from "node:path";

import type Anthropic from "@anthropic-ai/sdk";
import fastifyStatic from "@fastify/static";
import Fastify from "fastify";

import { conversar, textoFinal } from "./agent.ts";
import { RAIZ } from "./config.ts";
import { ClienteMCP, MCP_URL } from "./cliente-mcp.ts";

const app = Fastify({ logger: true });

const SESSOES = new Map<string, Anthropic.MessageParam[]>(); // em memoria: some quando o processo reinicia

const mcp = new ClienteMCP();
await mcp.conectar();
console.log(`conectado ao servidor MCP em ${MCP_URL}`);
console.log("ferramentas mcp:", (await mcp.ferramentas()).map((f) => f.name), "\n");


type Entrada = { mensagem: string; sessao_id?: string | null };
type Saida = { sessao_id: string; resposta: string };

app.post<{ Body: Entrada; Reply: Saida }>(
  "/chat",
  {
    schema: {
      body: {
        type: "object",
        required: ["mensagem"],
        properties: {
          mensagem: { type: "string", minLength: 1 },
          sessao_id: { type: ["string", "null"] },
        },
      },
    },
  },
  async (req) => {
    const sessaoId = req.body.sessao_id || randomUUID();
    const historico = SESSOES.get(sessaoId) ?? [];
    historico.push({ role: "user", content: req.body.mensagem });
    SESSOES.set(sessaoId, await conversar(mcp, historico));
    return { sessao_id: sessaoId, resposta: textoFinal(SESSOES.get(sessaoId)!) };
  },
);

app.register(fastifyStatic, { root: join(RAIZ, "web") }); // serve web/index.html em /

await app.listen({ port: Number(process.env.API_PORT) || 3000, host: "0.0.0.0" });
