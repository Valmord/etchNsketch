const INITIAL_GRID_SIZE = 10;
const DEFAULT_TILE_COLOR = '#222222';
const DEFAULT_ETCH_COLOR = '#00AF00';

const etchContainer = document.querySelector('.etch-container');

const gridSizeInput = document.querySelector('#grid-size');
const gridSizeSpan = document.querySelector('.grid-current-size');
const etchColorPicker = document.querySelector('#etch-color');
etchColorPicker.value = DEFAULT_ETCH_COLOR;

console.dir(etchColorPicker);


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
      setEtchColor(tile));
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

function updateActiveButton(button){
  const colorPickerListItem = document.querySelector('.color-pick-li');
  console.log(button.id);
  if (button.id !== "color-pick-but") {
    colorPickerListItem.classList.add('hidden');
  } else {
    colorPickerListItem.classList.remove('hidden');
  }
  colorButtons.forEach(but => but.classList.remove('active'));
  button.classList.add('active');
}

const colorButtons = document.querySelectorAll('button');
colorButtons.forEach(button => {
  button.addEventListener('click', () => {
    updateActiveButton(button);
  })
})

function lightenColor(rgbColor){
  const color = rgbColor.slice(4,rgbColor.length-1);
  const colorArr = color.split(',');
  const newColorArr = colorArr.map(color => {
    color = +color;
    if (color < 255) color += 20;
    if (color > 255) color = 255;
    return color;
  })
  return `rgb(${newColorArr.join(',')})`;
}

function getRandomColor(){
  const color1 = Math.floor(Math.random()*256);
  const color2 = Math.floor(Math.random()*256);
  const color3 = Math.floor(Math.random()*256);
  return `rgb(${color1},${color2},${color3})`
}

function setEtchColor(tile){
  const activeColor = document.querySelector('button.active');
  const colorClass = activeColor.classList.toString()[6]; // 1-picker, 2-grey, 3-light, 4-rainbow
  switch (+colorClass) {
    case 1:
      tile.style.backgroundColor = etchColorPicker.value;
      break;
    case 2:
      if (tile.style.opacity) {
        tile.style.opacity -= 0.1;
      } else {
        tile.style.opacity = 0.9;
      }
      break;
    case 3:
      tile.style.backgroundColor = lightenColor(tile.style.backgroundColor);
    case 4:
      tile.style.backgroundColor = getRandomColor();
    default:
      break;
  }
}


// Page creation starts here
setupInitialGrid();

