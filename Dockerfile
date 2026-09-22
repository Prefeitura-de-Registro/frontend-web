
# Build da Aplicação (Node.js)
FROM node:20-alpine AS builder

WORKDIR /app

# Copia apenas os arquivos de dependência primeiro (melhora o cache do Docker)
COPY package*.json ./

# Instala as dependências
RUN npm ci

# Copia o restante do código
COPY . .

# Roda o build do Vite (gera a pasta /dist)
RUN npm run build


# Segunda parte: Servidor Web de Produção (NGINX)

FROM nginx:alpine

# Remove a configuração padrão do NGINX
RUN rm /etc/nginx/conf.d/default.conf

# Copia a sua configuração customizada do NGINX
COPY nginx.conf /etc/nginx/conf.d/

# Copia APENAS a pasta /dist gerada no Estágio 1 para dentro do NGINX
COPY --from=builder /app/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]