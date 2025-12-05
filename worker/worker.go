package main

import (
	"bytes"
	"fmt"
	"net/http"
	"log"
	"os"
	"encoding/json"
	"io"
)

type LoginResponse struct {
	Status int
	Token string
}

func loginAdmin() (LoginResponse, error) {
	body := map[string]string{
        "email":    os.Getenv("ADMIN_EMAIL"),
        "password": os.Getenv("ADMIN_PASSWORD"),
    }

    jsonData, err := json.Marshal(body)
    if err != nil {
        log.Fatalln("[Error] Erro ao converter JSON:", err)
    }

    res, err := http.Post(
        fmt.Sprintf("%s/api/auth/login", os.Getenv("API_URL")),
        "application/json",
        bytes.NewBuffer(jsonData),
    )
    if err != nil {
        log.Fatalln("[Error] Erro ao fazer requisição:", err)
    }

    defer res.Body.Close()

    responseBody, err := io.ReadAll(res.Body)
    if err != nil {
        log.Fatalln("[Error] Erro ao ler resposta:", err)
    }

	var data map[string]interface{}
	err = json.Unmarshal(responseBody, &data)
	if err != nil {
		log.Fatalln("[Error] Erro ao transformar JSON:", err)
	}

	token := data["token"].(string)

	return LoginResponse{
		Status: res.StatusCode,
		Token:  token,
	}, nil
}

func organizeDataLog(content string) (string) {
	var data map[string]interface{}

	err := json.Unmarshal([]byte(content), &data)
	if err != nil {
		log.Fatalln("[Error] (Data) Não consegui organizar os dados do OpenMeteo", err)
	}

	hourlyRaw, ok := data["hourly"].(map[string]interface{})
	if !ok {
		log.Fatalln("[Error] (Hourly) Não consegui organizar os dados do OpenMeteo", err)
	}

	newHourly := make(map[string]interface{})

	for key, value := range hourlyRaw {
		switch key {

		case "wind_speed_10m":
			newHourly["wind_speed"] = value

		case "relative_humidity_2m":
			newHourly["humidity"] = value

		default:
			newHourly[key] = value
		}
	}

	filtered := map[string]interface{}{
		"latitude":  data["latitude"],
		"longitude": data["longitude"],
		"city":      "Nova Alvorada do Sul",
		"hourly":    newHourly,
	}

	output, err := json.MarshalIndent(filtered, "", "  ")
	if err != nil {
		log.Fatalln("[Error] (Marshal) Não consegui organizar os dados do OpenMeteo", err)
	}

	return string(output)
}

func organizeDataDaily(content string) (string) {
	var data map[string]interface{}

	err := json.Unmarshal([]byte(content), &data)
	if err != nil {
		log.Fatalln("[Error] (Unmarshal Data) Não consegui organizar os dados do OpenMeteo", err)
	}

	dailyRaw, ok := data["daily"].(map[string]interface{})
	if !ok {
		log.Fatalln("[Error] (Daily Data) Não consegui organizar os dados do OpenMeteo", err)
	}

	newDaily := make(map[string]interface{})

	for key, value := range dailyRaw {
		switch key {
			case "wind_speed_10m_max":
				newDaily["wind_speed"] = value

			case "relative_humidity_2m_mean":
				newDaily["humidity"] = value
			
			case "temperature_2m_max":
				newDaily["temperature"] = value
			
			case "shortwave_radiation_sum":
				newDaily["shortwave_radiation"] = value

			case "precipitation_probability_max":
				newDaily["precipitation_probability"] = value

			default:
				newDaily[key] = value
		}
		
		delete(newDaily, "temperature_2m_min")
	}

	filtered := map[string]interface{}{
		"latitude":  data["latitude"],
		"longitude": data["longitude"],
		"city":      "Nova Alvorada do Sul",
		"daily":    newDaily,
	}

	output, err := json.MarshalIndent(filtered, "", "  ")
	if err != nil {
		log.Fatalln("[Error] (Marshal Data) Não consegui organizar os dados do OpenMeteo", err)
	}

	return string(output)
}

func Worker(msg string, queueType string) {
	var url string
	var data string

	switch queueType {
		case "log":
			url = fmt.Sprintf("%s/api/weather/logs", os.Getenv("API_URL"))
			data = organizeDataLog(msg)
		case "daily":
			url = fmt.Sprintf("%s/api/weather/day/logs", os.Getenv("API_URL"))
			data = organizeDataDaily(msg)
	}
	
	credencial, err := loginAdmin()
	if err != nil {
		log.Fatalln("Erro ao logar como admin", err)
	}

	response, err := sendLog(data, credencial.Token, url)
	if err != nil {
		log.Fatalln("Erro ao enviar os dados para a API", err)
	}

	fmt.Println(response)
	
}

func sendLog(jsonStr string, token string, url string) (string, error) {
	reqBody := bytes.NewBuffer([]byte(jsonStr))

	req, err := http.NewRequest("POST", url, reqBody)
	if err != nil {
		return "", err
	}

	req.Header.Set("Content-Type", "application/json")
	req.Header.Set("Authorization", "Bearer " + token)

	client := &http.Client{}
	resp, err := client.Do(req)
	if err != nil {
		return "", err
	}

	defer resp.Body.Close()

	bodyBytes, err := io.ReadAll(resp.Body)
	if err != nil {
		return "", err
	}

	return string(bodyBytes), nil
}
