package main

import (
	"fmt"
	"log"
	"github.com/joho/godotenv"
	"os"
	amqp "github.com/rabbitmq/amqp091-go"
)

func main() {
	err := godotenv.Load()
	if err != nil {
		log.Fatalf("Erro ao carregar .env: %v", err)
	}

	go consumer(os.Getenv("QUEUE_LOG_NAME"), "log")
	go consumer(os.Getenv("QUEUE_DAILY_NAME"), "daily")

	//Para não parar de rodar
	select {}
}

func consumer(queueName string, queueType string) {
	conn, err := amqp.Dial(os.Getenv(("RABBIT_URL")))
	if err != nil {
		log.Fatalf("[Error] Erro ao conectar ao RabbitMQ: %v", err)
	}
	defer conn.Close()

	ch, err := conn.Channel()
	if err != nil {
		log.Fatalf("[Error] Erro ao abrir canal: %v", err)
	}
	defer ch.Close()

	_, err = ch.QueueDeclare(
		queueName,
		true,  // durable
		false, // auto-delete
		false, // exclusive
		false, // no-wait
		nil,   // args
	)

	if err != nil {
		log.Fatalf("[Error] Erro ao declarar fila: %v", err)
	}

	msgs, err := ch.Consume(
		queueName,
		"",    // consumer tag
		false, // auto-ack
		false, // exclusive
		false, // no-local
		false, // no-wait
		nil,
	)
	if err != nil {
		log.Fatalf("[Error] Erro ao iniciar consumo: %v", err)
	}

	fmt.Printf("[RabbitMQ] Esperando resultados do %s...\n", queueName)

	// Loop principal
	for msg := range msgs {
		switch queueType {
			case "log":
				fmt.Println("[Log] WeatherLog Recebido")
				Worker(string(msg.Body), "log")
			case "daily":
				fmt.Println("[Log] WeatherDay Recebido")
				Worker(string(msg.Body), "daily")
		}

		msg.Ack(false)
	}
}
