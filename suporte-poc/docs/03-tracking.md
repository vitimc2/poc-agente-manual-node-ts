# Tracking e Rastreamento

## Como funciona o rastreamento

O rastreamento mostra onde a carga está e o que já aconteceu com ela, desde o recebimento do pedido até a entrega. A posição do veículo vem do rastreador instalado no caminhão ou do aplicativo do motorista. Quando os dois estão ativos, o sistema dá preferência ao rastreador, porque ele costuma ser mais preciso.

Em movimento, o rastreador envia a posição a cada 2 minutos e o aplicativo a cada 3 minutos. Com o veículo parado, esses intervalos ficam maiores para economizar bateria e dados.

## Consultando uma carga pelo código de rastreio

Qualquer pessoa pode consultar uma carga no portal de rastreio, em rastreio.slowdev.com.br, sem precisar de login. Basta digitar o código de rastreio, que começa com RC seguido de 10 números, como RC2026004587, ou a chave de 44 dígitos do CT-e.

Na consulta sem login aparecem apenas os eventos da entrega e a previsão de chegada. Dados pessoais, como o nome de quem recebeu a mercadoria, aparecem mascarados para proteger a privacidade.

Se a mensagem for "Código de rastreio não encontrado", confira se o código foi digitado corretamente. Cargas entregues há mais de 5 anos também não aparecem mais na consulta.

## Acesso do cliente ao portal

Clientes com login no portal conseguem pesquisar por número da nota fiscal, número do pedido, período ou destinatário. Também podem baixar o DACTE, o XML do CT-e e o comprovante de entrega de cada carga. Cada cliente vê somente as cargas em que aparece como tomador, remetente ou destinatário.

Para pedir um acesso ao portal, o cliente deve falar com o seu contato comercial ou com o atendimento da transportadora.

## Previsão de chegada

A previsão de chegada é recalculada a cada nova posição do veículo, a cada entrega feita e, no mínimo, a cada 10 minutos. O cálculo considera a distância que falta, a velocidade média histórica do trecho, o tempo das entregas que ainda vão acontecer antes e as paradas obrigatórias de descanso do motorista.

Por isso é normal que a previsão mude ao longo do dia. Para o cliente, ela é mostrada em faixas de 30 minutos, como "entre 14h00 e 14h30", o que deixa a informação mais estável.

Se o veículo ficar mais de 30 minutos sem enviar posição, a previsão para de ser atualizada e aparece com o aviso "estimativa desatualizada" até o sinal voltar.

## Chegada no destinatário

O sistema registra a chegada no destinatário automaticamente quando o veículo entra em um raio de 300 metros do endereço de entrega. Em locais grandes, como centros de distribuição e indústrias, esse raio pode ser ajustado pelo administrador para evitar registros antes da hora.

## Registrando a entrega no aplicativo

Ao concluir a entrega, o motorista registra no aplicativo a foto do canhoto assinado e o nome e documento de quem recebeu. Alguns clientes também exigem a assinatura digital na tela do celular. A localização e o horário são registrados automaticamente.

A entrega só é aceita direto se o motorista estiver a até 500 metros do endereço de entrega. Se estiver mais longe, o aplicativo pede uma justificativa e a entrega fica pendente até ser validada pelo atendimento.

## Entrega sem internet

Se o motorista estiver em um local sem sinal, ele pode registrar a entrega normalmente. O aplicativo guarda as informações e as fotos no celular e envia tudo sozinho assim que a conexão voltar. O horário registrado é o da entrega real, e não o do envio.

## Comprovante de entrega

O comprovante de entrega passa por uma leitura automática da foto do canhoto. Se o sistema não conseguir identificar o número da nota fiscal, porque a foto ficou escura, tremida ou cortada, o comprovante vai para validação manual do atendimento, que deve analisá-lo em até 24 horas.

Quando um comprovante é recusado, o motorista recebe uma tarefa no aplicativo para enviar uma nova foto em até 48 horas. Se isso não acontecer, a Torre de Controle recebe um alerta de entrega sem comprovante.

O comprovante fica disponível para download no portal por 5 anos. Depois desse prazo, ele é arquivado e pode ser solicitado ao atendimento, com prazo de até 10 dias úteis para envio.

## Corrigindo um evento lançado errado

Os eventos de rastreamento não podem ser apagados, para manter o histórico confiável. Se você registrou um evento na carga errada, por exemplo uma entrega na nota fiscal trocada, use a opção "Anular evento", escolha o evento original e informe o motivo. Depois, registre o evento correto na carga certa.

## Notificações por e-mail e WhatsApp

Clientes e destinatários podem ser avisados por e-mail, WhatsApp ou SMS quando o CT-e é emitido, quando a carga sai para entrega, quando a entrega é concluída e quando acontece alguma ocorrência. A mensagem de saída para entrega inclui um link para acompanhar o veículo.

As mensagens de WhatsApp e SMS para destinatários só são enviadas entre 7h e 21h, no horário local do destino. Fora desse período, elas aguardam na fila. O WhatsApp só é enviado para quem autorizou o recebimento.

Se um destinatário não está recebendo as mensagens, verifique se ele não respondeu "SAIR" em algum momento. Quando isso acontece, aquele telefone deixa de receber notificações em todas as cargas futuras.

## Integração por webhook

Clientes que precisam receber os eventos direto no seu sistema podem usar webhooks. A cada evento, o sistema envia uma notificação para o endereço configurado pelo cliente. Se o envio falhar, são feitas novas tentativas após 1 minuto, 5 minutos, 30 minutos, 2 horas e 12 horas.

Depois de 5 falhas seguidas, o webhook é suspenso e o administrador do cliente recebe um e-mail avisando. Quando o problema no endereço for corrigido, o webhook pode ser reativado pelo próprio cliente na área de integrações do portal.

## Privacidade dos dados

As posições detalhadas de GPS ficam guardadas por 180 dias. Depois disso, o sistema mantém apenas um resumo da rota. Os eventos de rastreamento e os comprovantes de entrega ficam guardados por 5 anos.

Pedidos de acesso, correção ou exclusão de dados pessoais devem ser registrados em Configurações, Privacidade, Solicitações, e são respondidos em até 15 dias. Dados ligados a documentos fiscais não podem ser excluídos antes do prazo legal de guarda.
