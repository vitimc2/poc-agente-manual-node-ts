import {fileURLToPath} from "node:url";
import fs from "node:fs";

export const RAIZ = fileURLToPath(new URL("..", import.meta.url));

const envFile = fileURLToPath(new URL("../.env", import.meta.url));

// carrega variaveis de ambiente do .env, se existir
if( fs.existsSync(envFile) ){
  process.loadEnvFile(envFile);
}

export function exigir(nome: string): string {
  const valor = process.env[nome];
  if(!valor){
    throw new Error(`variavel ${nome} ausente no .env`);
  }
  return valor;
}

export const MODELO = process.env.ANTHROPIC_MODEL ?? "claude-sonnet-5";	
