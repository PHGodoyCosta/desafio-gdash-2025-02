from apscheduler.schedulers.background import BackgroundScheduler
import time
import pika
from scrapper import Scrapper
from agent import Agent

class Collector:
    def __init__(self):
        self.scrapper = Scrapper()
        self.agent = Agent()
        
    def connect_rabbit(self):
        while True:
            try:
                self.connection = pika.BlockingConnection(
                    pika.ConnectionParameters(host='localhost')
                )
                
                self.channel = self.connection.channel()
                break
            except:
                print("RabbitMQ não está pronto ainda, tentando de novo...")
                time.sleep(2)
        
    def renew_temperature_times(self):
        try:
            print("Vou renovar a temperatura!")
            temperature = self.scrapper.get_temperature_data()
            
            self.channel.queue_declare(queue='worker', durable=True)
            self.channel.basic_publish(
                exchange='',
                routing_key='worker',
                body=str(temperature)
            )
        except Exception as error:
            raise error
            print(f"Erro ao renovar a temperatura!")
    
    def send_newsletter(self):
        pass
    
    
if __name__ == "__main__":
    starter = Collector()
    
    starter.connect_rabbit()
    
    scheduler = BackgroundScheduler()
    scheduler.add_job(starter.renew_temperature_times, 'interval', hours=0.002)
    scheduler.add_job(starter.send_newsletter, 'interval', hours=24)
    
    scheduler.start()

    try:
        while True:
            time.sleep(1)
    except KeyboardInterrupt:
        scheduler.shutdown()
    