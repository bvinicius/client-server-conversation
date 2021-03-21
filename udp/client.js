const udp = require('dgram');
const fs = require('fs');

const client = udp.createSocket('udp4');

const data = fs.readFileSync('clientdata.txt')

client.send(data, 2222, 'localhost', function (error) {
    if (error) {
        console.log(error)
        client.close();
    } else {
        console.log('Mensagem enviada ao servidor.\n');
    }
});

client.on('message', function (data, _) {
    const message = data.toString()
    console.log(` > Servidor diz: ${message}`);
});