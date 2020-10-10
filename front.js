google.charts.load('current', {'packages':['corechart']});
var ramData = new Array(60);
var cpuData = new Array(60);
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
    //for(i = 60; i > 1; i--){
        //console.log(data.cache[59])
    //}
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
//socket io functions
$(function () {
    var socket = io();
    setInterval(sendMemReq, 1000);
    socket.emit('hostname', 0);
    
    function sendMemReq(){
        //e.preventDefault();
        socket.emit('memReq', 0);
        socket.emit('cpu', 0);
    }
        socket.on('memReq', function(mem){
        drawChart(formatBytes(mem, 8));
    });
        socket.on('hostname', function(name){
        document.getElementById('host').innerHTML = name;
    });
        socket.on('cpu', function(name){
        cpuChart(name*100);
    });
});
    