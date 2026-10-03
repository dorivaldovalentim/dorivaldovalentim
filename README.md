# Portfólio de Dorivaldo Valentim

Portfólio profissional bilingue (português/inglês) e currículo construídos com Nuxt 4, Vue 3, Bootstrap e Squidex CMS.

## Configuração

Crie um `.env` a partir do `.env.example` e preencha as credenciais do Squidex.

```bash
yarn install
yarn dev
```

O ambiente local fica disponível em `http://localhost:3000`.

## Build e deploy

```bash
yarn build
node .output/server/index.mjs
```

Defina as mesmas variáveis do `.env` na plataforma de deploy. O projecto também inclui um `Dockerfile` pronto para uma plataforma compatível com contentores.

## Conteúdo

Perfil, contactos, experiências, competências e projectos são geridos no Squidex. Experiências marcadas com `[EXEMPLO]` e links sociais genéricos são omitidos automaticamente do site público.

A preferência de idioma é guardada durante um ano no navegador. A interface e o conteúdo principal têm traduções locais; os futuros conteúdos editoriais do Squidex usam o texto publicado até serem adicionados campos localizados no CMS.
