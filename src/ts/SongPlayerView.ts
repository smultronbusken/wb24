import SongPlayer from "./SongPlayer";
import { Cue } from "./SubtitleController";

class SongPlayerView {
    songPlayer: SongPlayer;

    constructor(songPlayer: SongPlayer) {
        this.songPlayer = songPlayer;
        songPlayer.on("onPause", () => this.pauseAudio())
        songPlayer.on("onPlay", () => this.playAudio())
        songPlayer.on("onChangeSubtitle", (cue: Cue) => this.updateSubtitle(cue))
    }
    
    public pauseAudio() {
        this.songPlayer.controlButton.textContent = 'Play';
    }

    public playAudio() {
        this.songPlayer.controlButton.textContent = 'Pause';
    }

    public updateSubtitle(cue: Cue) {
        this.songPlayer.subtitleElement.textContent = cue.text;
    }
}

export default SongPlayerView