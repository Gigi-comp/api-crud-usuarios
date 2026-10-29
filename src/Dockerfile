FROM node:24-alpine

WORKDIR /var/www/html

# 1. Copia apenas os arquivos de mapeamento de dependências
COPY package*.json ./

# 2. Instala as dependências diretamente no ambiente Linux do container
RUN npm install

# 3. Copia o restante do código do projeto (depois de instalar)
COPY . .

# 4. Define a porta ou o comando de inicialização
CMD ["npm", "run", "dev"]
