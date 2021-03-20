const net = require('net');
const fs = require('fs');

const client = new net.Socket();

client.connect(1234, '127.0.0.1', function () {
    console.log('Connected');

    const data = fs.readFileSync('clientdata.txt')
    client.write(data)
});

client.on('data', function (data) {
    const message = data.toString()
    console.log(`Servidor diz: ${message}`);
});

client.on('close', function () {
    console.log('Cliente fechado');
});