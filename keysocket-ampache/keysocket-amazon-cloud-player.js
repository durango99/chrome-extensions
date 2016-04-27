function onKeyPress(key) {
    if (key === NEXT) {
        var nextButton = document.querySelector('span.playbackControls > span.button.nextButton.icon-fastForward');
        simulateClick(nextButton);
    } else if (key === PLAY) {
        var playPauseButton = document.querySelector('span.playbackControls > span.playButton');
        simulateClick(playPauseButton);
    } else if (key === PREV) {
        var backButton = document.querySelector('span.playbackControls > span.button.previousButton.icon-fastBackward');
        simulateClick(backButton);
    }
}
