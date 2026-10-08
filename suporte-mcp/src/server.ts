import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";

import { abrirChamado, consultarCTe } from "./tools.ts";

function json(valor: unknown) {
  return { content: [{ type: "text" as const, text: JSON.stringify(valor) }] };
}

export function criarServidor(): McpServer {
  const servidor = new McpServer({ name: "suporte-slowdev", version: "0.1.0" });

  servidor.registerTool(
    "consultar_cte",
    {
      description: "Consulta status, produto transportado e valor de um CTe pelo numero. ",
      inputSchema: { numero: z.string().describe("Numero do CTe, ex: 1001.") },
    },
    async ({ numero }) => json(consultarCTe(numero)),
  );

  servidor.registerTool(
    "abrir_chamado",
    {
      description:
        "Abre um chamado de suporte para atendimento humano. Use quando a " +
        "documentacao nao resolver ou o cliente pedir. ATENCAO: chame primeiro " +
        "confirmado=false para obter a previa, mostre ao cliente, e so chame com " +
        "confirmado=true apos confirmacao explicita dele.",
      inputSchema: {
        assunto: z.string().describe("Resumo em uma linha."),
        descricao: z.string().describe("O problema em detalhe."),
        email: z.email().describe("E-mail de contato do cliente."),
        confirmado: z.boolean().describe("true apenas apos confirmacao explicita."),
      },
    },
    async ({ assunto, descricao, email, confirmado }) =>
      json(abrirChamado(assunto, descricao, email, confirmado)),
  );

  return servidor;
}
