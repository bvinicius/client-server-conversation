const net = require('net');
const fs = require('fs');

const server = net.createServer(socket => {
    socket.on('data', (data) => {
        const message = data.toString()
        console.log(` > Cliente diz: ${message}`)

        setTimeout(() => {
            const response = fs.readFileSync('files/serverdata.txt')
            console.log('Dados enviados ao cliente.\n')
            socket.write(response)
            socket.pipe(socket)
        }, 1000)
    })
});

server.listen(1234, 'localhost');

server.on('listening', () => {
    const { port, address, family } = server.address();

    console.log(`Servidor escutando na porta ${port}`);
    console.log(`IP do servidor: ${address}`);
    console.log(`Familia do servidor é ${family}\n`);
});

server.on('close', () => {
    console.log('Servidor fechado.')
})

server.on('error', error => {
    console.log('Error: ' + error);
    server.close();
});

// servidor ficará aberto somente por 5 minutos.
setTimeout(() => {
    server.close()
}, 5 * 60 * 1000)