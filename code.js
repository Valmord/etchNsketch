
const INITIAL_GRID_SIZE = 10;
const DEFAULT_TILE_COLOR = 'black';
const DEFAULT_ETCH_COLOR = '#00AF00';

const etchContainer = document.querySelector('.etch-container');

const gridSizeInput = document.querySelector('#grid-size');
const gridSizeSpan = document.querySelector('.grid-current-size');
const etchColor = document.querySelector('#etch-color');
etchColor.value = DEFAULT_ETCH_COLOR;

console.dir(etchColor);


gridSizeInput.addEventListener('change', () => {
  updateGrid();
});

function setupInitialGrid(){
  gridSizeInput.value = INITIAL_GRID_SIZE;
  updateGrid();
}

function updateGrid(){
  etchContainer.innerHTML = '';
  gridSizeSpan.textContent = gridSizeInput.value + ' px';
  createGrid();
  allotTileLogic();
  updateGridLines();
  setTileBackground(DEFAULT_TILE_COLOR);
}

function createGrid (){
  for (let row = 0; row < gridSizeInput.value; row++){
    const tileContainer = document.createElement('div');
    tileContainer.classList.add('tile-container');
    for (let column = 0; column < gridSizeInput.value; column++) {
      const tile = document.createElement('div');
      tile.classList.add('tile');
      tileContainer.appendChild(tile);
    }
    etchContainer.appendChild(tileContainer);
  }
}

function allotTileLogic(){
  const tiles = document.querySelectorAll('.tile');
  tiles.forEach( tile => {
    tile.addEventListener('mouseenter', () => 
    tile.style.backgroundColor = etchColor.value);
  })
}

function updateGridLines(){
  const tiles = document.querySelectorAll('.tile');
  if (showGrid.checked) {
    tiles.forEach(tile => tile.classList.add('tile-border'));
  } else {
    tiles.forEach(tile => tile.classList.remove('tile-border'));
  }
}

const showGrid = document.querySelector('#show-grid');
showGrid.addEventListener('change', () => {
  updateGridLines();
})

function setTileBackground(color){
  const tiles = document.querySelectorAll('.tile');
  tiles.forEach(tile => {
    tile.style.backgroundColor = color;
  })
}

const tileColorPicker = document.querySelector('#tile-color');
tileColorPicker.addEventListener('change', () => {
  setTileBackground(tileColorPicker.value);
});



// Page creation starts here
setupInitialGrid();

