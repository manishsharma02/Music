const audio = document.getElementById('audio');
const title = document.getElementById('title');
const artist = document.getElementById('artist');
const progress = document.getElementById('progress');
const progressContainer = document.querySelector('.progress-container');
const durationText = document.getElementById('duration');

let songs = [
  { title: "Sample Song", artist: "Artist Name", src: "music/song1.mp3" }
];

let songIndex = 0;
let isPlaying = false;

function loadSong(song) {
  title.textContent = song.title;
  artist.textContent = song.artist;
  audio.src = song.src;
}

function playPause() {
  if (isPlaying) {
    audio.pause();
  } else {
    audio.play();
  }
}

audio.onplay = () => { isPlaying = true; };
audio.onpause = () => { isPlaying = false; };

function prevSong() {
  songIndex = (songIndex - 1 + songs.length) % songs.length;
  loadSong(songs[songIndex]);
  audio.play();
}

function nextSong() {
  songIndex = (songIndex + 1) % songs.length;
  loadSong(songs[songIndex]);
  audio.play();
}

audio.ontimeupdate = () => {
  const { duration, currentTime } = audio;
  const percent = (currentTime / duration) * 100;
  progress.style.width = percent + '%';

  let totalMins = Math.floor(duration / 60) || 0;
  let totalSecs = Math.floor(duration % 60) || 0;
  let currentMins = Math.floor(currentTime / 60);
  let currentSecs = Math.floor(currentTime % 60);

  durationText.textContent = `${currentMins}:${currentSecs.toString().padStart(2, '0')} / ${totalMins}:${totalSecs.toString().padStart(2, '0')}`;
};

function setProgress(e) {
  const width = progressContainer.clientWidth;
  const clickX = e.offsetX;
  const duration = audio.duration;
  audio.currentTime = (clickX / width) * duration;
}

function changeVolume(val) {
  audio.volume = val;
}

// Initial load
loadSong(songs[songIndex]);
