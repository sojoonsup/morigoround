// Background Sound
var audioElem = document.getElementById('audio');

function loadAudio(){
    audioElem.src = "src/audio/bg-low.mp3";
    document.getElementById('audio').load();
    console.log('** Loading Background Audio...');
}

function toggleMute(){
	console.log('===============');
	audioElem.muted = !audioElem.muted;

	if(audioElem.muted){
		document.getElementById('audio-toggle').className += "muted";
		document.getElementById('audio-eq').src = "src/img/eq.png";
	}
	else{
		document.getElementById('audio-toggle').className -= "muted";
		document.getElementById('audio-eq').src = "src/img/eq.gif";
	}
}

loadAudio();