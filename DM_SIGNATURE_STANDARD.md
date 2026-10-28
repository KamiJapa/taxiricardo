# DM Signature — padrão de entrega

## Princípios
Cada cliente recebe identidade própria. Reutilizar critérios de qualidade, não a aparência do Ricardo. A composição deve funcionar sem animação: oferta clara, fotografia verdadeira, tipografia legível e uma ação principal.

## Direção de arte e tipografia
Definir paleta e tokens antes de desenhar componentes. Alternar seções pela função: narrativa, serviços, demonstração e decisão. Evitar grades de cards por hábito. Textos de leitura em torno de 16 px; informações secundárias menores somente quando continuarem legíveis. Usar fontes locais ou de sistema com alternativas previsíveis.

## Responsividade e acessibilidade
Verificar 320, 375, 390, 430, 768, 1024, 1440 e 1920 px, além de reflow, teclado e movimento reduzido. Controles devem ter foco visível e nomes coerentes com seu texto. Menu e FAQ precisam de estados verificáveis. CTA fixo exige espaço reservado no rodapé. Executar axe e revisar manualmente: ausência de alertas automáticos não comprova conformidade integral WCAG.

## Performance
Preservar dimensões de imagens, srcset, formatos modernos e lazy loading fora da primeira dobra. Priorizar o recurso LCP. Medir Lighthouse em condições registradas; não confundir laboratório com tráfego real. Metas de referência: LCP ≤2,5 s, CLS ≤0,1 e INP ≤200 ms. INP precisa de observações de interações em campo; TBT não é substituto.

## Conversão e verdade comercial
Uma ação principal consistente. WhatsApp deve ter telefone e mensagem corretos também sem JavaScript. Não enviar mensagens durante QA. Disponibilidade, orçamento e confirmação devem corresponder ao atendimento real. Nunca inventar avaliações, preços, cobertura ou estatísticas.

## QA e entrega
- Instalação isolada por lockfile, build e testes com status real.
- Verificar links, âncoras, imagens, teclado, menu, FAQ, páginas auxiliares e ausência de erros de execução.
- Validar canonical, sitemap, schema e imagem social contra a URL confirmada.
- Revisar screenshots de desktop e mobile, incluindo imagens lazy após carregar.
- Registrar comparação com referência sem alegar superioridade não medida.
- Separar resultados medidos, julgamento editorial e pendências comerciais.
- Commit, push e deploy somente quando autorizados pelo cliente.

## Aprendizados do Ricardo
Aumentar textos secundários melhorou a leitura sem bibliotecas extras. Linhas editoriais diferenciam serviços sem repetir cards. O teste de privacidade antigo estava desatualizado; testes devem refletir comportamento real. Um HTTP 403 do proxy não prova que um site saiu do ar. Capturas completas exigem carregar as fotos lazy antes da inspeção. Ícones SVG evitam caracteres ausentes em fontes do ambiente.
