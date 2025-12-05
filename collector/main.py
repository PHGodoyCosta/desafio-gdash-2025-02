from apscheduler.schedulers.background import BackgroundScheduler
import time
import pika
from dotenv import load_dotenv
import json
import os

load_dotenv()

from scrapper import Scrapper
from db import Db

class Collector:
    def __init__(self):
        self.scrapper = Scrapper()
        self.db = Db()
        
    def connect_rabbit(self):
        while True:
            try:
                self.connection = pika.BlockingConnection(
                    pika.ConnectionParameters(host=os.getenv("RABBITMQ_HOST"))
                )
                
                self.channel = self.connection.channel()
                break
            except:
                print("[Warning] RabbitMQ não está pronto ainda, tentando de novo...")
                time.sleep(2)
        
    def renew_temperature_times(self):
        try:
            print("[Log] Renovando a temperatura!")
            times = self.db.verificar_dias_faltando()
            temperature = self.scrapper.get_temperature_data(start_date=times["start_date"], end_date=times["end_date"])
            temperature_daily = self.scrapper.get_daily_temperature_data(start_date=times["start_date"], end_date=times["end_date"])
            
            self.channel.queue_declare(queue='worker', durable=True)
            self.channel.basic_publish(
                exchange='',
                routing_key='worker',
                body=json.dumps(temperature)
            )
            
            print("[Log] Enviei para o Worker")
            
            self.channel.queue_declare(queue='worker_daily', durable=True)
            self.channel.basic_publish(
                exchange='',
                routing_key='worker_daily',
                body=json.dumps(temperature_daily)
            )
            
            print("[Log] Enviei para o Worker Daily")
        except Exception as error:
            print(f"[Error] Erro ao renovar a temperatura!")
            raise error
    
    def main(self):
        self.connect_rabbit()
        self.renew_temperature_times()
        print("[Log] Fechando conexão com Rabbit e esperando a próxima chamada")
        self.connection.close()
    
    def wait_schedular(self):
        self.main()

        scheduler = BackgroundScheduler()

        scheduler.add_job(self.main, 'cron', hour=0, minute=0)

        scheduler.start()

        try:
            while True:
                time.sleep(1)
        except KeyboardInterrupt:
            scheduler.shutdown()
    
    
if __name__ == "__main__":
    starter = Collector()
    
    starter.wait_schedular()
    