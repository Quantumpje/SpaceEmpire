var http = require('http')
var readline = require('readline')



let data = {
	tick: 0
}

function loop(i) {
	setTimeout(() => {
		data.tick = i

		loop(++i)
	}, 2000)
}



const rl = readline.createInterface({
	input: process.stdin,
	output: process.stdout,
})

function commandloop(i) {
	setTimeout(() => {
		rl.question(`Enter command: `, command => {
			if (command == 'help') {
				console.log('Command list: ( help ), ( tick ).')
			}
			else if (command == 'tick') {
				console.log(`Current tick is ${data.tick}.`)
			}
			else {
				console.log('Command not recognised!')
			}

			commandloop(++i)
		})
	}, 500)
}



loop(0)
commandloop(0)
const server = http.createServer((req, res) => {
	res.writeHead(200, { 'Content-Type': 'text/plain' })

	res.end('tick: ' + data.tick.toString())
})

server.listen(3000, '127.0.0.1', () => {
	console.log('Started on 127.0.0.1:3000')
})