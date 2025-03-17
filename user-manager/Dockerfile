FROM node:22-bookworm

WORKDIR /app

#build the project
COPY . /app

RUN npm install

RUN npx prisma generate

RUN npm run build

#run the project
CMD ["npm", "start"]