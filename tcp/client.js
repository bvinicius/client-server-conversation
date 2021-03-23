const net = require('net');
const fs = require('fs');

const client = new net.Socket();

client.connect(1234, '127.0.0.1', function () {
    console.log('Cliente conectado.');

    const data = fs.readFileSync('files/clientdata.txt')
    client.write(data)
    console.log('Mensagem enviada ao servidor.\n')
});

client.on('data', function (data) {
    const message = data.toString()
    console.log(` > Servidor diz: ${message}`);
});

client.on('close', function () {
    console.log('Cliente fechado');
});