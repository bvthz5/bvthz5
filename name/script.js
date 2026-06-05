// ==========================================
// 1. Name & Passion Animation Logic
// ==========================================

const names = [
    "Binil Vincent",
    "ബിനില്‍ വിന്‍സെന്റ്",
    "பினில் வின்சென்ட்",
    "ಬಿನಿಲ್ വിನ್ಸೆಂಟ್",
    "बिनिल विन्सेंट"
];

const passions = [
    "I specialize in Web Development.",
    "I have a keen interest in Cybersecurity & Ethical Hacking.",
    "I am dedicated to mastering DevOps practices."
];

let nameIndex = 1;
let passionIndex = 0;
const nameDisplay = document.getElementById("nameDisplay");
const passionStatement = document.getElementById("passionStatement");

// Function to Change Name
function changeName() {
    nameDisplay.classList.remove("curtain");
    void nameDisplay.offsetWidth; // Trigger reflow to restart CSS animation
    nameDisplay.classList.add("curtain");
    setTimeout(() => {
        nameDisplay.textContent = names[nameIndex];
        nameIndex = (nameIndex + 1) % names.length;
    }, 1000);
}

// Loop Name Change Every 10 Seconds
setInterval(changeName, 10000);

// Typewriter Effect
function typeWriterEffect(text, element, speed = 100) {
    let i = 0;
    element.textContent = "";
    function type() {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(type, speed);
        } else {
            setTimeout(() => eraseText(element, speed), 2000);
        }
    }
    type();
}

// Erase Text Effect
function eraseText(element, speed = 50) {
    let text = element.textContent;
    function erase() {
        if (text.length > 0) {
            text = text.slice(0, -1);
            element.textContent = text;
            setTimeout(erase, speed);
        } else {
            passionIndex = (passionIndex + 1) % passions.length;
            setTimeout(() => typeWriterEffect(passions[passionIndex], element, 100), 500);
        }
    }
    erase();
}

// Start Animations
typeWriterEffect(passions[passionIndex], passionStatement, 100);

// ==========================================
// 2. Interactive Audio Player Logic
// ==========================================

const songs = {
    ml: [
        { title: "Malare (From 'Premam')", artist: "Vijay Yesudas", url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3" },
        { title: "Darshana (From 'Hridayam')", artist: "Hesham Abdul Wahab", url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3" },
        { title: "Aaradhike (From 'Ambili')", artist: "Sooraj Santhosh", url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3" }
    ],
    ta: [
        { title: "Tum Tum (From 'Enemy')", artist: "Sri Vardhini", url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3" },
        { title: "Arabic Kuthu (From 'Beast')", artist: "Anirudh Ravichander", url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3" },
        { title: "Kaavaalaa (From 'Jailer')", artist: "Shilpa Rao", url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-6.mp3" }
    ],
    en: [
        { title: "Blinding Lights", artist: "The Weeknd", url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-7.mp3" },
        { title: "Shape of You", artist: "Ed Sheeran", url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3" },
        { title: "Stay", artist: "The Kid LAROI & Justin Bieber", url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-9.mp3" }
    ]
};

let currentLang = 'ml';
let currentTrackIndex = 0;
let isPlaying = false;
let isMuted = false;

// DOM Selectors for Player
const musicToggleBtn = document.getElementById("musicToggleBtn");
const musicPlayerPanel = document.getElementById("musicPlayerPanel");
const playerCloseBtn = document.getElementById("playerCloseBtn");
const vinylDisc = document.getElementById("vinylDisc");
const trackTitle = document.getElementById("trackTitle");
const trackArtist = document.getElementById("trackArtist");
const trackLangBadge = document.getElementById("trackLangBadge");
const audioElement = document.getElementById("audioElement");
const progressContainer = document.getElementById("progressContainer");
const progressBar = document.getElementById("progressBar");
const currentTimeEl = document.getElementById("currentTime");
const totalDurationEl = document.getElementById("totalDuration");
const prevBtn = document.getElementById("prevBtn");
const playBtn = document.getElementById("playBtn");
const nextBtn = document.getElementById("nextBtn");
const volumeBtn = document.getElementById("volumeBtn");
const volumeSlider = document.getElementById("volumeSlider");
const tabBtns = document.querySelectorAll(".tab-btn");
const songListEl = document.getElementById("songList");
const visualizerContainer = document.getElementById("visualizerContainer");

// Toggle Player Visibility
musicToggleBtn.addEventListener("click", () => {
    musicPlayerPanel.classList.add("active");
    musicToggleBtn.style.transform = "scale(0) rotate(180deg)";
});

playerCloseBtn.addEventListener("click", () => {
    musicPlayerPanel.classList.remove("active");
    musicToggleBtn.style.transform = "scale(1) rotate(0deg)";
});

// Load and Play Track
function loadTrack(lang, index) {
    const track = songs[lang][index];
    trackTitle.textContent = track.title;
    trackArtist.textContent = track.artist;
    trackLangBadge.textContent = lang === 'ml' ? 'Malayalam' : lang === 'ta' ? 'Tamil' : 'English';
    audioElement.src = track.url;
    
    // Highlight active song in list
    const items = songListEl.querySelectorAll(".song-item");
    items.forEach((item, idx) => {
        if (idx === index) {
            item.classList.add("active");
        } else {
            item.classList.remove("active");
        }
    });

    // Save preferences
    localStorage.setItem("player_lang", lang);
    localStorage.setItem("player_index", index);
}

function playTrack() {
    isPlaying = true;
    playBtn.textContent = "⏸";
    playBtn.title = "Pause";
    vinylDisc.classList.add("playing");
    visualizerContainer.classList.add("playing");
    
    audioElement.play().catch(err => {
        console.log("Playback interrupted/requires interaction:", err);
        pauseTrack();
    });
}

function pauseTrack() {
    isPlaying = false;
    playBtn.textContent = "▶";
    playBtn.title = "Play";
    vinylDisc.classList.remove("playing");
    visualizerContainer.classList.remove("playing");
    audioElement.pause();
}

// Play/Pause Button Toggle
playBtn.addEventListener("click", () => {
    if (isPlaying) {
        pauseTrack();
    } else {
        playTrack();
    }
});

// Prev & Next Controls
function prevTrack() {
    currentTrackIndex--;
    if (currentTrackIndex < 0) {
        currentTrackIndex = songs[currentLang].length - 1;
    }
    loadTrack(currentLang, currentTrackIndex);
    if (isPlaying) playTrack();
}

function nextTrack() {
    currentTrackIndex++;
    if (currentTrackIndex >= songs[currentLang].length) {
        currentTrackIndex = 0;
    }
    loadTrack(currentLang, currentTrackIndex);
    if (isPlaying) playTrack();
}

prevBtn.addEventListener("click", prevTrack);
nextBtn.addEventListener("click", nextTrack);

// End of track auto next
audioElement.addEventListener("ended", nextTrack);

// Progress Bar updates
audioElement.addEventListener("timeupdate", () => {
    const { currentTime, duration } = audioElement;
    if (duration) {
        const percent = (currentTime / duration) * 100;
        progressBar.style.width = `${percent}%`;
        currentTimeEl.textContent = formatTime(currentTime);
        totalDurationEl.textContent = formatTime(duration);
    }
});

// Click on progress bar to seek
progressContainer.addEventListener("click", (e) => {
    const width = progressContainer.clientWidth;
    const clickX = e.offsetX;
    const duration = audioElement.duration;
    if (duration) {
        audioElement.currentTime = (clickX / width) * duration;
    }
});

// Format time utility
function formatTime(seconds) {
    if (isNaN(seconds)) return "0:00";
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
}

// Volume Controls
volumeSlider.addEventListener("input", (e) => {
    const val = e.target.value;
    audioElement.volume = val;
    isMuted = val === "0";
    updateVolumeIcon(val);
    localStorage.setItem("player_volume", val);
});

volumeBtn.addEventListener("click", () => {
    if (isMuted) {
        const lastVol = localStorage.getItem("player_volume") || "0.7";
        audioElement.volume = parseFloat(lastVol);
        volumeSlider.value = lastVol;
        isMuted = false;
        updateVolumeIcon(lastVol);
    } else {
        audioElement.volume = 0;
        volumeSlider.value = 0;
        isMuted = true;
        updateVolumeIcon(0);
    }
});

function updateVolumeIcon(vol) {
    const v = parseFloat(vol);
    if (v === 0) {
        volumeBtn.textContent = "🔇";
    } else if (v < 0.4) {
        volumeBtn.textContent = "🔈";
    } else {
        volumeBtn.textContent = "🔊";
    }
}

// Tab Selection for Languages
tabBtns.forEach(btn => {
    btn.addEventListener("click", (e) => {
        tabBtns.forEach(b => b.classList.remove("active"));
        btn.classList.add("active");
        
        const langMap = { 'Malayalam': 'ml', 'Tamil': 'ta', 'English': 'en' };
        currentLang = langMap[btn.textContent] || 'ml';
        currentTrackIndex = 0;
        
        buildSongList(currentLang);
        loadTrack(currentLang, currentTrackIndex);
        if (isPlaying) playTrack();
    });
});

// Render track list in panel
function buildSongList(lang) {
    songListEl.innerHTML = "";
    songs[lang].forEach((song, index) => {
        const li = document.createElement("li");
        li.className = "song-item";
        if (index === currentTrackIndex) li.classList.add("active");
        
        li.innerHTML = `
            <span>${song.title}</span>
            <span style="font-size: 0.75rem; color: #8b949e;">${song.artist}</span>
        `;
        
        li.addEventListener("click", () => {
            currentTrackIndex = index;
            loadTrack(lang, index);
            playTrack();
        });
        
        songListEl.appendChild(li);
    });
}

// Restore user preferences on initialization
function initPlayer() {
    const savedLang = localStorage.getItem("player_lang") || "ml";
    const savedIndex = parseInt(localStorage.getItem("player_index") || "0", 10);
    const savedVol = localStorage.getItem("player_volume") || "0.7";
    
    currentLang = savedLang;
    currentTrackIndex = savedIndex;
    
    // Set volume
    audioElement.volume = parseFloat(savedVol);
    volumeSlider.value = savedVol;
    updateVolumeIcon(savedVol);
    
    // Highlight correct tab
    tabBtns.forEach(btn => {
        const langMap = { 'Malayalam': 'ml', 'Tamil': 'ta', 'English': 'en' };
        const btnLang = langMap[btn.textContent] || 'ml';
        if (btnLang === savedLang) {
            btn.classList.add("active");
        } else {
            btn.classList.remove("active");
        }
    });
    
    buildSongList(savedLang);
    loadTrack(savedLang, savedIndex);
}

// Initialize player
initPlayer();
