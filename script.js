const testWrapper = document.querySelector(".test-wrapper");
const testArea = document.querySelector("#test-area");
const originText = document.querySelector("#origin-text p").innerHTML;
const resetButton = document.querySelector("#reset");
const theTimer = document.querySelector(".timer");

var timer = [0, 0, 0, 0];
var interval;
var stoppingTimer = false;
var wordsPerMin;

// Add leading zero to numbers 9 or below (purely for aesthetics):
function leadingZero(time) {
    if (time <= 9) {
        time = '0' + time;
    }
    return time;
}

// Run a standard minute/second/hundredths timer:
function runTimer() {
    let counterTime = leadingZero(timer[0]) + ':' + leadingZero(timer[1]) + ':' + leadingZero(timer[2])
    theTimer.innerHTML = counterTime;
    timer[3]++;
    timer[0] = Math.floor((timer[3] / 100) / 60);
    timer[1] = Math.floor((timer[3] / 100) - (timer[0] * 60));
    timer[2] = Math.floor((timer[3]) - (timer[1] * 100) - (timer[0] * 60 * 100));

}

// Match the text entered with the provided text on the page:
function spellCheck() {
    let textEntered = testArea.value;
    let originTextMatch = originText.substring(0, textEntered.length);
    if (textEntered == originText) {
        wordsPerMin = (originText.length) / (timer[0] * 60 + '.' + (timer[1]) + (timer[2]));
        wordsPerMin = Math.floor(wordsPerMin);
        console.log(wordsPerMin);
        clearInterval(interval);
        testWrapper.style.borderColor = "green";
    } else {
        if (textEntered == originTextMatch) {
            testWrapper.style.borderColor = "blue";
        } else {
            testWrapper.style.borderColor = "red";
        }
    }
}


// Start the timer:
function start() {
    let textEnteredLength = testArea.value.length;
    if (textEnteredLength === 0 && !stoppingTimer) {
        stoppingTimer = true;
        interval = setInterval(runTimer, 10);
    }
}

// Reset everything:
function reset() {
    clearInterval(interval);
    interval = null;
    timer = [0, 0, 0, 0];
    stoppingTimer = false;
    testArea.value = '';
    theTimer.innerHTML = '00:00:00';
    testWrapper.style.borderColor = "grey";
    console.log('Reset button has been pressed')
}

// Event listeners for keyboard input and the reset button:
testArea.addEventListener('keypress', start, false);
testArea.addEventListener('keyup', spellCheck, false);
resetButton.addEventListener('click', reset, false);

// Enhance this by adding words per minute count
// workingOn

// Error count

// Add array of different text to switch in between

// High score board for single user