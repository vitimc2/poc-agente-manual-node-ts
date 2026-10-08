import Anthropic from "@anthropic-ai/sdk";

import { MODELO } from "./config.ts";
import { pool } from "./db.ts";
import { buscar } from "./search.ts";
import { criarTerminal } from "./terminal.ts";
import { ClienteMCP, MCP_URL } from "./cliente-mcp.ts";

const client = new Anthropic();

export const PROMPT = `Voce e o assistente de suporte da SlowDev.

Use a ferramenta buscar_documentacao sempre que a pergunta for sobre acesso a conta, despacho, cte,
torre de controle, senha ou tracking. Para conversa social (cumprimento,
agradecimento) responda direto, sem buscar.

Responda apenas com base no que a documentacao devolver. Se a busca nao trouxer
nada relevante, diga que nao encontrou e ofereca abrir um chamado.
Cite a fonte ao final: (fonte: arquivo.md). No maximo 4 frases.

Responda no idioma da pergunta e não misture idiomas exceto em termos tecnicos.`;

export const FERRAMENTAS: Anthropic.Tool[] = [
  {
    name: "buscar_documentacao",
    description:
      "Busca trechos da documentacao de suporte da SlowDev por similaridade " +
      "semantica. Use para duvidas sobre despacho, cte, torre de controle, senha ou tracking.",
    input_schema: {
      type: "object",
      properties: {
        pergunta: { type: "string", description: "Pergunta em portugues." },
      },
      required: ["pergunta"],
    },
  }
];

type Args = Record<string, any>;

const DESPACHANTE: Record<string, (a: Args) => unknown> = {
  buscar_documentacao: (a) => buscar(a.pergunta)
};

async function executarFerramenta(mcp: ClienteMCP ,nome: string, args: unknown): Promise<string> {
  const funcao = DESPACHANTE[nome];

  try {

    // Se não temos a ferramenta implementada localmente, chamamos o servidor MCP.
    if (!funcao){
      return await mcp.chamar(nome, args)
    };

    return JSON.stringify(await funcao(args as Args));
  } catch (exc) {
    // Devolver o erro ao modelo e melhor que estourar: ele consegue se recuperar
    // pedindo o dado que falta, em vez de derrubar a conversa.
    const msg = exc instanceof Error ? `${exc.name}: ${exc.message}` : String(exc);
    return JSON.stringify({ erro: msg });
  }
}

/**
 * Roda o loop de tool use ate o modelo parar de pedir ferramentas.
 * `mensagens` entra e sai com o historico completo da sessao.
 */
export async function conversar(
  mcp: ClienteMCP,
  mensagens: Anthropic.MessageParam[],
  maxVoltas = 5,
): Promise<Anthropic.MessageParam[]> {

  const ferramentasMcp = await mcp.ferramentas();
  const tools = [...FERRAMENTAS, ...ferramentasMcp];


  for (let volta = 0; volta < maxVoltas; volta++) {
    const resposta = await client.messages.create({
      model: MODELO,
      max_tokens: 1000,
      system: PROMPT,
      tools: tools,
      messages: mensagens,
    });
    mensagens.push({ role: "assistant", content: resposta.content });

    if (resposta.stop_reason !== "tool_use") return mensagens;

    const resultados: Anthropic.ToolResultBlockParam[] = [];
    for (const bloco of resposta.content) {
      if (bloco.type === "tool_use") {
        console.log(`   -> ${bloco.name}(${JSON.stringify(bloco.input)})`);
        resultados.push({
          type: "tool_result",
          tool_use_id: bloco.id,
          content: await executarFerramenta(mcp, bloco.name, bloco.input),
        });
      }
    }
    mensagens.push({ role: "user", content: resultados });
  }
  return mensagens;
}

export function textoFinal(mensagens: Anthropic.MessageParam[]): string {
  const ultima = mensagens.at(-1);
  if (typeof ultima?.content === "string") return ultima.content;
  for (const bloco of ultima?.content ?? []) {
    if (bloco.type === "text") return bloco.text;
  }
  return "(o agente parou sem responder)";
}

if (import.meta.main) {
  const mcp = new ClienteMCP();
  await mcp.conectar();
  console.log(`conectado ao servidor MCP em ${MCP_URL}`);
  console.log("ferramentas mcp:", (await mcp.ferramentas()).map((f) => f.name), "\n");
  
  
  const terminal = criarTerminal();
  let historico: Anthropic.MessageParam[] = [];
  console.log("Suporte SlowDev. Ctrl+C para sair.\n");
  while (true) {
    const pergunta = await terminal.perguntar("voce> ");
    if (pergunta === null) break;
    if (!pergunta) continue;
    historico.push({ role: "user", content: pergunta });
    historico = await conversar(mcp, historico);
    console.log(`agente> ${textoFinal(historico)}\n`);
  }
  await pool.end();
}