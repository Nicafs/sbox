console.log('Carregando .env ...');

const fs = require('fs');

try {
  const secretJson = JSON.parse(fs.readFileSync('secret.json', 'utf8'));
  const data = Object.keys(secretJson)
    .map(k => `${k}=${secretJson[k]}`)
    .join('\n');
  fs.writeFileSync('.env', data);
  console.log('.env carregado com sucesso!');
} catch (err) {
  console.error(err);
  console.log('Erro ao carregar .env!');
}
