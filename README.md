# Desafio para o processo seletivo GDASH 2025/02

---

## ✅ Checklist rápido

- [x] Python coleta dados de clima (Open-Meteo ou OpenWeather)  
- [x] Python envia dados para a fila  
- [x] Worker Go consome a fila e envia para a API NestJS  
- [ ] API NestJS:
  - [x] Armazena logs de clima em MongoDB  
  - [x] Exponde endpoints para listar dados  
  - [ ] Gera/retorna insights de IA (endpoint próprio)  
  - [x] Exporta dados em CSV/XLSX  
  - [x] Implementa CRUD de usuários + autenticação  
  - [x] (Opcional) Integração com API pública paginada  
- [ ] Frontend React + Vite + Tailwind + shadcn/ui:
  - [] Dashboard de clima com dados reais  
  - [] Exibição de insights de IA  
  - [] CRUD de usuários + login  
  - [ ] (Opcional) Página consumindo API pública paginada  
- [ ] Docker Compose sobe todos os serviços  
- [x] Código em TypeScript (backend e frontend)  
- [ ] Vídeo explicativo (máx. 5 minutos)  
- [ ] Pull Request via branch com seu nome completo  
- [ ] README completo com instruções de execução  
- [x] Logs e tratamento de erros básicos em cada serviço  
