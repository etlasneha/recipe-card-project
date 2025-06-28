function toggleSection(id) {
    const el = document.getElementById(id);
    el.classList.toggle("hidden");
    // Update button text
    const btn = Array.from(document.querySelectorAll('button')).find(b => b.getAttribute('onclick') && b.getAttribute('onclick').includes(id));
    if (btn) {
        btn.textContent = el.classList.contains('hidden') ? `Show ${capitalize(id)}` : `Hide ${capitalize(id)}`;
    }
}

function capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

let stepIndex = 0;
let timerInterval = null;
let timeLeft = 15 * 60; // 15 minutes in seconds

function startCooking() {
    const steps = document.querySelectorAll("#steps li");
    if (steps.length === 0) return;
    stepIndex = 0;
    steps.forEach(step => step.style.background = "");
    document.getElementById("progress").style.width = "0";
    // Show steps if hidden
    const stepsList = document.getElementById('steps');
    if (stepsList.classList.contains('hidden')) toggleSection('steps');
    // Remove any existing Next button
    const oldNext = document.getElementById('nextBtn');
    if (oldNext) oldNext.remove();
    // Start timer
    resetTimer();
    startTimer();
    highlightStep(steps);
}

function highlightStep(steps) {
    steps.forEach(step => step.style.background = "");
    if (stepIndex < steps.length) {
        steps[stepIndex].style.background = "#d1f7d6";
        document.getElementById("progress").style.width = ((stepIndex + 1) / steps.length * 100) + "%";
        // Add Next button if not last step
        addNextButton(steps);
    } else {
        document.getElementById("progress").style.width = "100%";
        removeNextButton();
    }
}

function addNextButton(steps) {
    removeNextButton();
    if (stepIndex < steps.length) {
        const nextBtn = document.createElement('button');
        nextBtn.id = 'nextBtn';
        nextBtn.textContent = stepIndex === steps.length - 1 ? 'Finish' : 'Next';
        nextBtn.style.marginLeft = '10px';
        nextBtn.onclick = function() {
            stepIndex++;
            highlightStep(steps);
        };
        document.querySelector('.info').appendChild(nextBtn);
    }
}

function removeNextButton() {
    const oldNext = document.getElementById('nextBtn');
    if (oldNext) oldNext.remove();
}

function resetTimer() {
    clearInterval(timerInterval);
    timeLeft = 15 * 60;
    updateTimerDisplay();
}

function startTimer() {
    updateTimerDisplay();
    timerInterval = setInterval(() => {
        if (timeLeft > 0) {
            timeLeft--;
            updateTimerDisplay();
        } else {
            clearInterval(timerInterval);
            document.getElementById('timer').textContent = 'Time\'s up!';
        }
    }, 1000);
}

function updateTimerDisplay() {
    const min = Math.floor(timeLeft / 60);
    const sec = timeLeft % 60;
    document.getElementById('timer').textContent = `Time Left: ${min}:${sec.toString().padStart(2, '0')}`;
}

// On page load, set correct button text for toggles
window.onload = function() {
    ['ingredients', 'steps'].forEach(id => {
        const el = document.getElementById(id);
        const btn = Array.from(document.querySelectorAll('button')).find(b => b.getAttribute('onclick') && b.getAttribute('onclick').includes(id));
        if (btn) {
            btn.textContent = el.classList.contains('hidden') ? `Show ${capitalize(id)}` : `Hide ${capitalize(id)}`;
        }
    });
    document.getElementById('timer').textContent = '';
};
