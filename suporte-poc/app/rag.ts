import Anthropic from "@anthropic-ai/sdk";

import { MODELO } from "./config.ts";
import { pool } from "./db.ts";
import { buscar } from "./search.ts";

const client = new Anthropic(); // le ANTHROPIC_API_KEY do ambiente

const PROMPT = `Voce e o assistente de suporte da SlowDev.

Regras:
- Responda SOMENTE com base nos trechos da documentacao fornecidos abaixo.
- Se a resposta nao estiver nos trechos, diga que nao encontrou e ofereca abrir um chamado.
  Nunca invente politica, prazo ou procedimento.
- Cite a fonte ao final, no formato: (fonte: nome-do-arquivo.md)
- Seja direto: no maximo 4 frases.`;

export async function responder(pergunta: string): Promise<string> {
  const trechos = await buscar(pergunta);
  const contexto = trechos.map((t) => `[${t.fonte}]\n${t.conteudo}`).join("\n\n---\n\n");

  const resposta = await client.messages.create({
    model: MODELO,
    max_tokens: 500,
    system: PROMPT,
    messages: [
      {
        role: "user",
        content: `Documentacao:\n\n${contexto}\n\nPergunta do cliente: ${pergunta}`,
      },
    ],
  });

  const bloco = resposta.content[0];
  return bloco?.type === "text" ? bloco.text : "(resposta sem texto)";
}

if (import.meta.main) {
  const pergunta = process.argv.slice(2).join(" ") || "esqueci minha senha, e agora?";
  console.log(await responder(pergunta));
  await pool.end();
}
