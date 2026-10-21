// State
let isMetric = true;

// DOM Elements
const metricBtn = document.getElementById('metricBtn');
const imperialBtn = document.getElementById('imperialBtn');
const heightLabel = document.getElementById('heightLabel');
const weightLabel = document.getElementById('weightLabel');
const heightInput = document.getElementById('height');
const weightInput = document.getElementById('weight');
const calculateBtn = document.getElementById('calculateBtn');
const resultDiv = document.getElementById('result');
const bmiValue = document.getElementById('bmiValue');
const bmiCategory = document.getElementById('bmiCategory');

// Toggle Units
function setUnit(metric) {
    isMetric = metric;
    
    if (isMetric) {
        metricBtn.classList.add('active');
        imperialBtn.classList.remove('active');
        heightLabel.textContent = 'Height (cm)';
        weightLabel.textContent = 'Weight (kg)';
        heightInput.placeholder = 'e.g. 175';
        weightInput.placeholder = 'e.g. 70';
    } else {
        imperialBtn.classList.add('active');
        metricBtn.classList.remove('active');
        heightLabel.textContent = 'Height (inches)';
        weightLabel.textContent = 'Weight (lbs)';
        heightInput.placeholder = 'e.g. 68';
        weightInput.placeholder = 'e.g. 150';
    }
    
    // Clear inputs and hide results on toggle
    heightInput.value = '';
    weightInput.value = '';
    resultDiv.classList.add('hidden');
}

metricBtn.addEventListener('click', () => setUnit(true));
imperialBtn.addEventListener('click', () => setUnit(false));

// Calculate BMI
calculateBtn.addEventListener('click', () => {
    const height = parseFloat(heightInput.value);
    const weight = parseFloat(weightInput.value);

    if (!height || !weight || height <= 0 || weight <= 0) {
        alert('Please enter valid numbers for both height and weight.');
        return;
    }

    let bmi = 0;

    if (isMetric) {
        const heightInMeters = height / 100;
        bmi = weight / (heightInMeters * heightInMeters);
    } else {
        bmi = (weight / (height * height)) * 703;
    }

    displayResult(bmi);
});

// Display Result
function displayResult(bmi) {
    const roundedBMI = bmi.toFixed(1);
    let category = '';
    let colorClass = '';

    if (bmi < 18.5) {
        category = 'Underweight';
        colorClass = 'underweight';
    } else if (bmi >= 18.5 && bmi < 24.9) {
        category = 'Normal weight';
        colorClass = 'normal';
    } else if (bmi >= 25 && bmi < 29.9) {
        category = 'Overweight';
        colorClass = 'overweight';
    } else {
        category = 'Obese';
        colorClass = 'obese';
    }

    bmiValue.textContent = roundedBMI;
    bmiCategory.textContent = category;
    
    // Reset classes and apply the new color class
    bmiCategory.className = ''; 
    bmiCategory.classList.add(colorClass);

    resultDiv.classList.remove('hidden');
}
