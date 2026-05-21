FROM node:20-alpine
RUN apk add --no-cache libc6-compat openssl
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci
COPY . .
RUN npx prisma generate && NODE_ENV=production npx next build
EXPOSE 3000
ENV PORT=3000
CMD ["npm", "start"]
