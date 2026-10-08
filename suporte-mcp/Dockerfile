FROM node:24.21-slim

WORKDIR /suporte-mcp

COPY ./package.json ./package-lock.json ./
RUN npm ci --omit=dev

COPY ./src/ ./src

ENV MCP_PORTA=3333

EXPOSE 3333

CMD ["npm", "run", "start"]
