
const INITIAL_GRID_HEIGHT = 10;
const INITIAL_GRID_WIDTH = 10;
const DEFAULT_TILE_COLOR = 'black';

const etchContainer = document.querySelector('.etch-container');

const gridHeightInput = document.querySelector('#grid-height');
const gridWidthInput = document.querySelector('#grid-width');
const gridHeightSpan = document.querySelector('.grid-current-height');
const gridWidthSpan = document.querySelector('.grid-current-width');


gridHeightInput.addEventListener('change', () => {
  updateGrid();
});
gridWidthInput.addEventListener('change', () => {
  updateGrid();
});

function setupInitialGrid(){
  gridHeightInput.value = INITIAL_GRID_HEIGHT;
  gridWidthInput.value = INITIAL_GRID_WIDTH;
  updateGrid();
}

function updateGrid(){
  etchContainer.innerHTML = '';
  gridHeightSpan.textContent = gridHeightInput.value + ' px';
  gridWidthSpan.textContent = gridWidthInput.value + ' px';
  createGrid();
  allotTileLogic();
  updateGridLines();
  setTileBackground(DEFAULT_TILE_COLOR);
}

function createGrid (){
  for (let row = 0; row < gridWidthInput.value; row++){
    const tileContainer = document.createElement('div');
    tileContainer.classList.add('tile-container');
    for (let column = 0; column < gridHeightInput.value; column++) {
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
    tile.style.backgroundColor = 'green');
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
tileColorPicker.addEventListener('change', event => {
  setTileBackground(tileColorPicker.value);
});



// Page creation starts here
setupInitialGrid();

