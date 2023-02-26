const lineWidth = document.getElementById("line-width");
const canvas = document.querySelector("canvas");
const context = canvas.getContext("2d");
const color = document.getElementById("color");

canvas.width = 800;
canvas.height = 800;
context.lineWidth = lineWidth.value;
let isPainting = false;

const colors = [
    "#FEA47F",
    "#25CCF7",
    "#EAB543",
    "#55E6C1",
    "#CAD3C8",
    "#F97F51",
    "#1B9CFC",
    "#F8EFBA",
    "#58B19F",
    "#2C3A47",
    "#B33771",
    "#3B3B98",
    "#FD7272",
    "#9AECDB",
    "#D6A2E8",
    "#6D214F",
    "#182C61",
    "#FC427B",
    "#BDC581",
    "#82589F"
];

function onLineWidthChange(event){
    context.lineWidth = event.target.value;
}

function strokeLine(event){
    if(isPainting == true){
        context.lineTo(event.offsetX,event.offsetY);
        context.stroke();
        return;
    }
    
    context.moveTo(event.offsetX, event.offsetY);
}

function startPainting(event){
    isPainting = true;
    context.moveTo(event.offsetX,event.offsetY);
}

function cancelPainting(){
    isPainting = false;
    context.beginPath();
}

function onColorChange(event){
    context.strokeStyle = event.target.value;
}

canvas.addEventListener("mousemove", strokeLine);
canvas.addEventListener("mousedown", startPainting);
canvas.addEventListener("mouseup",cancelPainting);
canvas.addEventListener("mouseleave", cancelPainting);
lineWidth.addEventListener("change",onLineWidthChange);
color.addEventListener("change", onColorChange);