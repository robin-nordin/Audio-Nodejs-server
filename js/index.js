const playButton = document.querySelector('#playpause');
const audioElem = document.querySelector('#audio');
const forwardButton = document.querySelector('#playforward');
const backwardButton = document.querySelector('#playback');
const progressElem = document.querySelector('.progress');
const volumeElem = document.querySelector('#volume');
const progressBarElem = document.querySelector('.progressbar');
const timerUp = document.querySelector('#timerup');
const timerDown = document.querySelector('#timerdown');
const volumeText = document.querySelector('#volumetext');

let musicPlaying = false; 
let counter;

playButton.addEventListener('click', function() {
    if (musicPlaying === false) {
        playButton.setAttribute('src', 'img/pause.svg')
        musicPlaying = true;
        playMusic();
    } else {
        playButton.setAttribute('src', 'img/play.svg')
        musicPlaying = false;
        pauseMusic();
    }
});

backwardButton.addEventListener('click', () => audioElem.currentTime -= 10);
forwardButton.addEventListener('click', () => audioElem.currentTime += 10);

function playMusic() {{}
    console.log('Playing music');
    audioElem.play();
    //counter = setInterval(progressCounter, 10);
}

function pauseMusic() {
    console.log('Pausing music');
    audioElem.pause();
    //clearInterval(counter);
}

audioElem.ontimeupdate = function() {
    let durationProgress = (audioElem.currentTime / audioElem.duration) * 300;
    progressElem.style.width = durationProgress + 'px';
    displayTime();
}

audioElem.addEventListener('ended', function() {
    progressElem.style.width = '0px';
    playButton.setAttribute('src', 'img/play.svg')
    musicPlaying = false;
});

volumeElem.addEventListener('mousemove', function() {
    //console.log(volumeElem.value/100);
    audioElem.volume = volumeElem.value / 100;
    volumeText.innerHTML = 'Volume: ' + volumeElem.value;
});

progressBarElem.addEventListener('click', function(event) {
    audioElem.currentTime = ((event.offsetX / 300) * audioElem.duration);
});

function displayTime() {
    let currentTime = audioElem.currentTime;
    let timerUpMinutes = Math.floor(currentTime / 60);
    let timerUpSeconds = Math.floor(currentTime - timerUpMinutes * 60);
    
    let timeLeft = audioElem.duration - currentTime;
    let timerDownMinutes = Math.floor(timeLeft / 60);
    let timerDownSeconds = Math.floor(timeLeft - timerDownMinutes * 60);

    if (timerUpSeconds < 10) {
        timerUp.innerHTML = timerUpMinutes + ':0' + timerUpSeconds;
    } else {
        timerUp.innerHTML = timerUpMinutes + ':' + timerUpSeconds;
    }

    if (timerDownSeconds < 10) {
        timerDown.innerHTML = '-' + timerDownMinutes + ':0' + timerDownSeconds;
    } else {
        timerDown.innerHTML = '-' + timerDownMinutes + ':' + timerDownSeconds;
    }
    
};

/*
function progressCounter() {
    console.log('hej');
    let durationProgress = parseInt((audioElem.currentTime / audioElem.duration) * 300);
    progressElem.style.width = durationProgress + 'px';
}
*/