const colorOptions = Array.from(document.getElementsByClassName("color-option"));
const lineWidth = document.getElementById("line-width");
const canvas = document.querySelector("canvas");
const context = canvas.getContext("2d");
const color = document.getElementById("color");
const modeBtn = document.getElementById("mode-btn");
const deleteBtn = document.getElementById("delete-btn");
const eraseBtn = document.getElementById("erase-btn");
const fileInput = document.getElementById("file");
const textInput = document.getElementById("text");
const saveBtn = document.getElementById("save");

const CANVAS_HEIGHT = 800;
const CANVAS_WIDTH = 800;

canvas.width = CANVAS_WIDTH;
canvas.height = CANVAS_HEIGHT;
context.lineWidth = lineWidth.value;
context.lineCap = "round";
let isPainting = false;
let isFilling = false;

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

function changeColor(selectedColor){
    context.strokeStyle = selectedColor;
    context.fillStyle = selectedColor;
    color.value = selectedColor;
}

function onColorChange(event){
    changeColor(event.target.value);
}

function onColorClick(event){
    changeColor(event.target.dataset.color);
}

function onModeClick(){
    if(isFilling){
        isFilling = false;
        modeBtn.innerText = "🖌 Fill";
    }else{
        isFilling = true;
        modeBtn.innerText = "✏ Draw";
    }
}

function onCanvasClick(){
    if(isFilling){
        context.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    }
}

function onDeleteClick(){
    changeColor("#FFFFFF");
    context.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
}

function onEraseClick(){
    changeColor("#FFFFFF");
    if(isFilling){
        onModeClick();
    }
}

function onFileChange(event){
    const file = event.target.files[0];
    const url = URL.createObjectURL(file);
    const image = new Image();
    image.src = url;
    image.onload = function(){
        context.drawImage(image, 0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
        fileInput.value = null;
    };
}

function onDoubleClick(event){
    const text = textInput.value;
    if(text !== ""){
        context.lineWidth = 1;
        context.font = "48px serif";
        context.fillText(text,event.offsetX,event.offsetY);
        textInput.value = null;
        context.lineWidth = lineWidth.value;
    } 
}

function onSaveClick(){
    const url = canvas.toDataURL();
    const a = document.createElement("a");
    a.href = url;
    a.download = "myDrawing.png";
    a.click();
}



canvas.addEventListener("dblclick", onDoubleClick);
canvas.addEventListener("mousemove", strokeLine);
canvas.addEventListener("mousedown", startPainting);
canvas.addEventListener("mouseup",cancelPainting);
canvas.addEventListener("mouseleave", cancelPainting);
canvas.addEventListener("click", onCanvasClick);
lineWidth.addEventListener("change",onLineWidthChange);
color.addEventListener("change", onColorChange);
colorOptions.forEach(color => color.addEventListener("click",onColorClick));
modeBtn.addEventListener("click", onModeClick);
deleteBtn.addEventListener("click", onDeleteClick);
eraseBtn.addEventListener("click", onEraseClick);
fileInput.addEventListener("change", onFileChange);
saveBtn.addEventListener("click", onSaveClick);