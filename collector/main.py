from apscheduler.schedulers.background import BackgroundScheduler
import time
import pika
from scrapper import Scrapper
from agent import Agent

class Collector:
    def __init__(self):
        self.scrapper = Scrapper()
        self.agent = Agent()
        
    def renew_temperature_times():
        pass
    
    def send_newsletter():
        pass
    
    
if __name__ == "__main__":
    starter = Collector()
    scheduler = BackgroundScheduler()
    scheduler.add_job(starter.renew_temperature_times, 'interval', hours=1)
    scheduler.add_job(starter.send_newsletter, 'interval', hours=24)
    
    scheduler.start()

    try:
        while True:
            time.sleep(1)
    except KeyboardInterrupt:
        scheduler.shutdown()
    