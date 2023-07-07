var gridSize = document.getElementById('sizeSlider').value;
var grid = document.getElementById('grid');

function createGrid(size){
    var width = 500 / size;
    var height = width;
    for (let i = 0; i < size*size; i++){
        var pixel = document.createElement('div');
        pixel.setAttribute('id', i);
        pixel.setAttribute('class', 'pixel');
        pixel.style.width = width+'px';
        pixel.style.height = height+'px';
        grid.appendChild(pixel);
    }
}

createGrid(gridSize);