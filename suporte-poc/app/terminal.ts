import * as readline from "node:readline";

/** Prompt de terminal que devolve null quando o usuario sai (Ctrl+C ou Ctrl+D). */
export function criarTerminal() {
  const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
  rl.on("SIGINT", () => rl.close());
  const linhas = rl[Symbol.asyncIterator](); // guarda em fila o que chega enquanto o agente pensa

  async function perguntar(texto: string): Promise<string | null> {
    process.stdout.write(texto);
    const { value, done } = await linhas.next();
    return done ? null : value.trim();
  }

  return { perguntar };
}
