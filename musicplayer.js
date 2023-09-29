let previous = document.querySelector('#pre');
let play = document.querySelector('#play');
let next = document.querySelector('#next');
let title = document.querySelector('#title');
let recent_volume = document.querySelector('#volume');
let volume_show = document.querySelector('#volume_show');
let slider = document.querySelector('#duration_slider');
let show_duration = document.querySelector('#show_duration');
let track_image = document.querySelector('#track_image');
let auto_play = document.querySelector('#auto');
let present = document.querySelector('#present');
let total = document.querySelector('#total');
let artist = document.querySelector('#artist');


let timer;
let autoplay = 0;

let index_no = 0;
let Playing_song = false;

//create a audio Element
let track = document.createElement('audio');


//All songs list
let All_song = [{
		name: " Deja Vu",
		path: "music/Deja Vu [Initial D] - Nightcore-SpeedUp Remix [HQ].mp3",
		img: "images/initiald.jpg",
		singer: "Dave Rodgers",
        bg_color: "#fff",
		bg_video: "video/InitialD.mp4"
	},
	{
		name: "Love 2 Fast",
		path: "music/Steve Lacy - Love 2 Fast (Official Audio).mp3",
		img: "images/SteveLacy_ApolloXXI.webp",
		singer: "Steve Lacy",
        bg_color: "#fff",
		bg_video: "video/stevelacy.mp4"
	},
	{
		name: "Pluto Projector",
		path: "music/Rex Orange County - Pluto Projector (Official Audio).mp3",
		img: "images/rexx.jpg",
		singer: "Rex Orange County",
        bg_video: "video/plutoprojector.mp4"
	},

    {
		name: "Simpson Wave 1995",
		path: "music/SimpsonWave1995 (sped up).mp3",
		img: "images/cyberpunk.jpg",
		singer: "Frankjavcee",
        bg_video: "video/cy6ber.mp4"
	},

    {
		name: " Direct Confrontation",
		path: "music/Haikyuu!! 2nd Season OST - Direct Confrontation.mp3",
		img: "images/hinata.jpg",
		singer: "Yuki Hayashi",
        bg_video: "video/haikyuuvideo2.mp4"
	},
	 {
		name: " Romantic Homocide",
		path: "music/romantic.mp3",
		img: "images/romantic.png",
		singer: "D4vd",
        bg_video: "video/romantic.mp4"
	

	},
	{
		name: "Lost In Paradise",
		path:"music/lostinparadise.mp3",
		img: "images/lostinparadise.jpg",
		singer: "ALI",
		bg_video: "video/lostinparadise.mp4"
	},

	{
		name: "Midnight City",
		path: "music/midnigthcity.mp3",
		img: "images/hurryupweredreaming.jpg",
		singer: "M83",
		bg_video: "video/night.mp4"
	},

	{
		name: "Making Time",
		path: "music/makingtime.mp3",
		img:"images/rex.png",
		singer: "Rex Orange County",
		bg_video: "video/rexxx.mp4"
	},

	{
		name: "Paradise",
		path: "music/paradise.mp3",
		img: "images/mylox.jpg",
		singer: "Coldplay",
		bg_video: "video/paradise.mp4"
	}
];


// All functions


// function load the track



let previous_video = null;

function load_track(index_no) {
    clearInterval(timer);
    reset_slider();

    let bg_video = document.createElement("video");
    bg_video.src = All_song[index_no].bg_video;
    bg_video.style.position = "fixed";
    bg_video.style.top = "0";
    bg_video.style.left = "0";
    bg_video.style.width = "100%";
    bg_video.style.height = "100%";
    bg_video.style.objectFit = "cover";
    bg_video.style.zIndex = "-1";
    bg_video.loop = true;
    document.body.appendChild(bg_video);

    if (previous_video !== null) {
        previous_video.pause();
        previous_video.currentTime = 0;
        document.body.removeChild(previous_video);
    }

    bg_video.play();
    previous_video = bg_video;

    track.src = All_song[index_no].path;
    title.innerHTML = All_song[index_no].name;
    track_image.src = All_song[index_no].img;
    track_image.classList.add('spin');
    artist.innerHTML = All_song[index_no].singer;
    track.load();

    timer = setInterval(range_slider, 1000);
    total.innerHTML = All_song.length;
    present.innerHTML = index_no + 1;
	playsong(); // Start playing the track automatically
}
load_track(index_no);


//mute sound function
function mute_sound() {
	track.volume = 0;
	volume.value = 0;
	volume_show.innerHTML = 0;
	var volumeIcon = document.getElementById("volume_icon");
  volumeIcon.classList.remove("fa-volume-up");
  volumeIcon.classList.add("fa-volume-off");
}


// checking.. the song is playing or not
function justplay() {
	if (Playing_song == false) {
		playsong();

	} else {
		pausesong();
	}
}


// reset song slider
function reset_slider() {
	slider.value = 0;
}

// play song
function playsong() {
	track.play();
	Playing_song = true;
	play.innerHTML = '<i class="fa fa-pause" aria-hidden="true"></i>';
}

//pause song
function pausesong() {
	track.pause();
	Playing_song = false;
	play.innerHTML = '<i class="fa fa-play" aria-hidden="true"></i>';
}


// next song
function next_song() {
	if (index_no < All_song.length - 1) {
		index_no += 1;
		load_track(index_no);
		playsong();
        
	} else {
		index_no = 0;
		load_track(index_no);
		playsong();

	}
}


// previous song
function previous_song() {
	if (index_no > 0) {
		index_no -= 1;
		load_track(index_no);
		playsong();

	} else {
		index_no = All_song.length;
		load_track(index_no);
		playsong();
	}
}


// change volume
function volume_change() {
	volume_show.innerHTML = recent_volume.value;
	track.volume = recent_volume.value / 100;
	
	var volumeIcon = document.getElementById("volume_icon");
if (recent_volume.value > 0) {
  volumeIcon.classList.remove("fa-volume-off");
  volumeIcon.classList.add("fa-volume-up");
} else {
  volumeIcon.classList.remove("fa-volume-up");
  volumeIcon.classList.add("fa-volume-off");
}
}

// change slider position 
function change_duration() {
	slider_position = track.duration * (slider.value / 100);
	track.currentTime = slider_position;
}



// autoplay function
function autoplay_switch() {
	if (autoplay == 1) {
		autoplay = 0;
		auto_play.style.background = "rgba(255,255,255,0.2)";
	} else {
		autoplay = 1;
		auto_play.style.background = "#FF8A65";
	}
}


function range_slider() {
	let position = 0;

	// update slider position
	if (!isNaN(track.duration)) {
		position = track.currentTime * (100 / track.duration);
		slider.value = position;
	}


	// function will run when the song is over
	if (track.ended) {
		play.innerHTML = '<i class="fa fa-play" aria-hidden="true"></i>';
		if (autoplay == 1) {
			index_no += 1;
			load_track(index_no);
			playsong();
		}
	}

	
}


const selectElement= document.querySelector('#themething select.themeSelector');
const mainElement= document.querySelector('.main');

selectElement.addEventListener('change', function(){
	const selectedValue=this.value;

	if(selectedValue==='black'){
		mainElement.style.backgroundColor='rgba(6, 6, 6, 0.6)';

	} else if(selectedValue==='white'){
		mainElement.style.backgroundColor='rgba(255, 255, 255, 0.2)';
	}
	else if(selectedValue==='red'){
		mainElement.style.backgroundColor='rgba(238, 6, 6, 0.4)';
	}
	});

