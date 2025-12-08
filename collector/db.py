from pymongo import MongoClient
from dotenv import load_dotenv
import os
from datetime import datetime, timedelta

class Db:
    def __init__(self):
        self.client = MongoClient(os.getenv("MONGO_CLIENT"))
        self.db = self.client[os.getenv("MONGO_DB")]
        self.collection = self.db["weatherdays"]
        
    def _format_date(self, date):
        day = date.day
        month = date.month
        
        if len(str(day)) == 1:
            day = f"0{day}"
        
        if len(str(month)) == 1:
            month = f"0{month}"
        
        return f"{date.year}-{month}-{day}"
    
    def verificar_dias_faltando(self):
        hoje = datetime.now().replace(hour=0, minute=0, second=0, microsecond=0)

        dias_esperados = [
            hoje + timedelta(days=i)
            for i in range(7)
        ]
    
        results = list(self.collection.find({
            "timestamp": {
                "$gte": dias_esperados[0],
                "$lt": dias_esperados[-1] + timedelta(days=1)
            }
        }))
        
        dias_registrados = {
            doc["timestamp"].replace(hour=0, minute=0, second=0, microsecond=0)
            for doc in results
        }

        dias_faltando = [
            dia for dia in dias_esperados
            if dia not in dias_registrados
        ]
        
        if len(dias_faltando) < 1:
            return {
                "refresh": False
            }
        
        start_date = dias_faltando[0]
        end_date = dias_faltando[len(dias_faltando) - 1]

        return {
            "refresh": True,
            "start_date": self._format_date(start_date),
            "end_date": self._format_date(end_date)
        }
        

if __name__ == "__main__":
    load_dotenv()
    
    starter = Db()
    r = starter.verificar_dias_faltando()
    print(r)
    