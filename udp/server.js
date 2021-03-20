const udp = require('dgram');
const fs = require('fs');

// instancia um servidor UDP
const server = udp.createSocket('udp4');

// emite em caso de erro
server.on('error', function (error) {
    console.log('Error: ' + error);
    server.close();
});

// emite cada vez que o cliente manda algum dado
server.on('message', function (msg, info) {
    console.log('Mensagem recebida do cliente: ' + msg.toString());
    console.log(`Origem: ${info.address}:${info.port} \nTamanho dos dados: ${msg.length} \n`);

    // envia mensagem
    const response = fs.readFileSync('serverdata.txt')
    server.send(response, info.port, 'localhost', function (error) {
        if (error) {
            client.close();
        } else {
            console.log('Mensagem respondida ao cliente.');
        }
    });
});

// emite quando o socket está pronto, esperando por mensagens
server.on('listening', function () {
    const {port, address, family} = server.address();
    
    console.log(`Servidor escutando na porta ${port}`);
    console.log(`IP do servidor: ${address}`);
    console.log(`Familia do servidor é ${family}\n`);
});

// emite quando o socket é fechado
server.on('close', function () {
    console.log('Socket fechado.');
});

server.bind(2222);

// servidor ficará aberto somente por 5 minutos.
setTimeout(function () {
    server.close();
}, 5 * 60 * 1000);