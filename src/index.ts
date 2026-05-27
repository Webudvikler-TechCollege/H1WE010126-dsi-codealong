import http, { IncomingMessage, ServerResponse } from 'http'

const server = http.createServer((request: IncomingMessage, response: ServerResponse) => {
    response.writeHead(200, { 'Content-type': 'text/plain' })
    response.end('Hello world')
    console.log('Server responded with Hello World')
})

server.listen(4000, () => {
    console.log(`Server is running on port http://localhost:4000`)
})