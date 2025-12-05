import requests
from datetime import datetime

class Scrapper:
    def __init__(self):
        self.api = "https://api.open-meteo.com"
        # Latiude e Longitude de Nova Alvorada do Sul
        self.latitudeNAS = -21.4643
        self.longitudeNAS = -54.3842
    
    def get_temperature_data(self, start_date, end_date, lat="", long=""):
        lat = lat if lat else self.latitudeNAS
        long = long if long else self.longitudeNAS
        
        req = requests.get(f"{self.api}/v1/forecast?timezone=America%2FCampo_Grande&latitude={lat}&longitude={long}&hourly=temperature_2m,precipitation_probability,wind_speed_10m,shortwave_radiation,relative_humidity_2m,weather_code&start_date={start_date}&end_date={end_date}")
        
        if req.status_code == 200:
            return req.json()
        
        return { "status": "error" }
    
    def get_daily_temperature_data(self, start_date, end_date, lat="", long=""):
        lat = lat if lat else self.latitudeNAS
        long = long if long else self.longitudeNAS
        
        req = requests.get(f"{self.api}/v1/forecast?timezone=America%2FCampo_Grande&latitude={lat}&longitude={long}&daily=temperature_2m_max,temperature_2m_min,relative_humidity_2m_mean,weather_code,precipitation_probability_max,wind_speed_10m_max,shortwave_radiation_sum&start_date={start_date}&end_date={end_date}")
        
        if req.status_code == 200:
            return req.json()
        
        return { "status": "error" }
    
    
if __name__ == "__main__":
    starter = Scrapper()
    result = starter.get_temperature_data("2025-12-5", "2025-12-11")

    print(result)
    