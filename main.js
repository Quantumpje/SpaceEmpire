var http = require('http')
var readline = require('readline')
var fs = require('fs')



var data = {
	tickspeed: 1000,
	tick: 0,
}

function loop(i) {
	setTimeout(() => {
		data.tick += 1

		loop(++i)
	}, data.tickspeed)
}



const rl = readline.createInterface({
	input: process.stdin,
	output: process.stdout,
})

function commandloop(i) {
	setTimeout(() => {
		rl.question(`Enter command: `, command => {
			if (command == 'help') {
				console.log('Command list: ( help ), ( data ), ( save ), ( load ), ( tickspeed ).')
			}
			else if (command == 'data') {
				console.log(`Current data is ${JSON.stringify(data)}.`)
			}
			else if (command == 'save') {
				let savedata = JSON.stringify(data)
				fs.writeFile('./data.txt', savedata, err => {
					if (err) {
						console.error(err)
					} else {
						console.log('successfully saved ' + savedata)
					}
				})
			}
			else if (command == 'load') {
				fs.readFile('./data.txt', 'utf8', (err, loaddata) => {
					if (err) {
					  console.error(err)
					}
					console.log('successfully read ' + loaddata)
					data = JSON.parse(loaddata)
				  })
			}
			else if (command == 'tickspeed') {
				rl.question(`Enter new tickspeed: `, speed => {
					data.tickspeed = speed
					console.log('New speed is ' + speed)

					commandloop(++i)
				})
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

	res.end(JSON.stringify(data))
})

server.listen(3000, '127.0.0.1', () => {
	console.log('Started on 127.0.0.1:3000')
})