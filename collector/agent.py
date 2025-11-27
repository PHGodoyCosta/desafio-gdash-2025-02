from openai import OpenAI
from dotenv import load_dotenv
import json

load_dotenv()

class Agent:
    def __init__(self):
        self.client = OpenAI()
        self.model = "gpt-4.1"
    
    def generate_insights(self, cargo):
        self.prompt = open("prompt.txt", "r+").read()
        self.prompt = self.prompt.replace(r"{{ cargo }}", cargo)
        
        with open("prompt.txt", "w") as f:
            f.write(self.prompt)
        
        response = self.client.chat.completions.create(
            model=self.model,
            messages=[{"role": "user", "content": self.prompt}],
            temperature=1
        )
        
        output = response.choices[0].message.content
        
        return json.loads(output)
    
if __name__ == "__main__":
    starter = Agent()
    