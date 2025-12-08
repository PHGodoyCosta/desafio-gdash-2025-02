# 🌤️ GDash – Plataforma de Monitoramento Climático

GDash é uma aplicação full stack para coleta, processamento e visualização de dados climáticos, utilizando **Open-Meteo**, **RabbitMQ**, **MongoDB**, **NestJS**, **React (Vite)**, **Python** e **Go**.

---

## 🌐 Projeto em produção!



## 🧱 Arquitetura Geral

* **Frontend**: React + Vite (servido via Nginx)
* **API**: NestJS
* **Collector**: Python (coleta dados e publica no RabbitMQ)
* **Worker**: Go (consome filas, processa dados e envia para a API)
* **Mensageria**: RabbitMQ
* **Banco de dados**: MongoDB
* **Infra**: Docker + Docker Compose

---

## 📦 Requisitos

* Docker
* Docker Compose (v2 ou superior)
* Node.js (opcional, apenas para desenvolvimento local)
* Python 3.10+ (opcional)
* Go 1.21+ (opcional)

---

## 🚀 Como rodar tudo via Docker Compose

### 1️⃣ Clone o repositório

```
git clone https://github.com/PHGodoyCosta/desafio-gdash-2025-02
cd desafio-gdash-2025-02
```

---

### 2️⃣ Configure os arquivos `.env`

Cada serviço possui seu próprio `.env`.

Os exemplos estão citados em `.env.example` em cada repositório.

⚠️ **Importante:**
Os valores devem ser compatíveis entre API, Worker e Collector.

---

### 3️⃣ Suba todos os serviços

```
docker compose up --build
```

Ou em segundo plano:

```
docker compose up -d --build
```

---

### 4️⃣ Parar os containers

```
docker compose down
```

---

## 🐍 Como rodar o serviço Python (Collector)

Para desenvolvimento local:

```
cd collector
pip3 install -r requirements.txt
python3 main.py
```

📌 Responsável por:

* Conferir as datas de busca para a API com Mongo
* Buscar dados da Open-Meteo
* Enviar os resultados para o Worker Go

---

## ⚙️ Como rodar o Worker Go

Para desenvolvimento local:

```
cd worker
go mod tidy
go run .
```

📌 Responsável por:

* Consumir filas do RabbitMQ
* Processar dados climáticos
* Autenticar como admin
* Enviar dados para a API
* Disparar envio de newsletter

---

## 🌐 URLs Principais

| Serviço                 | URL                                                    |
| ----------------------- | ------------------------------------------------------ |
| **Frontend**            | [http://localhost:3000](http://localhost:3000)         |
| **API**                 | [http://localhost:3001](http://localhost:3001)         |
| **RabbitMQ Management** | [http://localhost:15672](http://localhost:15672)       |
| **MongoDB**             | mongodb://mongo:27017                              |

---

## 🐰 RabbitMQ – Acesso

```
Usuário: dgdash-rabbit
Senha: definida no .env
```

---

## 👤 Usuário padrão (acesso inicial)

Criado automaticamente na inicialização do sistema:

```
Email: admin@admin.com
Senha: adMin@298&
```

Utilizado por:

* Frontend
* Worker Go
* Newsletter

---

## 🔐 Autenticação

* JWT
* Token armazenado em **HTTP-only cookie**
* Compatível com HTTPS (`secure: true` em produção)

---

## 📄 Documentação da API

Principais Rotas:

```
GET /api
```

---

## 🛠️ Tecnologias Utilizadas

* Backend: NestJS, TypeScript
* Frontend: React, Vite, React Router
* Mensageria: RabbitMQ
* Banco de dados: MongoDB
* Worker: Go
* Collector: Python
* Infra: Docker, Nginx
* SSL: Certbot / Let’s Encrypt (Para produção)

