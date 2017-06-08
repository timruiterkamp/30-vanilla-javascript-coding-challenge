const player = document.querySelector('.player');
const video = player.querySelector('.viewer');
const progress = player.querySelector('.progress');
const progressBar= player.querySelector('.progress__filled');
const toggle = player.querySelector('.toggle');
const skipButtons = player.querySelectorAll('[data-skip]');
const ranges = player.querySelectorAll('.player__slider');

function togglePlay() {
  if(video.paused) {
    video.play();
  } else {
    video.pause();
  }
}

function updateButton() {
  const icon = this.paused ? '►' : '❚ ❚'; // change the play and pause icon
  toggle.textContent = icon;
  console.log('update the button');
}

function skip() {
  console.log(this.dataset.skip);
  video.currentTime += parseFloat(this.dataset.skip); // use the dataset to skip through the video
}

function handleUpdate() {
  video[this.name] = this.value;
}

function handleProgress() {
  const percent = (video.currentTime / video.duration) * 100;
  progressBar.style.flexBasis = `${percent}%`; // use the calculation of percent to calculate the position of the progressbar
}

function scrub(e) {
  const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration;
  video.currentTime = scrubTime; // make the progressbar filled to the point u have clicked
}

video.addEventListener('click', togglePlay);
video.addEventListener('play', updateButton);
video.addEventListener('pause', updateButton);
video.addEventListener('timeupdate', handleProgress);

toggle.addEventListener('click', togglePlay);
skipButtons.forEach(button => button.addEventListener('click', skip));

ranges.forEach(range => range.addEventListener('click', handleUpdate));
ranges.forEach(range => range.addEventListener('mousemove', handleUpdate));

let mousedown = false;
progress.addEventListener('click', scrub);
progress.addEventListener('mousemove', (e) => mousedown && scrub(e)); // only fire event if mouse is down and clicked
progress.addEventListener('mousedown', () => mousedown = true);
progress.addEventListener('mouseup', () => mousedown = false);
