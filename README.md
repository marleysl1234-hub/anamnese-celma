# Anamnese Psicológica — Celma Soares da Cruz Luz

Aplicação web local (sem servidor, sem banco de dados) para preenchimento da
anamnese de investigação de neurodivergências, com geração de PDF profissional.

## Arquivos

- `index.html` — estrutura da aplicação
- `style.css` — identidade visual (dourado/branco-gelo, mobile-first)
- `app.js` — formulário, salvamento automático, assinatura
- `pdf.js` — geração do PDF final
- `manifest.json` + `sw.js` — permitem "Adicionar à Tela de Início" (PWA)
- `icons/logo-horizontal.svg` e `icons/logo-icon.svg` — identidade visual

## ⚠️ Importante: como testar

Esta aplicação usa `fetch()` (para desenhar a logo no PDF) e Service Worker
(para funcionar como PWA/offline). **Esses dois recursos exigem que os
arquivos sejam abertos via `http://` ou `https://`, e não diretamente com
duplo clique (`file://`)** — isso é uma restrição de segurança dos
navegadores, não um bug da aplicação. Sem servidor, o formulário e o PDF
ainda funcionam, mas a logo pode não aparecer no PDF e o modo PWA não ativa.

### Opção rápida (testar agora, no computador)

Com Python instalado, dentro da pasta do projeto:

```
python3 -m http.server 8000
```

Depois abra `http://localhost:8000` no navegador.

### Testar no iPhone

1. Publique a pasta em um serviço gratuito de hospedagem estática, por
   exemplo [Netlify Drop](https://app.netlify.com/drop) (arraste a pasta) ou
   GitHub Pages.
2. Abra o link gerado no Safari do iPhone.
3. Toque em **Compartilhar → Adicionar à Tela de Início** para instalar como
   um app.

## O que a aplicação faz

- Preenchimento por etapas (uma seção por vez), com barra de progresso.
- A maior parte das perguntas é respondida tocando em opções (rádio/checkbox),
  com campos abertos apenas onde a resposta precisa ser descritiva.
- Perguntas condicionais aparecem apenas quando fazem sentido (ex.: "Quais?"
  só aparece se a resposta anterior for "Sim").
- Salvamento automático no dispositivo (localStorage) a cada resposta — se a
  página fechar ou recarregar, a psicóloga pode continuar de onde parou.
- Tela de revisão com todas as respostas organizadas por seção, com botão
  "Editar" em cada bloco.
- Assinatura manuscrita em canvas (funciona com dedo, caneta ou mouse).
- Geração de PDF profissional com cabeçalho, logo, seções, respostas,
  assinatura, CRP, data, rodapé e numeração de páginas.
- Nome do arquivo: `Anamnese_Celma_Soares_NOME_DO_PACIENTE.pdf`.
- Nenhum dado é enviado para servidores externos, analytics ou APIs de IA.

## Próximos passos possíveis (não implementados nesta primeira versão)

- Ícones PNG dedicados (192px/512px) para melhor compatibilidade de ícone na
  Tela de Início do iPhone (hoje usa o SVG, que funciona mas tem suporte mais
  limitado no iOS do que PNG).
- Seções adicionais da anamnese além das 7 fornecidas até o momento — quando
  o restante do conteúdo original for enviado, elas podem ser incorporadas
  seguindo exatamente a mesma estrutura e identidade visual já criadas.
