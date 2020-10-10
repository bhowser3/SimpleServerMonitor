var os = require('os');
const express = require('express')
const app = express()
//var app = require('express')();
var http = require('http').createServer(app);
var io = require('socket.io')(http);
var osutil = require('os-utils');

app.get('/', (req, res) => {
	res.sendFile(__dirname + '/index.html');
});

app.use(express.static(__dirname));

io.on('connection', (socket) => {
    //console.log(os.platform());
	//console.log(os.arch());

    socket.on('memReq', (mem) => {
		var usedmem = os.totalmem() - os.freemem();
		io.emit('memReq', usedmem);
	});

	socket.on('cpu', (cpuper) => {
	    osutil.cpuUsage(function(v) {
			io.emit('cpu', v);
	    });
	});

	socket.on('hostname', (name) => {
		var hostname = os.hostname();
		io.emit('hostname', hostname);
	});
});
console.log(__dirname);
console.log(os.uptime());
http.listen(3000, () => {
});