let color = '#000000';
let mode = 'color';
let size = 16

function setColor(newColor) {
    color = newColor;
}

function setMode(newMode) {
    mode = newMode;
}

function setSize(newSize) {
    size = newSize;
}

function updateSizeValue(newSize){
    sizeValue.textContent = newSize + ' x ' + newSize;
}

function activateButton(mode) {
    colorBtn.removeAttribute('class','active');
    rainbowBtn.removeAttribute('class','active');
    eraserBtn.removeAttribute('class','active');
    clearBtn .removeAttribute('class','active');

    if(mode == 'color') {
        colorBtn.setAttribute('class','active');
    }
    else if(mode == 'rainbow') {
        rainbowBtn.setAttribute('class','active');
    }
    else if (mode == 'eraser') {
        eraserBtn.setAttribute('class','active');
    }
    else {
        clearBtn.setAttribute('class', 'active');
    }
}

const colorPicker = document.getElementById('colorPicker');
const colorBtn = document.getElementById('colorBtn');
const rainbowBtn = document.getElementById('rainbowBtn');
const eraserBtn = document.getElementById('eraserBtn');
const clearBtn = document.getElementById('clearBtn');
const sizeValue = document.getElementById('sizeValue');
const sizeSlider = document.getElementById('sizeSlider');
const grid = document.getElementById('grid');

colorPicker.oninput = (e) => setColor(e.target.value);
colorBtn.onclick = () => setMode('color');
rainbowBtn.onclick = () => setMode('rainbow');
eraserBtn.onclick = () => setMode('eraser');
clearBtn.onclick = () => reloadGrid();
sizeSlider.onchange = (e) => changeSize(e.target.value);
sizeSlider.onmousemove = (e) => updateSizeValue(e.target.value);

let mouseDown = false;
grid.onmousedown = () => (mouseDown = true);
grid.onmouseup = () => (mouseDown = false);

grid.addEventListener('mouseover',draw);
grid.addEventListener('mousedown',draw);

function draw(e) {
    if (e.type  === 'mouseover' && !mouseDown) return
    if(mode == 'color'){
        e.target.style.backgroundColor = color;
    }
    else if (mode == 'eraser'){
        e.target.style.backgroundColor = '#ffffff';
    }
    else if (mode == 'rainbow'){
        const red = Math.floor(Math.random() * 256);
        const blue = Math.floor(Math.random() * 256);
        const green = Math.floor(Math.random() * 256);
        e.target.style.backgroundColor = `rgb(${red}, ${blue}, ${green})`;
    }
}

function changeSize(newSize) {
    setSize(newSize);
    updateSizeValue(newSize);
    reloadGrid();
}

function clearGrid() {
    grid.innerHTML = '';
}

function createGrid(size) {
    grid.style.gridTemplateColumns = `repeat(${size}, 1fr)`;
    grid.style.gridTemplateRows = `repeat(${size}, 1fr)`;

    for (let i = 0; i < size*size; i++){
        var pixel = document.createElement('div');
        pixel.setAttribute('id', i);
        pixel.setAttribute('class', 'pixel');
        grid.appendChild(pixel);
    }
}

function reloadGrid() {
    clearGrid()
    createGrid(size);
}

window.onload = () => {
    createGrid(size);
    sizeSlider.value = size;
    activateButton(mode);
}