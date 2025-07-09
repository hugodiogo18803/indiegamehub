# 🎮 IndieGameHub

Marketplace _front-end_ para descobrir, avaliar e guardar jogos _indie_.  
Desenvolvido no âmbito da UC **Tecnologias para a Web e Dispositivos Móveis**.

---

## ✨ Funcionalidades

| Área                | Descrição                                                              |
| ------------------- | ---------------------------------------------------------------------- |
| **Discover**        | Pesquisa por nome + filtro por género (RAWG API) com _infinite scroll_ |
| **Wishlist**        | Adicionar/remover jogos (persistente por utilizador)                   |
| **Detalhe do Jogo** | Capa, descrição, screenshots, “jogos semelhantes”, botão Wishlist      |
| **Reviews**         | Modal com rating ⭐ + comentário, listagem pública                     |
| **Autenticação**    | _Signup/Login_ (JSON Server) → sessão guardada em `localStorage`       |
| **Tema Light/Dark** | Alternância instantânea e persistente                                  |
| **Acessibilidade**  | Navegação por teclado, foco visível, contraste AA                      |

---

## 🖥️ Stack

| Camada         | Tecnologia                               |
| -------------- | ---------------------------------------- |
| **Front-end**  | React + Vite + TypeScript                |
| UI             | Tailwind CSS 3 (class) + React-Hot-Toast |
| Estado global  | Zustand                                  |
| **Back-end**   | JSON Server (REST – free tier Render)    |
| 3rd-party Data | RAWG Video Games API                     |
| Testes         | Vitest + React Testing Library • Cypress |
| Code Quality   | ESLint Flat Config + jsx-a11y            |

---

## 🚀 Começar localmente

```bash
git clone https://github.com/hugodiogo18803/indiegamehub.git
cd indiegamehub
cp .env.local.example .env.local
npm install
```
