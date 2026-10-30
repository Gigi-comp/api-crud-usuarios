# api-crud-usuarios
API REST backend de gerenciamento de usuários com Node.js, TypeScript, TypeORM e SQLite

# 📋 API REST — CRUD de Usuários
API REST backend para gerenciamento de usuários desenvolvida com Node.js, TypeScript, Express, TypeORM, Zod e SQLite.
Projeto acadêmico desenvolvido para a disciplina de frameworks backend (node.js e nest.js)
**Autora:** Gislaine Rodrigues

-----------------------------------------------------------------

Pedro Henrique Gonçalvez de Souza - RA: 250275
Gislaine Rodrigues da Silveira  -RA: 250385



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
-----------------------------------------------------------------

## Infraestrutura
# Deploy e CI/CD – API Gateway

## Sobre o projeto

Este projeto utiliza Docker para executar a aplicação em um container e GitHub Actions para automatizar processos por meio de um Self-hosted Runner configurado em um servidor Ubuntu.

A infraestrutura foi montada utilizando uma máquina virtual no VirtualBox, com Ubuntu Server, Docker e integração com o GitHub Actions.

## Tecnologias utilizadas

- Ubuntu Server
- VirtualBox
- Docker
- Docker Compose
- GitHub Actions
- Self-hosted Runner
- Node.js

## 1. Configuração do ambiente

Para configurar o ambiente de execução, foi criada uma máquina virtual utilizando o VirtualBox.

As etapas realizadas foram:

1. Criação de uma máquina virtual no VirtualBox.
2. Instalação do Ubuntu Server.
3. Preparação do sistema para executar o Docker e o Self-hosted Runner.
4. Configuração do ambiente para comunicação com o GitHub.

## 2. Configuração do GitHub Actions Runner

Foi configurado um **Self-hosted Runner** para conectar o servidor Ubuntu ao repositório GitHub.

Diferentemente dos runners hospedados pelo próprio GitHub, o Self-hosted Runner permite utilizar uma máquina própria para executar os workflows.

### Etapas de configuração

1. Acessar o repositório no GitHub.
2. Navegar até `Settings → Actions → Runners`.
3. Selecionar `New self-hosted runner`.
4. Escolher Linux como sistema operacional.
5. Executar os comandos de instalação e configuração fornecidos pelo GitHub no terminal do Ubuntu Server.
6. Iniciar o runner para estabelecer a conexão com o repositório.

Após a configuração, o servidor Ubuntu passa a aparecer como um runner associado ao repositório.

## 3. Containerização com Docker Compose

A aplicação foi configurada para executar em um container Docker, utilizando o Docker Compose para gerenciar sua construção e execução.

As configurações estão definidas no arquivo `docker-compose.yml`:

### Descrição das configurações

| Configuração | Descrição |
|---|---|
| Build | Constrói a imagem utilizando o Dockerfile localizado em `src/`. |
| Container | Define o nome do container como `apiGateway`. |
| Volumes | Mapeia a pasta `src` para `/var/www/html` dentro do container. |
| Node modules | Mantém os módulos do Node.js em um volume separado. |
| Portas | Disponibiliza a porta `3001` da aplicação. |
| Restart | Configura a reinicialização automática do container. |

### Comandos Docker

Para construir a imagem e iniciar o container:

```bash
docker compose up -d --build
```

Para verificar os containers em execução:

```bash
docker compose ps
```

Para visualizar os logs:

```bash
docker compose logs -f
```

Para parar a aplicação:

```bash
docker compose down
```

## 4. Problema de sincronização de data e hora

Durante a configuração do Self-hosted Runner, ocorreu um problema de conexão com o GitHub.

Mesmo após realizar novamente a configuração do runner, a conexão não era estabelecida e o seguinte erro aparecia nos logs:

```text
Failed to create a session.
The runner registration has been deleted from the server.
```

### Identificação do problema

Após analisar os logs do runner, foi identificado que o relógio do Ubuntu Server estava atrasado em aproximadamente 35 a 40 minutos em relação ao horário do servidor do GitHub.

Essa diferença fazia com que o token de autenticação utilizado pelo runner fosse considerado expirado pelo servidor do GitHub, impedindo o estabelecimento da conexão.

### Solução

Foi necessário corrigir a sincronização de data e hora do Ubuntu Server, habilitando a sincronização automática por meio do NTP (Network Time Protocol).

Comandos utilizados:

```bash
# Verificar data e hora do sistema em UTC
date -u

# Verificar o status da sincronização
timedatectl status

# Habilitar sincronização automática
sudo timedatectl set-ntp true

# Reiniciar o serviço de sincronização
sudo systemctl restart systemd-timesyncd
```

Após a sincronização do relógio, a diferença de horário que causava a expiração dos tokens pôde ser corrigida.


## 5. Estrutura do fluxo de execução

A infraestrutura configurada pode ser representada pelo seguinte fluxo:

```text
          GitHub Repository
                  |
                  v
           GitHub Actions
                  |
                  v
          Self-hosted Runner
                  |
                  v
             Ubuntu Server
              (VirtualBox)
                  |
                  v
             Docker Compose
                  |
                  v
             Docker Container
                apiGateway
                  |
                  v
              API - Port 3001
```

## 6. Considerações finais

A configuração permitiu integrar um servidor Ubuntu ao GitHub Actions por meio de um Self-hosted Runner e preparar a aplicação para execução em container Docker.

Durante o processo, também foi necessário identificar e corrigir um problema de sincronização de horário que afetava a autenticação do runner.

O projeto proporcionou a prática de conceitos relacionados a:

- Administração básica de servidores Linux.
- Virtualização com VirtualBox.
- Containerização com Docker.
- Gerenciamento de containers com Docker Compose.
- Integração contínua e automação com GitHub Actions.
- Configuração e manutenção de Self-hosted Runners.
- Diagnóstico de problemas de infraestrutura e autenticação.