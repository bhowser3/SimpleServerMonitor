var os = require('os');
const express = require('express');
const app = express();
var http = require('http').createServer(app);
var io = require('socket.io')(http);
var process = require('process');
const si = require('systeminformation');



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
	interfaces: "",
	ip4: "",
	ip4subnet: "",
	type: "",
	dhcp: ""
};

var hddInfo = new Array();

var staticObj = [staticInfo, netInfo, hddInfo];

app.get('/', (req, res) => {
	res.sendFile(__dirname + '/index.html');
});

async function networkAndDockerLoadData() {
	try {
		const networkData = await si.networkInterfaces();
		const fsData = await si.diskLayout();
		
		staticObj[1].interfaces = networkData[0].ifaceName;
		staticObj[1].ip4 = networkData[0].ip4;
		staticObj[1].ip4subnet = networkData[0].ip4subnet;
		staticObj[1].type = networkData[0].type;
		staticObj[1].dhcp = networkData[0].dhcp;
		staticObj[3] = fsData;

	} catch (e) {
		  console.log(e);
	}
  }

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
		
		networkAndDockerLoadData();
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
