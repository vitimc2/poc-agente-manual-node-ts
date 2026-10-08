FROM node:24.21-slim

WORKDIR /suporte-poc

COPY ./package.json ./package-lock.json ./
RUN npm ci --omit=dev

COPY ./docs/ ./docs
COPY ./app/ ./app
COPY ./web/ ./web

ENV ANTHROPIC_MODEL=claude-haiku-4-5
ENV DATABASE_URL=postgresql://poc:poc@db:5432/suporte
ENV API_PORT=3000
ENV MCP_URL=http://host.docker.internal:3333/mcp

EXPOSE 3000

CMD ["npm", "run", "start-api"]
