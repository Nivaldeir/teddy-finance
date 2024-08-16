# Etapa de Build
FROM node:alpine AS builder
WORKDIR /usr/app
COPY package*.json ./
RUN npm install
COPY . .

# Compilar o TypeScript para JS
RUN npm run build

# Etapa de Produção
FROM node:alpine
WORKDIR /usr/app
COPY --from=builder /usr/app/dist ./dist
COPY --from=builder /usr/app/package.json ./package.json
COPY --from=builder /usr/app/init.sql ./init.sql
COPY --from=builder /usr/app/src ./src

# Executa a migração
CMD ["npm", "run", "dev"]
