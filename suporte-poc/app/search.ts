import { paraVetor, pool } from "./db.ts";
import { embed } from "./embeddings.ts";

export type Trecho = {
  fonte: string;
  titulo: string;
  conteudo: string;
  similaridade: number;
};

const SQL = `
SELECT fonte, titulo, conteudo, 1 - (embedding <=> $1) AS similaridade
FROM chunks
ORDER BY embedding <=> $1
LIMIT $2
`;

export async function buscar(pergunta: string, k = 4): Promise<Trecho[]> {
  const [vetor] = await embed([pergunta]);
  const { rows } = await pool.query<Trecho>(SQL, [paraVetor(vetor), k]);
  return rows.map((r) => ({ ...r, similaridade: Number(r.similaridade.toFixed(3)) }));
}

if (import.meta.main) {
  const pergunta = process.argv.slice(2).join(" ") || "esqueci minha senha";
  console.log(`pergunta: ${pergunta}\n`);
  for (const r of await buscar(pergunta)) {
    console.log(`[${r.similaridade.toFixed(3)}] ${r.fonte}`);
    console.log(`  ${r.conteudo.slice(0, 210).replaceAll("\n", " ")}...\n`);
  }
  await pool.end();
}
