# api-crud-usuarios
API REST backend de gerenciamento de usuários com Node.js, TypeScript, TypeORM e SQLite

# 📋 API REST — CRUD de Usuários
API REST backend para gerenciamento de usuários desenvolvida com Node.js, TypeScript, Express, TypeORM, Zod e SQLite.
Projeto acadêmico desenvolvido para a disciplina de frameworks backend (node.js e nest.js)
**Autora:** Gislaine Rodrigues

-----------------------------------------------------------------

## 🚀 Tecnologias

- Node.js
- TypeScript
- Express
- TypeORM
- Zod
- SQLite3
- Dotenv

-----------------------------------------------------------------

## 📁 Estrutura do Projeto
src/
├── controllers/       # Recebe requisições e devolve respostas HTTP
├── services/          # Regras de negócio da aplicação
├── repositories/      # Acesso ao banco de dados
├── models/            # Entidades do sistema
├── database/
│   └── seeds/         # População inicial do banco
├── middlewares/       # Validação e tratamento de erros
├── migrations/        # Versionamento do banco de dados
├── routes/            # Definição das rotas da API
└── schema/            # Schemas de validação com Zod

-----------------------------------------------------------------

## ⚙️ Como rodar o projeto

### Pré-requisitos
- Node.js instalado
- npm instalado

### Instalação

```bash
git clone https://github.com/Gigi-comp/api-crud-usuarios.git
cd api-crud-usuarios
npm install
```

### Configuração

Crie um arquivo `.env` baseado no `.env.example`:

```env
PORT=3001
DB_DATABASE=database.sqlite
```

### Executar migrations

```bash
npm run migration:run
```

### Popular o banco (opcional)

```bash
npm run seed
```

### Iniciar o servidor

```bash
npm run dev
```

O servidor estará disponível em `http://localhost:3001`

-----------------------------------------------------------------

## 🛣️ Rotas da API

| Método | Rota | Descrição |
|--------|------|-----------|
| `POST` | `/user` | Cria um novo usuário |
| `GET` | `/user` | Lista todos os usuários |
| `GET` | `/user/:id` | Busca usuário por ID |
| `PUT` | `/user/:id` | Atualiza um usuário |
| `DELETE` | `/user/:id` | Deleta um usuário |

-----------------------------------------------------------------

## 📜 Scripts disponíveis

| Script | Descrição |
|--------|-----------|
| `npm run dev` | Inicia o servidor em modo desenvolvimento |
| `npm run build` | Compila o TypeScript |
| `npm run start` | Inicia o servidor compilado |
| `npm run migration:run` | Executa as migrations |
| `npm run migration:generate` | Gera uma nova migration |
| `npm run migration:revert` | Desfaz a última migration |
| `npm run seed` | Popula o banco com dados iniciais |
