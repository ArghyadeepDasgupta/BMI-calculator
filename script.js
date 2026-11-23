const heightInput = document.getElementById('height');
const weightInput = document.getElementById('weight');
const calcBtn = document.getElementById('button');

const heightResetBtn = document.querySelector('#height_reset');
const weightResetBtn = document.querySelector('#weight_reset');
const output = document.getElementById('result');
const categories = document.querySelectorAll('footer li');

function calculateBMI() {
    const heightM = parseFloat(heightInput.value) / 100;
    const weight = parseFloat(weightInput.value);

    categories.forEach(li => li.classList.remove('active'));

    if (!heightM || !weight || heightM <= 0 || weight <= 0) {
        output.textContent = 'Please enter valid positive numbers';
        output.style.color = '#f87171';
        output.style.borderColor = '#f87171';
        return;
    }

    const bmi = (weight / (heightM * heightM)).toFixed(1);
    let category = '';
    let color = '';
    let activeId = '';

    if (bmi < 18.5) {
        category = 'Underweight';
        color = '#38bdf8';
        activeId = 'undr';
    } else if (bmi < 25) {
        category = 'Healthy Weight';
        color = '#4ade80';
        activeId = 'healthy';
    } else if (bmi < 30) {
        category = 'Overweight';
        color = '#facc15';
        activeId = 'over';
    } else {
        category = 'Obesity';
        color = '#f87171';
        activeId = 'obe';
    }

    output.textContent = `BMI: ${bmi} (${category})`;
    output.style.color = color;
    output.style.borderColor = color;
    document.getElementById(activeId).classList.add('active');
}

function resetOutput() {
    output.textContent = 'Your BMI will appear here';
    output.style.color = '';
    output.style.borderColor = '';
    categories.forEach(li => li.classList.remove('active'));
}

calcBtn.addEventListener('click', calculateBMI);

[heightInput, weightInput].forEach(input => {
    input.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') calculateBMI();
    });
});

heightResetBtn.addEventListener('click', () => {
    heightInput.value = '';
    heightInput.focus();
    resetOutput();
});

weightResetBtn.addEventListener('click', () => {
    weightInput.value = '';
    weightInput.focus();
    resetOutput();
});