let counter1 = 2;
let counter2 = 50;

function updateCounter(step, direction) {
    counter1 += step * direction;
    if (counter1 < 0) counter1 = 0;
    if (counter1 > 15) counter1 = 15;
    document.getElementById('counter1-value').textContent = counter1;
}

function updateCounter2(step, direction) {
    counter2 += step * direction;
    if (counter2 < 0) counter2 = 0;
    if (counter2 > 100) counter2 = 100;
    document.getElementById('counter2-value').textContent = counter2.toString().padStart(2, '0');
}

function resetCounters() {
    counter1 = 2;
    counter2 = 50;
    document.getElementById('counter1-value').textContent = counter1;
    document.getElementById('counter2-value').textContent = counter2.toString().padStart(2, '0');
}

let totalSeconds = 0;
let timerInterval = null;
let lastStartTime = 0;
let resetStage = 0;

function updateDisplay(seconds) {
    const mins = String(Math.floor(seconds / 60)).padStart(2, '0');
    const secs = String(seconds % 60).padStart(2, '0');
    document.getElementById("timer").textContent = `${mins}:${secs}`;
}

function addTime(minutes) {
    totalSeconds += minutes * 60;
    updateDisplay(totalSeconds);
}

function setAddTimeButtons(enabled) {
    document.getElementById('add1').disabled = !enabled;
    document.getElementById('add5').disabled = !enabled;
    document.getElementById('add10').disabled = !enabled;
}

function startTimer() {
    if (timerInterval !== null) return; // prevent multiple intervals

    lastStartTime = totalSeconds;
    resetStage = 0;

    setAddTimeButtons(false); // Disable add time buttons

    timerInterval = setInterval(() => {
        if (totalSeconds <= 0) {
            clearInterval(timerInterval);
            timerInterval = null;
            return;
        }
        totalSeconds--;
        updateDisplay(totalSeconds);
    }, 1000);
}

function resetTimer() {
    if (resetStage === 0) {
        totalSeconds = lastStartTime;
        updateDisplay(totalSeconds);
        resetStage = 1;
    } else {
        totalSeconds = 0;
        updateDisplay(totalSeconds);
        resetStage = 0;
    }

    if (timerInterval !== null) {
        clearInterval(timerInterval);
        timerInterval = null;
    }

    setAddTimeButtons(true); // Enable add time buttons
}

// Initialize display and enable add time buttons
updateDisplay(totalSeconds);
setAddTimeButtons(true);

// Add event listeners for counter 1
document.getElementById('counter1-plus1').addEventListener('click', () => updateCounter(1, 1));
document.getElementById('counter1-minus1').addEventListener('click', () => updateCounter(1, -1));
document.getElementById('counter1-plus10').addEventListener('click', () => updateCounter(10, 1));
document.getElementById('counter1-minus10').addEventListener('click', () => updateCounter(10, -1));

// Add event listeners for counter 2
document.getElementById('counter2-plus1').addEventListener('click', () => updateCounter2(1, 1));
document.getElementById('counter2-minus1').addEventListener('click', () => updateCounter2(1, -1));
document.getElementById('counter2-plus10').addEventListener('click', () => updateCounter2(10, 1));
document.getElementById('counter2-minus10').addEventListener('click', () => updateCounter2(10, -1));

// Add event listener for reset counters
document.getElementById('reset-counters').addEventListener('click', resetCounters);

// Add event listeners for timer controls
document.getElementById('add1').addEventListener('click', () => addTime(1));
document.getElementById('add5').addEventListener('click', () => addTime(5));
document.getElementById('add10').addEventListener('click', () => addTime(10));
document.getElementById('start-timer').addEventListener('click', startTimer);
document.getElementById('reset-timer').addEventListener('click', resetTimer);