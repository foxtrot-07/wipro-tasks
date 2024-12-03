// Select the color pickers
const backgroundColorPicker = document.getElementById('backgroundColor');
const textColorPicker = document.getElementById('textColor');
const buttonColorPicker = document.getElementById('buttonColor');

// Update CSS variables dynamically
function updateCSSVariable(variable, value) {
  document.documentElement.style.setProperty(variable, value);
}

// Event listeners for color pickers
backgroundColorPicker.addEventListener('input', (event) => {
  updateCSSVariable('--background-color', event.target.value);
});

textColorPicker.addEventListener('input', (event) => {
  updateCSSVariable('--text-color', event.target.value);
});

buttonColorPicker.addEventListener('input', (event) => {
  updateCSSVariable('--button-color', event.target.value);
});
