import fs from "node:fs";
import { fileURLToPath } from "node:url";

const envFile = fileURLToPath(new URL("../.env", import.meta.url));

// carrega variaveis de ambiente do .env, se existir
if( fs.existsSync(envFile) ){
  process.loadEnvFile(envFile);
}

export function exigir(nome: string): string {
  const valor = process.env[nome];
  if (!valor) throw new Error(`variavel ${nome} ausente no .env`);
  return valor;
}
