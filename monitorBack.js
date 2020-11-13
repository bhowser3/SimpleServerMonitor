var os = require('os');
const express = require('express');
const app = express();
var http = require('http').createServer(app);
var io = require('socket.io')(http);
var process = require('process');
const si = require('systeminformation');
const { stat } = require('fs');

var dataObj = {
	ram: 0,
	totalRam: 0,
	cpu: 0,
	uptime: 0
};

var staticInfo = {
	hostname: "",
	version: "",
	cpuModel: "",
	arch: "",
	ram: 0
};

var netInfo = {
	interfaces: ""
}

var staticObj = [staticInfo, netInfo]

app.get('/', (req, res) => {
	res.sendFile(__dirname + '/index.html');
});

app.use(express.static(__dirname));

io.on('connection', (socket) => {

	socket.on('request', (lol) => {
		cpuEmit = 0;

		si.currentLoad(function(load) {
			dataObj.cpu = load.currentload;
			dataObj.ram = os.totalmem() - os.freemem();
			dataObj.totalRam = os.totalmem();
			dataObj.uptime = os.uptime();
			io.emit('sendObj', dataObj); 
		});
	});

	socket.on('staticInfo', (info) => {
		staticObj[0].hostname = os.hostname();
		staticObj[0].version = os.version();
		var tempCpuInfo = os.cpus();
		staticObj[0].cpuModel = tempCpuInfo[0].model;
		staticObj[0].arch = os.arch();
		staticObj[0].ram = os.totalmem();
		staticObj[1].interfaces = os.networkInterfaces();
		io.emit('staticInfo', staticObj);
	});

});
console.log(__dirname);
console.log(os.uptime());
if (process.pid) {
	console.log('Running on PID: ' + process.pid);
  }
http.listen(3000, () => {
});


console.log(si.version());
si.currentLoad(function(info){
	console.log("CPU LOAD: " + info.currentload);
});