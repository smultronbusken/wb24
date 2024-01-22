import TrackPlayer from "./TrackPlayer";
import { Cue } from "./SubtitleController";

class TrackPlayerView {
    trackPlayer: TrackPlayer;

    constructor(trackPlayer: TrackPlayer) {
        this.trackPlayer = trackPlayer;
        trackPlayer.on("onPause", () => this.pauseAudio())
        trackPlayer.on("onPlay", () => this.playAudio())
        trackPlayer.on("onChangeSubtitle", (text: string) => this.updateSubtitle(text))
    }
    
    public pauseAudio() {
        this.trackPlayer.controlButton.textContent = 'Play';
    }

    public playAudio() {
        this.trackPlayer.controlButton.textContent = 'Pause';
    }

    public updateSubtitle(text: string) {
        this.trackPlayer.subtitleElement.textContent = text;
    }
}

export default TrackPlayerView