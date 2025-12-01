const http = require('http');
const app = require('./app');
const config = require('./config');
const startBot = require('./bot');

const bot = startBot();
const server = http.createServer(app);

server.listen(config.port, () => {
  console.log(`API BiblePing escuchando en el puerto ${config.port}`);
  if (!bot) {
    console.log('El bot no se inició. Verifica BOT_TOKEN.');
  }
});
