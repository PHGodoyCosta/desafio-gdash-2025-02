FROM golang:1.25.4 AS builder

WORKDIR /app

COPY go.mod go.sum ./

RUN go mod download

COPY . .

# Build em binário
RUN CGO_ENABLED=0 GOOS=linux GOARCH=amd64 go build -o worker .

# Agora rodando o build do go
FROM alpine:latest

WORKDIR /app

COPY --from=builder /app/worker .

EXPOSE 8080

CMD ["./worker"]
