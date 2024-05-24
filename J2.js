let startTime;
let updatedTime;
let difference;
let tInterval;
let running = false;
let lapCounter = 0;
let savedTime = 0;

const display = document.getElementById('display');
const startStopBtn = document.getElementById('startStopBtn');
const resetBtn = document.getElementById('resetBtn');
const lapBtn = document.getElementById('lapBtn');
const lapsList = document.getElementById('laps');

startStopBtn.addEventListener('click', startStop);
resetBtn.addEventListener('click', reset);
lapBtn.addEventListener('click', recordLap);

function startStop() {
    if (!running) {
        startTime = new Date().getTime() - savedTime;
        tInterval = setInterval(getShowTime, 1);
        running = true;
        startStopBtn.innerHTML = 'Pause';
        startStopBtn.style.backgroundColor = '#ffc107'; 
    } else {
        savedTime = new Date().getTime() - startTime;
        clearInterval(tInterval);
        running = false;
        startStopBtn.innerHTML = 'Start';
        startStopBtn.style.backgroundColor = '#4caf50';
    }
}

function reset() {
    clearInterval(tInterval);
    savedTime = 0;
    running = false;
    startStopBtn.innerHTML = 'Start';
    startStopBtn.style.backgroundColor = '#4caf50';
    display.innerHTML = '00:00:00.000';
    lapsList.innerHTML = '';
    lapCounter = 0;
}

function getShowTime() {
    updatedTime = new Date().getTime();
    difference = updatedTime - startTime;
    
    const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((difference % (1000 * 60)) / 1000);
    const milliseconds = difference % 1000;
    
    display.innerHTML = 
        (hours < 10 ? '0' + hours : hours) + ':' + 
        (minutes < 10 ? '0' + minutes : minutes) + ':' + 
        (seconds < 10 ? '0' + seconds : seconds) + '.' + 
        (milliseconds < 100 ? (milliseconds < 10 ? '00' + milliseconds : '0' + milliseconds) : milliseconds);
}

function recordLap() {
    if (running) {
        lapCounter++;
        const lapTime = document.createElement('li');
        lapTime.innerHTML = 'Lap ' + lapCounter + ': ' + display.innerHTML;
        lapsList.appendChild(lapTime);
    }
}
