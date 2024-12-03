// Get elements
const next1Button = document.getElementById('next1');
const next2Button = document.getElementById('next2');
const prev2Button = document.getElementById('prev2');
const prev3Button = document.getElementById('prev3');
const submitButton = document.getElementById('submitForm');

const step1 = document.getElementById('step1');
const step2 = document.getElementById('step2');
const step3 = document.getElementById('step3');
const progress = document.getElementById('progress');

// Get form inputs
const firstNameInput = document.getElementById('firstName');
const lastNameInput = document.getElementById('lastName');
const emailInput = document.getElementById('email');
const phoneInput = document.getElementById('phone');

// Get confirmation spans
const confirmFirstName = document.getElementById('confirmFirstName');
const confirmLastName = document.getElementById('confirmLastName');
const confirmEmail = document.getElementById('confirmEmail');
const confirmPhone = document.getElementById('confirmPhone');

// Initialize variables
let currentStep = 1;

// Update progress bar
function updateProgress() {
  const progressPercentage = (currentStep - 1) * 50;
  progress.style.width = `${progressPercentage}%`;
}

// Show and hide form steps
function showStep(step) {
  step1.classList.remove('active');
  step2.classList.remove('active');
  step3.classList.remove('active');
  
  if (step === 1) {
    step1.classList.add('active');
  } else if (step === 2) {
    step2.classList.add('active');
  } else if (step === 3) {
    step3.classList.add('active');
    confirmFirstName.textContent = firstNameInput.value;
    confirmLastName.textContent = lastNameInput.value;
    confirmEmail.textContent = emailInput.value;
    confirmPhone.textContent = phoneInput.value;
  }

  updateProgress();
}

// Validation for each step
function validateStep(step) {
  let valid = true;
  
  if (step === 1) {
    if (!firstNameInput.value || !lastNameInput.value) {
      alert('Please fill out all fields in Step 1');
      valid = false;
    }
  } else if (step === 2) {
    if (!emailInput.value || !phoneInput.value) {
      alert('Please fill out all fields in Step 2');
      valid = false;
    }
  }

  return valid;
}

// Step 1: Next Button Clicked
next1Button.addEventListener('click', () => {
  if (validateStep(1)) {
    currentStep = 2;
    showStep(currentStep);
  }
});

// Step 2: Next and Previous Button Clicked
next2Button.addEventListener('click', () => {
  if (validateStep(2)) {
    currentStep = 3;
    showStep(currentStep);
  }
});
prev2Button.addEventListener('click', () => {
  currentStep = 1;
  showStep(currentStep);
});

// Step 3: Previous Button Clicked and Form Submit
prev3Button.addEventListener('click', () => {
  currentStep = 2;
  showStep(currentStep);
});

submitButton.addEventListener('click', (event) => {
  event.preventDefault();
  alert('Form Submitted Successfully!');
});

// Initialize the form to show Step 1
showStep(currentStep);
