google.charts.load('current', {'packages':['corechart']});
var ramData = new Array(60);
var cpuData = [];

//google charts functions

function drawChart(current) {
    var dataSizeType = getDataSizeType(current);
    current = parse(current);
    ramData.unshift(current);

    if(ramData[59] === undefined){
        ramData[59] = 0;
    }else{
        ramData[59] = parseFloat(ramData[59]);
    }

    var data = google.visualization.arrayToDataTable([
    ['seconds', '0'],
    ['60',ramData[59]],
    ['',ramData[58]],
    ['',ramData[57]],
    ['',ramData[56]],
    ['',ramData[55]],
    ['',ramData[54]],
    ['',ramData[53]],
    ['',ramData[52]],
    ['',ramData[51]],
    ['',ramData[50]],
    ['',ramData[49]],
    ['',ramData[48]],
    ['',ramData[47]],
    ['',ramData[46]],
    ['',ramData[45]],
    ['45',ramData[44]],
    ['',ramData[43]],
    ['',ramData[42]],
    ['',ramData[41]],
    ['',ramData[40]],
    ['',ramData[39]],
    ['',ramData[38]],
    ['',ramData[37]],
    ['',ramData[36]],
    ['',ramData[35]],
    ['',ramData[34]],
    ['',ramData[33]],
    ['',ramData[32]],
    ['',ramData[31]],
    ['',ramData[30]],
    ['30',ramData[29]],
    ['',ramData[28]],
    ['',ramData[27]],
    ['',ramData[26]],
    ['',ramData[25]],
    ['',ramData[24]],
    ['',ramData[23]],
    ['',ramData[22]],
    ['',ramData[21]],
    ['',ramData[20]],
    ['',ramData[19]],
    ['',ramData[18]],
    ['',ramData[17]],
    ['',ramData[16]],
    ['',ramData[15]],
    ['15',ramData[14]],
    ['',ramData[13]],
    ['',ramData[12]],
    ['',ramData[11]],
    ['',ramData[10]],
    ['',ramData[9]],
    ['',ramData[8]],
    ['',ramData[7]],
    ['',ramData[6]],
    ['',ramData[5]],
    ['',ramData[4]],
    ['',ramData[3]],
    ['',ramData[2]],
    ['',ramData[1]],
    ['Current*',ramData[0]]
    ]);

    var options = {
    backgroundColor: '#2e2e2e',
    title: 'Ram Used In ' + dataSizeType,
    titleTextStyle: {
        color: '#bfbfbf'
    },
    hAxis: {title: '',  titleTextStyle: {color: '#bfbfbf'}},
    vAxis: {title: '', minValue: 0},
    colors: ['ffa500']
    };
    var chart = new google.visualization.AreaChart(document.getElementById('chart_div'));
    chart.draw(data, options);
}

function cpuArraySet(current){
    if(cpuData.length == 60){
        cpuData.pop();
        cpuData.unshift(current);
    }else{
        cpuData.push(current);
    }
}

function cpuChart(current) {
    cpuData.unshift(current);
    if(cpuData[59] === undefined){
        cpuData[59] = 0;
    }else{
        cpuData[59] = parseFloat(cpuData[59]);
    }
    var data = google.visualization.arrayToDataTable([
        ['seconds', '0'],
        ['60',cpuData[59]],
        ['',cpuData[58]],
        ['',cpuData[57]],
        ['',cpuData[56]],
        ['',cpuData[55]],
        ['',cpuData[54]],
        ['',cpuData[53]],
        ['',cpuData[52]],
        ['',cpuData[51]],
        ['',cpuData[50]],
        ['',cpuData[49]],
        ['',cpuData[48]],
        ['',cpuData[47]],
        ['',cpuData[46]],
        ['',cpuData[45]],
        ['45',cpuData[44]],
        ['',cpuData[43]],
        ['',cpuData[42]],
        ['',cpuData[41]],
        ['',cpuData[40]],
        ['',cpuData[39]],
        ['',cpuData[38]],
        ['',cpuData[37]],
        ['',cpuData[36]],
        ['',cpuData[35]],
        ['',cpuData[34]],
        ['',cpuData[33]],
        ['',cpuData[32]],
        ['',cpuData[31]],
        ['',cpuData[30]],
        ['30',cpuData[29]],
        ['',cpuData[28]],
        ['',cpuData[27]],
        ['',cpuData[26]],
        ['',cpuData[25]],
        ['',cpuData[24]],
        ['',cpuData[23]],
        ['',cpuData[22]],
        ['',cpuData[21]],
        ['',cpuData[20]],
        ['',cpuData[19]],
        ['',cpuData[18]],
        ['',cpuData[17]],
        ['',cpuData[16]],
        ['',cpuData[15]],
        ['15',cpuData[14]],
        ['',cpuData[13]],
        ['',cpuData[12]],
        ['',cpuData[11]],
        ['',cpuData[10]],
        ['',cpuData[9]],
        ['',cpuData[8]],
        ['',cpuData[7]],
        ['',cpuData[6]],
        ['',cpuData[5]],
        ['',cpuData[4]],
        ['',cpuData[3]],
        ['',cpuData[2]],
        ['',cpuData[1]],
        ['Current*',cpuData[0]]
        ]);
    var options = {
    backgroundColor: '#2e2e2e',
    title: 'CPU Percent Used ' + Math.ceil(current) + '%',
    titleTextStyle: {
        color: '#bfbfbf'
    },
    hAxis: {title: '',  titleTextStyle: {color: '#bfbfbf'}},
    vAxis: {title: '', minValue: 0},
    colors: ['ffa500']
    };

    var chart = new google.visualization.AreaChart(document.getElementById('cpu_chart'));
    chart.draw(data, options);
}

//helper functions
function parse(num){
    num = num.slice(0, -3); 
    return num;
}

function getDataSizeType(num){
    return num.charAt(num.length - 2) + num.charAt(num.length - 1);
}

function formatBytes(bytes, decimals = 4) {
    if (bytes === 0) return '0 Bytes';

    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

    const i = Math.floor(Math.log(bytes) / Math.log(k)); 
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
}

function showHide(showMe){
    const menu = document.querySelectorAll('#menuItem');
    const content = document.querySelectorAll('.contents');

    for (let i = 0; i < menu.length; i++) {
        menu[i].classList.remove('active');
        content[i].hidden = true;
    }
    content[showMe].hidden = false;
    menu[showMe].classList.add('active');
}


function buildDataView(info, elementID){
    Object.keys(info).forEach(function(key,index) {
        if(typeof info[key] === 'object' && info[key] !== null){
            console.log(info[key]);
        }else{
            document.getElementById(elementID).innerHTML = document.getElementById(elementID).innerHTML + '<div id="' + key + index + '">' + '<div class="titleTwo">' + key + ':</div><div id="info">' + info[key] + '</div></div><br>';
        }
    });
}

function buildArrayView(info, elementID){
    for(let i = 0; info.length > i; i++){
        buildDataView(info[i], elementID);
    }
}

//socket io functions
$(function () {
    var socket = io();
    setInterval(sendMemReq, 1000);
    socket.emit('staticInfo', 0);
    socket.emit('request', 0);

    function sendMemReq(){
        socket.emit('request', 0);
    }

    socket.on('sendObj', function(obj){
        drawChart(formatBytes(obj.totalRam - obj.ram, 8));
        cpuChart(obj.cpu);
     });

    socket.on('staticInfo', function(info){
        info[0].ram = formatBytes(info[0].ram);
        //loadStatic(info[0], info[1]);
        buildDataView(info[0], 'infoTable')
        buildDataView(info[1], 'netTable')
        buildArrayView(info[3], 'fsTable');
        document.getElementById('host').innerHTML = info[0].hostname;

    });

});