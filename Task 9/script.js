const mazeContainer = document.getElementById('maze-container');
const generateMazeButton = document.getElementById('generateMazeButton');

const mazeSize = 10;  // 10x10 grid
const cellSize = 30;  // Cell size in pixels
let start, end, currentPos;

// Directions for keyboard navigation
const directions = {
  ArrowUp: [-1, 0],
  ArrowDown: [1, 0],
  ArrowLeft: [0, -1],
  ArrowRight: [0, 1],
};

// Create an empty grid
let grid = [];

// Function to generate the maze
function generateMaze() {
  grid = [];

  // Clear the previous maze
  mazeContainer.innerHTML = '';

  // Generate grid cells
  for (let row = 0; row < mazeSize; row++) {
    const rowArray = [];
    for (let col = 0; col < mazeSize; col++) {
      const cell = document.createElement('div');
      cell.classList.add('cell');
      mazeContainer.appendChild(cell);
      rowArray.push(cell);
    }
    grid.push(rowArray);
  }

  // Set start and end positions
  start = [0, 0];  // Start at top-left
  end = [mazeSize - 1, mazeSize - 1];  // End at bottom-right

  // Add start and end cells
  grid[start[0]][start[1]].classList.add('start');
  grid[end[0]][end[1]].classList.add('end');

  // Generate random walls and path
  generateWallsAndPaths();

  // Initialize current position
  currentPos = [...start];
  grid[currentPos[0]][currentPos[1]].classList.add('path');

  // Add event listener for keyboard navigation
  window.addEventListener('keydown', handleKeyPress);
}

// Generate random walls and paths
function generateWallsAndPaths() {
  for (let row = 0; row < mazeSize; row++) {
    for (let col = 0; col < mazeSize; col++) {
      if (!(row === start[0] && col === start[1]) && !(row === end[0] && col === end[1])) {
        const isWall = Math.random() < 0.3;  // 30% chance to be a wall
        if (isWall) {
          grid[row][col].classList.add('wall');
        }
      }
    }
  }
}

// Handle keyboard navigation
function handleKeyPress(event) {
  const [dx, dy] = directions[event.key] || [0, 0];
  if (dx === 0 && dy === 0) return;

  const newRow = currentPos[0] + dx;
  const newCol = currentPos[1] + dy;

  if (newRow >= 0 && newRow < mazeSize && newCol >= 0 && newCol < mazeSize) {
    const newCell = grid[newRow][newCol];
    if (!newCell.classList.contains('wall')) {
      // Remove previous path class
      grid[currentPos[0]][currentPos[1]].classList.remove('path');

      // Update position
      currentPos = [newRow, newCol];
      newCell.classList.add('path');

      // Check if we've reached the end
      if (currentPos[0] === end[0] && currentPos[1] === end[1]) {
        alert('Congratulations! You reached the end.');
        window.removeEventListener('keydown', handleKeyPress); // Remove event listener
      }
    }
  }
}

// Generate new maze on button click
generateMazeButton.addEventListener('click', generateMaze);

// Initialize the first maze
generateMaze();
