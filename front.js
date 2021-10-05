let graph = {
    name: "graph",
    rowAmount: 100,
    columnAmount: 100,
    backgroundColor: "#f0f0f0",
    gridColor: "#b3b3b3", 
    lineOneColor: "#FFFF00",
}

var data = new Array(graph.columnAmount+1).fill(0);
var randomVariationMax = 10;
var intervalID; 

function clearGraph(){
    document.getElementById("verticalBox").innerHTML = '';
    document.getElementById("horizontalBox").innerHTML = '';
    var paras = document.getElementsByClassName('leader-line');
    while(paras[0]){
        paras[0].parentNode.removeChild(paras[0]);
    }
    show();
}

function newData(){
    clearGraph();
    loadData();
    drawLine();
}

function show(){
    var verticalBox = document.getElementById("verticalBox");
    for(let i = 0; i < graph.columnAmount+1; i++){
        verticalBox.innerHTML = verticalBox.innerHTML + "<div class='vertical_Line' id='vertical_Line" + i + "'></div>";
    }
    var horizontalBox = document.getElementById("horizontalBox");
    for(let i = graph.rowAmount; i >= 0; i--){
        horizontalBox.innerHTML = horizontalBox.innerHTML + "<div class='horizontal_Line' id='horizontal_Line" + i + "'></div>";
    }
}

function loadData(){
    for(let i = 0; i < data.length; i++){
        var pointY = 100 - data[i];
        var vertical_Line = document.getElementById("vertical_Line" + i);
        vertical_Line.innerHTML = vertical_Line.innerHTML + "<div style='margin-top: calc((" + pointY + " * (var(--parentHeight) / (" + (data.length) + "))));' class='circle' id='circle" + i + "'></div>";
    }
}

function pullDataToLeft(){
    for(let i = 1; i < data.length; i++){
        data[i-1] = data[i];
    } 
    //remove this below
    if(!getRandomInt(2)){
        console.log();
        if((data[data.length - 1] += getRandomInt(randomVariationMax+1)) > graph.rowAmount){
            data[data.length - 1] = graph.rowAmount;
        }
    }else{
        if((data[data.length - 1] -= getRandomInt(randomVariationMax+1)) < 0){
            data[data.length - 1] = 0;
        }
    }
    //remove above

    //data[data.length - 1] = newest point/next 

    clearGraph();
    loadData();
    drawLine();
}

//move current points to left by one column width
//move current lines to left by one column width
//add newest data point 
//draw new line

function drawLine(){
    for(let i = 0; i < data.length-1; i++){
        var line = new LeaderLine(
            document.getElementById('circle' + i),
            document.getElementById('circle'+ (i+1)),
            {color: graph.lineOneColor}
        );
        line.path = 'straight';
        line.endPlug = 'behind';
    }
}

//other helpers

function consoleLogData(){
    console.log(data);
    console.log(randomVariationMax);
}

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

function runGraph(){
    intervalId = window.setInterval(function() {
        pullDataToLeft();
    }, 225);
}
