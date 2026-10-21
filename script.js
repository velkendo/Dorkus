let isMetric = true;

const metricBtn = document.getElementById('metricBtn');
const imperialBtn = document.getElementById('imperialBtn');
const heightLabel = document.getElementById('heightLabel');
const weightLabel = document.getElementById('weightLabel');
const heightInput = document.getElementById('height');
const weightInput = document.getElementById('weight');
const ageInput = document.getElementById('age');
const calculateBtn = document.getElementById('calculateBtn');
const resultsPanel = document.getElementById('resultsPanel');

function setUnit(metric) {
    isMetric = metric;
    if (isMetric) {
        metricBtn.classList.add('active');
        imperialBtn.classList.remove('active');
        heightLabel.textContent = 'Height (cm)';
        weightLabel.textContent = 'Weight (kg)';
        heightInput.placeholder = 'e.g. 180';
        weightInput.placeholder = 'e.g. 65';
    } else {
        imperialBtn.classList.add('active');
        metricBtn.classList.remove('active');
        heightLabel.textContent = 'Height (inches)';
        weightLabel.textContent = 'Weight (lbs)';
        heightInput.placeholder = 'e.g. 70';
        weightInput.placeholder = 'e.g. 143';
    }
}

metricBtn.addEventListener('click', () => setUnit(true));
imperialBtn.addEventListener('click', () => setUnit(false));

calculateBtn.addEventListener('click', () => {
    let height = parseFloat(heightInput.value);
    let weight = parseFloat(weightInput.value);
    const age = parseInt(ageInput.value);
    
    // Get radio values
    const gender = document.querySelector('input[name="gender"]:checked').value;
    const activity = parseFloat(document.querySelector('input[name="activity"]:checked').value);

    if (!height || !weight || !age) {
        alert("Please fill in all details (Age, Height, Weight).");
        return;
    }

    if (!isMetric) {
        height = height * 2.54; 
        weight = weight * 0.453592; 
    }

    // 1. BMI Calculation
    const heightInMeters = height / 100;
    const bmi = weight / (heightInMeters * heightInMeters);

    // 2. Body Fat % (Deurenberg Formula)
    let genderFactor = gender === 'male' ? 1 : 0;
    let bodyFat = (1.20 * bmi) + (0.23 * age) - (10.8 * genderFactor) - 5.4;
    bodyFat = Math.max(bodyFat, 3); 

    // 3. Lean Body Mass
    const fatMass = weight * (bodyFat / 100);
    const leanMass = weight - fatMass;

    // 4. BMR (Mifflin-St Jeor)
    let bmr;
    if (gender === 'male') {
        bmr = (10 * weight) + (6.25 * height) - (5 * age) + 5;
    } else {
        bmr = (10 * weight) + (6.25 * height) - (5 * age) - 161;
    }

    // 5. TDEE (Maintenance Calories)
    const tdee = Math.round(bmr * activity);

    // 6. Calorie Targets based on the reference standard
    const mildLoss = tdee - 250;
    const normalLoss = tdee - 500;
    const extremeLoss = tdee - 1000;

    // 7. Score Calculation
    let score = 100;
    let bmiDiff = Math.abs(bmi - 22);
    score -= (bmiDiff * 2);
    const idealFat = gender === 'male' ? 15 : 22;
    let fatDiff = Math.abs(bodyFat - idealFat);
    score -= (fatDiff * 1.5);
    score = Math.max(Math.min(Math.round(score), 100), 10); 

    updateUI(bmi, bodyFat, leanMass, tdee, mildLoss, normalLoss, extremeLoss, score);
});

function updateUI(bmi, bodyFat, leanMass, tdee, mildLoss, normalLoss, extremeLoss, score) {
    document.getElementById('bmiValue').textContent = bmi.toFixed(1);
    
    let category = "Normal";
    if(bmi < 18.5) category = "Underweight";
    if(bmi > 25) category = "Overweight";
    if(bmi > 30) category = "Obese";
    document.getElementById('bmiCategory').textContent = category;

    document.getElementById('bodyFatValue').textContent = bodyFat.toFixed(1) + '%';
    const massUnit = isMetric ? 'kg' : 'lbs';
    const displayLeanMass = isMetric ? leanMass : leanMass * 2.20462;
    document.getElementById('lbmValue').textContent = `Lean Mass: ${displayLeanMass.toFixed(1)} ${massUnit}`;
    
    // Calorie Table Update
    document.getElementById('calMaintain').textContent = tdee.toLocaleString();
    
    document.getElementById('calMild').textContent = mildLoss.toLocaleString();
    document.getElementById('percMild').textContent = Math.round((mildLoss/tdee)*100) + "%";

    document.getElementById('calLoss').textContent = normalLoss.toLocaleString();
    document.getElementById('percLoss').textContent = Math.round((normalLoss/tdee)*100) + "%";

    document.getElementById('calExtreme').textContent = extremeLoss.toLocaleString();
    document.getElementById('percExtreme').textContent = Math.round((extremeLoss/tdee)*100) + "%";

    // Score Update
    const scoreEl = document.getElementById('healthScore');
    scoreEl.textContent = score;
    const scoreMsg = document.getElementById('scoreMessage');
    
    if (score >= 85) {
        scoreMsg.textContent = "Excellent Fitness!";
        scoreMsg.style.color = "#10b981";
    } else if (score >= 60) {
        scoreMsg.textContent = "Good, with room to grow.";
        scoreMsg.style.color = "#f59e0b";
    } else {
        scoreMsg.textContent = "Needs Attention";
        scoreMsg.style.color = "#ef4444";
    }

    resultsPanel.classList.remove('hidden');
                                                                  }
