# Despacho e CT-e

## Criando uma minuta

A minuta é o rascunho da carga antes da emissão do CT-e. Para criar uma, acesse Operação, depois Despacho, e clique em "Nova minuta". Você também pode importar o XML da nota fiscal: o sistema preenche automaticamente remetente, destinatário, peso, volumes e valor da mercadoria a partir da NF-e.

Antes de seguir para o cálculo de frete, confira se o tomador do serviço está correto. O tomador é quem paga o frete e é a partir dele que o sistema escolhe a tabela de preços. Um tomador errado é a causa mais comum de frete calculado com valor diferente do esperado.

Minutas que ficam paradas como rascunho por mais de 30 dias são canceladas automaticamente.

## Como o frete é calculado

O frete é calculado pela tabela comercial do cliente tomador para aquela rota. O valor final soma o frete por peso, o seguro (ad valorem), o gerenciamento de risco (GRIS), o pedágio e uma taxa administrativa de R$ 4,00 por CT-e. Entregas em áreas de difícil acesso também recebem a taxa de dificuldade de entrega, de R$ 45,00.

O sistema sempre usa o maior valor entre o peso real e o peso cubado. O peso cubado é calculado multiplicando o volume da carga em metros cúbicos por 300. Por isso, uma carga leve mas volumosa, como espuma ou embalagens vazias, pode ter frete maior do que o peso real sugere.

Se aparecer a mensagem "Tabela de frete não encontrada", significa que o cliente não tem uma tabela válida para aquela origem e destino. Nesse caso, peça ao time Comercial para cadastrar ou renovar a tabela. O Despacho não consegue emitir o CT-e até isso ser resolvido.

## Alterando o valor do frete manualmente

Você pode digitar um valor de frete diferente do calculado, por exemplo para atender uma negociação pontual. Se a diferença for de até 10%, a minuta segue normalmente. Acima de 10%, a minuta fica aguardando aprovação de um Supervisor de Despacho, que recebe um aviso no sino de notificações.

## Emitindo o CT-e

Com o frete calculado, clique em "Emitir CT-e". O sistema envia o documento para a SEFAZ e normalmente o retorno chega em menos de um minuto. Quando o CT-e é autorizado, o ícone da minuta fica verde e o DACTE fica disponível para download em PDF.

Para emitir vários CT-es de uma vez, use a opção "Emissão em lote". Cada lote aceita até 500 minutas. O processamento acontece em segundo plano e você é avisado pelo sino quando terminar, então pode continuar trabalhando em outras telas enquanto isso.

Cargas com valor de mercadoria acima de R$ 500 mil só podem ser emitidas depois que você informar o número da averbação do seguro, na aba Carga da minuta.

## CT-e rejeitado

Quando a SEFAZ rejeita um CT-e, o ícone da minuta fica vermelho. Abra a minuta e clique em "Histórico" para ver o motivo exato da rejeição. Corrija o campo indicado e clique em "Reenviar". A numeração do CT-e é mantida, então não é preciso criar uma nova minuta.

Se a rejeição falar em certificado digital vencido, o problema não está na minuta: o certificado da filial precisa ser renovado pelo administrador. Avise o administrador da sua empresa, porque nenhum CT-e daquela filial será autorizado até a troca.

## Nota fiscal já vinculada a outro CT-e

O sistema não permite que a mesma nota fiscal fique em dois CT-es ativos ao mesmo tempo. Se aparecer essa mensagem, pesquise a chave da nota em Consulta CT-e para encontrar o documento que já está usando essa NF. Se aquele CT-e foi emitido por engano, cancele-o primeiro e depois emita o novo.

## Cancelando um CT-e

Um CT-e pode ser cancelado em até 7 dias (168 horas) depois de autorizado. Para cancelar, vá em Consulta CT-e, localize o documento, clique em "Ações" e depois em "Cancelar". Escreva uma justificativa com pelo menos 15 caracteres explicando o motivo.

Até 24 horas após a autorização, o próprio analista pode cancelar. Depois disso, o cancelamento precisa ser aprovado por um Supervisor de Despacho.

Se o CT-e estiver em um MDF-e que ainda não foi encerrado, o cancelamento é bloqueado. Nesse caso, é preciso primeiro cancelar o MDF-e ou retirar o CT-e dele. Passados os 7 dias, não é mais possível cancelar: fale com o setor fiscal para emitir um CT-e substituto.

## Carta de correção

A carta de correção serve para ajustar informações de um CT-e já autorizado sem precisar cancelá-lo. Ela pode ser usada para corrigir observações, dados de contato, descrição do produto e o endereço de entrega, desde que a cidade continue a mesma.

Não é possível corrigir por carta de correção valores de frete e impostos, CNPJ ou CPF de remetente, destinatário ou tomador, datas e as cidades de origem e destino. Para esses casos, é preciso cancelar o CT-e dentro do prazo ou emitir um CT-e substituto.

Cada CT-e aceita até 20 cartas de correção. A última carta enviada substitui as anteriores, então ela precisa conter todas as correções, inclusive as que já tinham sido feitas antes.

## Montando a viagem e emitindo o MDF-e

Depois que os CT-es estão autorizados, acesse Montagem de Viagem, selecione os documentos, escolha o veículo e o motorista e organize a ordem das entregas. Em seguida, clique em "Emitir MDF-e".

Para a viagem ser liberada, o motorista precisa estar com a CNH válida e com a consulta de gerenciamento de risco aprovada nas últimas 24 horas. Se a consulta estiver vencida, o sistema avisa e não deixa liberar até uma nova aprovação.

Não é possível emitir um novo MDF-e para um veículo que ainda tem outro MDF-e aberto no mesmo estado de carregamento. Encerre o anterior em Consulta MDF-e antes de montar a nova viagem. Normalmente o encerramento é automático quando a última entrega é concluída, mas se isso falhar, a Torre de Controle recebe um alerta.

## SEFAZ fora do ar

Quando a SEFAZ fica indisponível por mais de 5 minutos, o sistema entra em modo de contingência e mostra uma faixa laranja no topo da tela. Você pode continuar emitindo normalmente: os CT-es ficam com status de contingência e são transmitidos sozinhos assim que o serviço voltar. Não é preciso reenviar nada manualmente.
