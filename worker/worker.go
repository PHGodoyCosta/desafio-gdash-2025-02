package main

import (
	"bytes"
	"fmt"
	"net/http"
	"time"
)

const url = "http://127.0.0.1:3001/api/weather/logs"

func Worker(msg string) {
	
	body := []byte(msg)

	client := &http.Client{
		Timeout: 10 * time.Second,
	}

	req, err := http.NewRequest("POST", url, bytes.NewBuffer(body))
	if err != nil {
		fmt.Println("Erro ao criar requisição:", err)
		return
	}

	req.Header.Set("Content-Type", "application/json")

	resp, err := client.Do(req)
	if err != nil {
		fmt.Println("Erro ao enviar POST:", err)
		return
	}
	defer resp.Body.Close()

	fmt.Printf("Requisição enviada! Status: %v\n", resp.Status)
}

