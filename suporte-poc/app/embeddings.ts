import { pipeline, type FeatureExtractionPipeline } from "@huggingface/transformers";

export const MODELO = "Xenova/paraphrase-multilingual-MiniLM-L12-v2";
export const DIMENSOES = 384;
const LOTE = 32;

let modelo: Promise<FeatureExtractionPipeline> | undefined;

/** Carrega o modelo uma vez por processo (a primeira chamada baixa ~120 MB). */
function getModel(): Promise<FeatureExtractionPipeline> {
  // Guardamos a Promise, nao o resultado: duas chamadas simultaneas
  // esperam o MESMO carregamento em vez de baixar o modelo duas vezes.
  modelo ??= pipeline("feature-extraction", MODELO, { dtype: "q8" });
  return modelo;
}

export async function embed(textos: string[]): Promise<number[][]> {
  const extrator = await getModel();
  const vetores: number[][] = [];
  for (let i = 0; i < textos.length; i += LOTE) {
    const saida = await extrator(textos.slice(i, i + LOTE), {
      pooling: "mean",
      normalize: true,
    });
    vetores.push(...(saida.tolist() as number[][]));
  }
  return vetores;
}

if (import.meta.main) {
  const [v] = await embed(["esqueci minha senha"]);
  console.log(`dimensoes: ${v.length}`);
  console.log(`primeiros valores: ${v.slice(0, 5).join(", ")}`);
}
