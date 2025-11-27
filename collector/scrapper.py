import requests
from datetime import datetime

class Scrapper:
    def __init__(self):
        self.api = "https://api.open-meteo.com"
        
        # Latiude e Longitude de Nova Alvorada do Sul
        self.latitudeNAS = -21.4643
        self.longitudeNAS = -54.3842
    
    def get_temperature_data(self, lat="", long=""):
        lat = lat if lat else self.latitudeNAS
        long = long if long else self.longitudeNAS
        
        req = requests.get(f"{self.api}/v1/forecast?hourly=temperature_2m&latitude={lat}&longitude={long}&timezone=America/Campo_Grande")
        
        if req.status_code == 200:
            return req.json()
        
        return { "status": "error" }
        
    def get_irradiacao_solar(self, lat="", long=""):
        lat = lat if lat else self.latitudeNAS
        long = long if long else self.longitudeNAS
        
        req = requests.get(f"{self.api}/v1/forecast?latitude={lat}&longitude={long}&hourly=direct_radiation,shortwave_radiation&forecast_days=1&timezone=America/Campo_Grande")
        
        if req.status_code == 200:
            return req.json()
        
        return { "status": "error" }
    
    
if __name__ == "__main__":
    starter = Scrapper()
    result = starter.get_temperature_data()
    for i in range(0, len(result["hourly"]["time"])):
        time = result["hourly"]["time"][i]
        temperature = result["hourly"]["temperature_2m"][i]
        
        time = datetime.fromisoformat(time)
        print(f"{time.day}/{time.month} -> {time.hour}:{time.minute} --> {temperature}°C")
        
    #print(result)
    