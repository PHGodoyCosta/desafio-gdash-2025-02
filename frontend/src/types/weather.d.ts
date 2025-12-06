export type WeatherDayLogsType = {
    hash: string,
    city: string,
    latitude: number,
    longitude: number,
    churrascometro: string,
    insight: string,
    insightEnergia: string,
    energiaProduzida: string,
    timestamp: Date,
    temperature: number,
    humidity: number,
    wind_speed: number,
    weather_code: number,
    precipitation_probability: number
}

export type WeatherLogsType = {
    hash: string
    city: string
    latitude: number
    longitude: number
    timestamp: Date
    temperature: number
    humidity: number
    wind_speed: number
    weather_code: number
    precipitation_probability: number
}
