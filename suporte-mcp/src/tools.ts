// Sistemas de verdade viveriam atras de uma API. Aqui, objetos em memoria.
type CTe = { status: string; produto: string; valor: number };
type Chamado = { assunto: string; descricao: string; email: string; prazo: string };

const CTES: Record<string, CTe> = {
  "1001": { status: "entregue", produto: "Alimenticio", valor: 1188.0 },
  "1002": { status: "em_rota_de_entrega", produto: "Carga Geral", valor: 499.0 },
};

const CHAMADOS = new Map<string, Chamado>();

export function consultarCTe(numero: string) {
  const cte = CTES[numero];
  if (!cte) return { erro: `CTe ${numero} nao encontrado.` };
  return { numero, ...cte };
}

/** Cria um chamado. Sem `confirmado`, apenas devolve a previa. */
export function abrirChamado(
  assunto: string,
  descricao: string,
  email: string,
  confirmado: boolean,
) {
  if (!confirmado) {
    return {
      status: "aguardando_confirmacao",
      previa: { assunto, descricao, email },
      instrucao:
        "Mostre esta previa ao cliente com estas palavras exatas e peca " +
        "uma confirmacao clara. So chame de novo com confirmado=true " +
        "depois que ele confirmar.",
    };
  }

  const numero = `CH-${String(CHAMADOS.size + 1).padStart(4, "0")}`;
  const doisDias = new Date(Date.now() + 2 * 24 * 60 * 60 * 1000);
  CHAMADOS.set(numero, {
    assunto,
    descricao,
    email,
    prazo: doisDias.toISOString().slice(0, 10),
  });
  return { numero, status: "aberto", ...CHAMADOS.get(numero)! };
}
