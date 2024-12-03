const renderButton = document.getElementById('renderButton');
const jsonInput = document.getElementById('jsonInput');
const jsonOutput = document.getElementById('jsonOutput');

// Function to create collapsible JSON view
function createJSONView(jsonObject, container) {
  for (const key in jsonObject) {
    const value = jsonObject[key];

    const item = document.createElement('div');
    item.style.marginLeft = '20px';

    if (typeof value === 'object' && value !== null) {
      // Create toggle for objects/arrays
      const toggle = document.createElement('span');
      toggle.textContent = '[+]';
      toggle.classList.add('json-toggle');
      toggle.addEventListener('click', () => {
        const content = item.querySelector('.content');
        if (content.style.display === 'none') {
          content.style.display = '';
          toggle.textContent = '[-]';
        } else {
          content.style.display = 'none';
          toggle.textContent = '[+]';
        }
      });

      const keySpan = document.createElement('span');
      keySpan.innerHTML = `<span class="json-key">"${key}"</span>: `;

      const valueContainer = document.createElement('div');
      valueContainer.classList.add('content');
      valueContainer.style.display = 'none';
      createJSONView(value, valueContainer);

      item.appendChild(toggle);
      item.appendChild(keySpan);
      item.appendChild(valueContainer);
    } else {
      // Render primitive values
      const valueType = typeof value === 'string' ? 'json-string' : 'json-value';
      item.innerHTML = `<span class="json-key">"${key}"</span>: <span class="${valueType}">${JSON.stringify(value)}</span>`;
    }

    container.appendChild(item);
  }
}

// Function to render JSON
function renderJSON() {
  jsonOutput.innerHTML = ''; // Clear previous output
  try {
    const jsonObject = JSON.parse(jsonInput.value);
    createJSONView(jsonObject, jsonOutput);
  } catch (e) {
    jsonOutput.textContent = 'Invalid JSON input!';
    jsonOutput.style.color = 'red';
  }
}

// Attach event listener
renderButton.addEventListener('click', renderJSON);
