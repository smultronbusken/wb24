import TrackPlayer from "./TrackPlayer";
import { Cue } from "./SubtitleController";

class TrackPlayerView {
    trackPlayer: TrackPlayer;

    currentCue: Cue | undefined;


    constructor(trackPlayer: TrackPlayer) {
        this.trackPlayer = trackPlayer;
        trackPlayer.on("onPause", () => this.pauseAudio())
        trackPlayer.on("onPlay", () => this.playAudio())
        trackPlayer.on("onChangeSubtitle", (cue: Cue) => this.updateCue(cue))
        trackPlayer.on("onResetSubtitle", () => this.reset())
        trackPlayer.on("onTrackLoaded", (track: Track) => this.updateTrack(track))
    }
    
    pauseAudio() {
        this.trackPlayer.controlButton.textContent = 'Play';
    }

    playAudio() {
        this.trackPlayer.controlButton.textContent = 'Pause';   
    }

    updateCue(cue: Cue) {
        if (this.currentCue && this.currentCue.identifier == cue.identifier) return;

        this.currentCue = cue;
        const durationInSeconds = cue.end - cue.start 
        const textLength = this.currentCue.text.length;
        const interval = (durationInSeconds * 1000) / textLength;
        this.trackPlayer.typewriterElement.textContent = cue.text
    }

    reset() {
        this.currentCue = undefined;
        this.trackPlayer.typewriterElement.textContent = ""
        // Stop
        // Delete
    }
    
    updateTrack(track: Track) {
        this.trackPlayer.trackNameElement.textContent = track.index + ": " + track.title;
    }
    
}

export default TrackPlayerView