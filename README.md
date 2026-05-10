# 🌙 NiteLog

Um sistema de gerenciamento de tarefas no estilo Kanban, projetado com foco em performance, segurança e arquitetura modular para otimizar os processos ágeis e o fluxo de trabalho.

## 🛠️ Tecnologias Utilizadas

Este projeto adota a arquitetura de **Monorepo**, gerenciado via `pnpm workspaces`, separando claramente as responsabilidades de Frontend e Backend.

### Frontend
- **Framework:** React + TypeScript
- **Build Tool:** Vite
- **Estilização:** Tailwind CSS
- **Requisições:** Axios
- **Rotas:** React Router Dom

### Backend
- **Linguagem:** Go (Golang)
- **Banco de Dados:** PostgreSQL
- **Autenticação:** JWT via HTTP-Only Cookies estritos.
- **Segurança:** Bcrypt para hash de senhas, CORS configurado para proteção de origens.

### Infraestrutura & DevOps
- **Contêineres:** Docker & Docker Compose
- **Integração Contínua (CI):** GitHub Actions (Linting e Build separados para Frontend e Backend)

---

## 🚀 Como Rodar o Projeto Localmente

Siga os passos abaixo para configurar o ambiente de desenvolvimento na sua máquina.

### 1. Pré-requisitos
Certifique-se de ter as seguintes ferramentas instaladas:
- [Node.js](https://nodejs.org/) (versão 20 ou superior)
- [pnpm](https://pnpm.io/installation) (`npm install -g pnpm`)
- [Go](https://go.dev/) (versão 1.21 ou superior)
- [Docker e Docker Compose](https://www.docker.com/)

### 2. Clonando o Repositório
```bash
git clone https://github.com/GabrielVenas0/nitelog.git
cd nitelog
code .
```
### 3. Configurando as Variáveis de Ambiente
Na raiz do projeto, renomeie o arquivo .env.example para .env ou crie um novo arquivo .env com a seguinte estrutura presente no .env.example

### 4. Subindo o Banco de Dados (Docker)
Inicie o contêiner do PostgreSQL em background. Na primeira execução, os scripts SQL de migração e seeding serão aplicados automaticamente.
```bash
docker compose up -d
```

### 5. Instalando Dependências
O pnpm instalará simultaneamente as dependências do painel e do frontend graças ao Workspace.
```bash
pnpm install
```

### 6. Executando o Ambiente de Desenvolvimento

Ele iniciará o backend em Go na porta 8080 e o Vite na porta 5173 paralelamente. OBS: O container do docker deve estar ligado, para que a DataBase esteja pronta.
```bash
pnpm dev
```
