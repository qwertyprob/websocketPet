# Базовый образ
FROM node:20-alpine

# Установка pnpm
RUN npm install -g pnpm

# Рабочая директория
WORKDIR /app

# Копируем только package.json и lock-файл, чтобы кэшировать зависимости
COPY package.json pnpm-lock.yaml ./

# Установка зависимостей
RUN pnpm install --frozen-lockfile

# Копируем весь проект
COPY . .

# Генерируем Prisma Client перед билдом
RUN pnpm prisma generate

# Билдим Next.js
RUN pnpm build

# Экспонируем порт
EXPOSE 3000

# Команда запуска
CMD ["pnpm", "start"]
