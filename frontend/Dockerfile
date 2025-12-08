FROM node:20-alpine AS build

# 2️⃣ Diretório de trabalho dentro do container
WORKDIR /app

# 3️⃣ Copia apenas arquivos de dependência
COPY package*.json ./

# 4️⃣ Instala dependências
RUN npm install

# 5️⃣ Copia o restante do projeto
COPY . .

# 6️⃣ Build do React (Vite)
RUN npm run build

# Produção com Nginx

FROM nginx:alpine

# Remove config padrão
RUN rm /etc/nginx/conf.d/default.conf

# Copia config customizado
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copia build do Vite
COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
