const net = require('net');
const fs = require('fs');
const isEven = require('../utils/isEven');

const server = net.createServer(socket => {
    socket.on('data', (data) => {
        const message = data.toString()
        console.log(`Mensagem do cliente mandou: ${message}`)

        setTimeout(() => {
            const data = fs.readFileSync('serverdata.txt')
            socket.write(data)
            socket.pipe(socket)
        }, 1000)
    })
});

server.listen(1234, '127.0.0.1');

server.on('close', () => {
    console.log('Servidor fechado.')
})

setTimeout(() => {
    server.close()
}, 5 * 60 * 1000) // servidor fica aberto apenas por 5 minutos.