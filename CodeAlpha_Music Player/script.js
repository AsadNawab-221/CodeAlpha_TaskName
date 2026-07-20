// Songs List
const songs = [
    {
        title: "Tum hi ho Bandhu",
        artist: "Pritam, Neeraj Shridhar, Kavita Seth",
        src: "music/Song 01.mp3",
        cover: "Cover images/cover image 01.jpg"
    },
    {
        title: "Gehra Hua",
        artist: "Arijit SIngh",
        src: "music/Song 02.mp3",
        cover: "Cover images/cover image 02.jpg"
    },
    {
        title: "Ve Junoon",
        artist: "Subodhh Sharma",
        src: "music/Song 03.mp3",
        cover: "Cover images/cover image 3.jpg"
    },
    
];

// Elements
const audio = document.getElementById("audio");
const title = document.getElementById("title");
const artist = document.getElementById("artist");
const cover = document.getElementById("cover");

const playBtn = document.getElementById("play");
const nextBtn = document.getElementById("next");
const prevBtn = document.getElementById("prev");

const progress = document.getElementById("progress");
const volume = document.getElementById("volume");

const currentTime = document.getElementById("currentTime");
const duration = document.getElementById("duration");

const playlist = document.getElementById("playlist");

let currentSong = 0;
let isPlaying = false;

// Load Song
function loadSong(index){

    title.innerText = songs[index].title;
    artist.innerText = songs[index].artist;
    cover.src = songs[index].cover;
    audio.src = songs[index].src;

    updatePlaylist();
}

loadSong(currentSong);

// Play Song
function playSong(){

    audio.play();
    isPlaying = true;

    playBtn.innerHTML =
    '<i class="fas fa-pause"></i>';

}

// Pause Song
function pauseSong(){

    audio.pause();
    isPlaying = false;

    playBtn.innerHTML =
    '<i class="fas fa-play"></i>';

}

// Play Button
playBtn.addEventListener("click",()=>{

    if(isPlaying){
        pauseSong();
    }else{
        playSong();
    }

});

// Next Song
function nextSong(){

    currentSong++;

    if(currentSong >= songs.length){
        currentSong = 0;
    }

    loadSong(currentSong);
    playSong();

}

nextBtn.addEventListener("click",nextSong);

// Previous Song
function prevSong(){

    currentSong--;

    if(currentSong < 0){
        currentSong = songs.length - 1;
    }

    loadSong(currentSong);
    playSong();

}

prevBtn.addEventListener("click",prevSong);

// Progress Bar
audio.addEventListener("timeupdate",()=>{

    if(audio.duration){

        progress.value =
        (audio.currentTime / audio.duration) * 100;

        currentTime.innerText =
        formatTime(audio.currentTime);

        duration.innerText =
        formatTime(audio.duration);

    }

});

// Seek
progress.addEventListener("input",()=>{

    audio.currentTime =
    (progress.value / 100) * audio.duration;

});

// Volume
volume.addEventListener("input",()=>{

    audio.volume = volume.value;

});

// Auto Next Song
audio.addEventListener("ended",nextSong);

// Format Time
function formatTime(time){

    const minutes = Math.floor(time / 60);

    let seconds = Math.floor(time % 60);

    if(seconds < 10){
        seconds = "0" + seconds;
    }

    return minutes + ":" + seconds;

}

// Playlist
function updatePlaylist(){

    playlist.innerHTML = "";

    songs.forEach((song,index)=>{

        const li = document.createElement("li");

        li.innerHTML =
        "🎵 " + song.title + " - " + song.artist;

        if(index === currentSong){
            li.classList.add("active");
        }

        li.addEventListener("click",()=>{

            currentSong = index;
            loadSong(currentSong);
            playSong();

        });

        playlist.appendChild(li);

    });

}