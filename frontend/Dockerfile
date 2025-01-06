# Escolha a imagem base
FROM node:20.14.0-alpine

# Defina o diretório de trabalho
WORKDIR /app

# Copie apenas o package.json e o package-lock.json primeiro
COPY package*.json ./

# Instale as dependências
RUN npm ci 

# Copie o restante dos arquivos (evita reinstalações de dependências desnecessárias)
COPY . .

# Exponha a porta 3000
EXPOSE 3001

# Comando para iniciar o servidor
CMD ["npm", "run", "dev"]
