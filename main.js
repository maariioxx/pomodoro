timeDisplay = document.querySelector(".time");
workInput = document.querySelector(".work-time");
restInput = document.querySelector(".rest-time");
startButton = document.querySelector(".start");
pauseButton = document.querySelector(".pause");
stopButton = document.querySelector(".stop");


let interval;
let time;
let startingMinutes;
let audio = new Audio('./images and audio/alarm.mp3');
let rest = false;
let started = false;
let paused = false;

function runWorkCountdown(){{
    if(time >= 0){
    minutes = Math.floor(time / 60);
    seconds = time % 60;
    time--;
    }
    if(time === 0){
        audio.play();
        if(rest === false) return rest ? true : false;
        console.log(rest === false);
        if(parseInt(restInput.value) < 10){
            timeDisplay.textContent = `0${parseInt(restInput.value)} : 00`
        } else timeDisplay.textContent = `${parseInt(restInput.value)} : 00`
    }
    timeDisplay.textContent = `${minutes} : ${seconds}`;
    if (minutes < 10 && seconds < 10){
        timeDisplay.textContent = `0${minutes} : 0${seconds}`
    } else if (minutes < 10){
        timeDisplay.textContent = `0${minutes} : ${seconds}`
    } else if (seconds < 10){
        timeDisplay.textContent = `${minutes} : 0${seconds}`
    }
}}

startButton.addEventListener("click", () => {
    if(time <= 0){
        if(rest === false) {rest = true} else {rest = false};
    }
    console.log(rest)
    if(rest != true){
        startingMinutes = parseInt(workInput.value);
    } else {
        startingMinutes = parseInt(restInput.value);
    }
    if(paused === true) {
        let currentTime = timeDisplay.innerHTML.split(":");
        time = Number(currentTime[0]) * 60 + Number(currentTime[1]);
        paused = false;
    } else{
        time = startingMinutes * 60;
    }
    if(started != true){
    interval = setInterval(runWorkCountdown, 1000);
    started = true;
    }
})

pauseButton.addEventListener("click", () => {
    clearInterval(interval);
    started = false;
    paused = true;
})

stopButton.addEventListener("click", () => {
    clearInterval(interval);
    time = 0;
    timeDisplay.textContent = "00 : 00";
    started = false;
    paused = false;
})