
const udp = require('dgram');
const fs = require('fs');

// cria um socket para o cliente
const client = udp.createSocket('udp4');

// buffer da mensagem a ser enviada
// const data = Buffer.from('Olá, socket!');
const data = fs.readFileSync('data.txt')

client.on('message', function (msg, info) {
    console.log(`Mensagem recebida pelo server: ${msg.toString()}`);
    console.log(`Origem: ${info.address}:${info.port} \nTamanho dos dados: ${msg.length} \n`);
});

// enviando mensagem
client.send(data, 2222, 'localhost', function (error) {
    if (error) {
        client.close();
    } else {
        console.log('Data sent !!!');
    }
});