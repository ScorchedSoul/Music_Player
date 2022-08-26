// JAVASCRIPT FILE

'use strict';

const image = document.querySelector('img');
const songName = document.getElementById('songName');
const artistName = document.getElementById('artistName');

const music = document.querySelector('audio');
const progressContainer = document.getElementById('progress-container');
const progress = document.getElementById('progress');

const prevBtn = document.getElementById('prev');
const playBtn = document.getElementById('play');
const nextBtn = document.getElementById('next');


// music array

const songs = [
    {
        name: 'm1',
        displayName : 'Alag Aasmaan',
        artistName : 'Anu Jain',
    },
    {
        name: 'm2',
        displayName: 'Dhalti Rahe',
        artistName: 'Twin Strings',
    },
    {
        name: 'm3',
        displayName: 'Muskaan',
        artistName: 'Dikshant',
    },
    {
        name: 'm4',
        displayName: 'Dil Patang',
        artistName: 'KhoslaRaghu',
    },
    {
        name: 'm5',
        displayName : 'Kaari',
        artistName : 'Adarsh Rao',
    },
    {
        name: 'm6',
        displayName : 'O Meri Laila',
        artistName : 'Atif Aslam',
    },
    {
        name: 'm7',
        displayName : 'Aaj Mohabbat',
        artistName : 'Aditya Rikhari',
    },
    {
        name: 'm8',
        displayName : 'Pahadon Mein',
        artistName : 'Salman Elahi',
    },
    {
        name: 'm9',
        displayName : 'Sang Rahiyo',
        artistName : 'Jasleen Royal',
    },
    {
        name: 'm10',
        displayName : 'Khoya',
        artistName : 'Aseem',
    }
]

// check if playing
let isPlaying = false ;

// paly
const playSong = function()
{
    isPlaying = true ;
    playBtn.classList.replace('fa-circle-play' , 'fa-circle-pause');
    music.play();
}

// pause
const pauseSong = function()
{
    isPlaying = false ;
    playBtn.classList.replace('fa-circle-pause', 'fa-circle-play');
    music.pause();
}

// play or pause

playBtn.addEventListener('click',function()
{
    isPlaying ? pauseSong() : playSong() ;
})

// updating dom

function loadSong(songs)
{
    songName.textContent = songs.displayName;
    artistName.textContent = songs.artistName;
    // music.src = `music/${songs.name}.mp3`;
    music.src = `music_new/${songs.name}.mp3`;
    // image.src = `img/${songs.name}.jpg`;
    image.src = `img/${songs.name}.jpg`;
}

// current song
let songIndex = 0;

const nextSong = function()
{
    songIndex++;

    // song changes to 0 after 3
    if (songIndex > songs.length -1 )
    {
        songIndex = 0;
    }

    loadSong(songs[songIndex]);
    playSong();
}

const prevSong = function()
{
    songIndex-- ;

    // song changes to 3 before 0
    if (songIndex < 0)
    {
        songIndex = songs.length - 1;
    }

    loadSong(songs[songIndex]);
    playSong();
}

// on load select first song
loadSong(songs[songIndex]);


// update progress bar and time
const updateProgressBar = function(e)
{
    if (isPlaying)
    {
        const { duration , currentTime} = e.srcElement;

        // update progress bar 
        const progressPercent = (currentTime / duration)*100 ;
        progress.style.width = `${progressPercent}%`;
    }
        
    }



    

// progress bar updated
music.addEventListener('timeupdate', updateProgressBar);

// setting progress bar manually
function setProgressBar (e)
{
    const width = this.clientWidth ;
    const clickX = e.offsetX;
    const {duration }= music;

    music.currentTime = (clickX/width) * duration ;
}

// progress bar set manually
progressContainer.addEventListener('click' , setProgressBar);


// music ends
music.addEventListener('ended', nextSong);


//Event Listners
prevBtn.addEventListener('click', prevSong);
nextBtn.addEventListener('click', nextSong);
music.addEventListener('ended', nextSong);
music.addEventListener('timeupdate', updateProgressBar);
