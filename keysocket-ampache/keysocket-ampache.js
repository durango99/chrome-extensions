function onKeyPress(key) {
    if (key === NEXT) {
        var nextButton = document.querySelector('a.jp-next');
        simulateClick(nextButton);
    } else if (key === PLAY) {		
        var isPlaying = document.querySelector('a.jp-play').style.display == 'none';
        var playPauseButton = null;
        if (isPlaying) {
            playPauseButton = document.querySelector('a.jp-pause');
        } else {
            playPauseButton = document.querySelector('a.jp-play');
        }
        simulateClick(playPauseButton);
    } else if (key === PREV) {
        var backButton = document.querySelector('a.jp-previous');
        simulateClick(backButton);
    }
}

console.log('keysocket: Loading Ampache extension');


