const player = document.querySelector('.player');
const video = player.querySelector('.viewer');
const progress = player.querySelector('.progress');
const progressBar = player.querySelector('.progress__filled');
const skipButtons1 = player.querySelectorAll('.player__button1');
const skipButtons2 = player.querySelectorAll('.player__button2');
const ranges = player.querySelectorAll('.player__slider');
const h5Play = document.querySelector('.playText');
const h5Sound = document.querySelector('.soundText');
const speed = document.querySelector('.speed');
const bar = speed.querySelector('.speed-bar');

function togglePlay() {
    const method = video.paused ? 'play' : 'pause';
    video[method]();
}

function updateButton(){
    const icon = this.paused ? '►' : '❚❚';
    h5Play.textContent = icon;
}

function toggleSound(){
    if(video.volume == 1){
        video.volume = 0;
        h5Sound.textContent = '🔈';
    } else {
        video.volume = 1;
        h5Sound.textContent = '🔊';
    }
    console.log(video.volume);
  }
  
function skipBefore(){
    video.currentTime += parseFloat('-10');
}

function skipAfter(){
    video.currentTime += parseFloat('10');
}

function handleRangeUpdate(){
    video[this.name] = this.value;
}

function handleProgress(){
    const percent = (video.currentTime / video.duration) * 100;
    progressBar.style.flexBasis = `${percent}%`;
}

function scrub(e){
    const scrubTime =(e.offsetX / progress.offsetWidth)* video.duration;
    video.currentTime = scrubTime;
}

function handleMove(e) {
    const x = e.pageX - this.offsetLeft;
    const percent = x / this.offsetWidth;
    const min = 0.4;
    const max = 4;
    const width = Math.round(percent * 100) + '%';
    const playbackRate = percent * (max - min) + min;
    bar.style.width = width;
    bar.textContent = playbackRate.toFixed(2) + '×';
  }

  function handleClick(e) {
    const x = e.pageX - this.offsetLeft;
    const percent = x / this.offsetWidth;
    const min = 0.4;
    const max = 4;
    const width = Math.round(percent * 100) + '%';
    const playbackRate = percent * (max - min) + min;
    bar.style.width = width;
    bar.textContent = playbackRate.toFixed(2) + '×';
    video.playbackRate = playbackRate;
  }

video.addEventListener('click', togglePlay);
video.addEventListener('play', updateButton);
video.addEventListener('pause', updateButton);
video.addEventListener('timeupdate', handleProgress);

skipButtons1.forEach(div => div.addEventListener('click', skipBefore));
skipButtons2.forEach(div => div.addEventListener('click', skipAfter));

ranges.forEach(range => range.addEventListener('change', handleRangeUpdate));
ranges.forEach(range => range.addEventListener('mousemove', handleRangeUpdate));

let mousedown = false;
progress.addEventListener('click', scrub);
progress.addEventListener('mousemove', (e) => mousedown && scrub(e));
progress.addEventListener('mousedown', () => mousedown = true);
progress.addEventListener('mouseup', () => mousedown = false);

speed.addEventListener('mousemove', handleMove);
speed.addEventListener('click', handleClick);




