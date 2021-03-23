const udp = require('dgram');
const fs = require('fs');

const server = udp.createSocket('udp4');

server.on('message', function (data, info) {
    const message = data.toString()
    console.log(` > Cliente diz: ${message}`);

    setTimeout(() => {
        const response = fs.readFileSync('files/serverdata.txt')
        server.send(response, info.port, '127.0.0.1', error => {
            console.log('Mensagem respondida ao cliente.\n');
        });
    }, 1000)
});

server.on('listening', function () {
    const { port, address, family } = server.address();

    console.log(`Servidor escutando na porta ${port}`);
    console.log(`IP do servidor: ${address}`);
    console.log(`Familia do servidor é ${family}\n`);
});

server.on('close', function () {
    console.log('Socket fechado.');
});

server.on('error', function (error) {
    console.log('Error: ' + error);
    server.close();
});

server.bind(3000);

// servidor ficará aberto somente por 5 minutos.
setTimeout(function () {
    server.close();
}, 5 * 60 * 1000);