# Auditoria e refinamento

## Ciclo 1 — Identidade e sistema visual

- **Critério:** preservar a marca CVC e aplicar a linguagem de interface do design system fornecido sem reproduzir a identidade da Airbnb.
- **Refinamento:** logotipo CVC local, amarelo nos destaques, tela clara, tipografia compacta com fontes de sistema, cartões arredondados, sombras leves e foco visível. As fotos são reais, licenciadas e identificadas como ilustrativas; os créditos e fontes estão em [creditos.md](./creditos.md).
- **Verificação:** páginas renderizadas no navegador integrado; imagens locais decodificadas sem falhas.

## Ciclo 2 — Navegação e responsividade

- **Critério:** verificar menu, teclado, navegação e largura em telas compactas e desktop.
- **Refinamento:** menu móvel com `aria-expanded`/`aria-controls`, fechamento por Escape e clique fora, além de bloqueio de rolagem enquanto aberto.
- **Verificação:** viewport de 390 × 844 px — menu abriu e fechou por Escape, a rolagem foi liberada ao fechar e não houve overflow horizontal. As oito páginas também foram verificadas em 768 × 900 px (tablet) e 1280 × 900 px (desktop), sem overflow ou H1 ausente/duplicado.

## Ciclo 3 — Conteúdo e funcionalidades

- **Critério:** conferir rotas, destinos filtráveis, validação do formulário, consistência dos dados e estados sem ofertas confirmadas.
- **Refinamento:** ofertas e pacotes não exibem preços, datas nem disponibilidade fictícios; os horários são indicados como pendentes de confirmação. O formulário gera uma mensagem revisável no WhatsApp e não simula reserva ou envio concluído.
- **Verificação:** oito páginas obrigatórias e página 404 carregadas, cada uma com título, H1 e navegação; zero links internos ou fragmentos ausentes, imagens quebradas ou erros de execução. Filtro nacional exibiu quatro destinos, busca por “joão” exibiu um, estado vazio apareceu para busca sem correspondência e “Todos” restaurou oito. Formulário vazio foi bloqueado e o envio preenchido produziu o link WhatsApp esperado usando uma rota de teste interceptada, sem contatar a unidade.

## Limitações para publicação

- Não há integração com catálogo, inventário, reservas, pagamentos ou sistema de ofertas; preços, disponibilidade e condições devem ser confirmados com a unidade.
- Horários informados nos materiais precisam de confirmação antes de publicação.
- A disponibilidade local das categorias de serviços deve ser confirmada diretamente com a unidade.
- O formulário abre o WhatsApp para revisão e envio pelo visitante; não encaminha nem armazena dados no site.
