const express = require('express');
const client = require('prom-client');

const app = express();
const register = new client.Registry();

// Criar métrica simples
const helloCounter = new client.Counter({
  name: 'hello_requests_total',
  help: 'Número de requisições para /hello'
});

// Registrar métrica
register.registerMetric(helloCounter);

// Rota de exemplo
app.get('/hello', (req, res) => {
  helloCounter.inc(); // incrementa contador
  res.send('Hello World!');
});

// Endpoint de métricas
app.get('/metrics', async (req, res) => {
  res.set('Content-Type', register.contentType);
  res.end(await register.metrics());
});

app.listen(3000, () => {
  console.log('Server rodando em http://localhost:3000');
});