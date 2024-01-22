
import EventEmitter from "events";
import AudioPlayer from "./AudioPlayer";
import BackgroundController from "./BackgroundController";
import SubtitleController, { Cue } from "./SubtitleController";

type SongPlayerEventName =
    "onPause" |
    "onChangeSubtitle" |
    "onPlay";

class SongPlayer {

    audioPlayer: AudioPlayer = new AudioPlayer;
    subtitleController: SubtitleController = new SubtitleController;
    backgroundController: BackgroundController = new BackgroundController;

    public subtitleElement: HTMLElement;
    public controlButton: HTMLElement;

    private ee: EventEmitter = new EventEmitter;

    constructor() {
        this.controlButton = this.loadElement('audioControl');
        this.subtitleElement = this.loadElement('subtitle');
        this.setUpAudioControls();
        setInterval(() => {
            const time = this.audioPlayer.getCurrentTime(); 
            const cue = this.subtitleController.getCue(time);
            if (cue)
                this.updateSubtitle(cue);
        }, 500); // Check every 500 milliseconds
    }

    private loadElement(id: string): HTMLElement {
        let element = document.getElementById(id)
        if (!element) {
            throw new Error("Can not find element with id: " + id);
        } else {
            return element
        }
    }

    public on(eventName: SongPlayerEventName, listener: (...args: any[]) => void) {
        this.ee.on(eventName, listener)
    }

    public async loadSong(song: Song) {
        console.log("Loading song " + song.title)
        await this.audioPlayer.loadAudio(song.songURL)
        await this.subtitleController.loadVTT(song.VTTURL)
        await this.backgroundController.load(song.backgroundURL);
    }

    public async play() {
        this.playAudio();
    }

    public setUpAudioControls() {
        this.controlButton.addEventListener('click', () => {
            this.changeAudioPlayback()
        });
    }

    public changeAudioPlayback() {
        this.audioPlayer.isPlaying ? this.pauseAudio() : this.playAudio()
    }

    public async pauseAudio() {
        await this.audioPlayer.pause();
        this.ee.emit("onPause")
    }

    public async playAudio() {
        await this.audioPlayer.playAudio();
        this.ee.emit("onPlay")
    }

    public async updateSubtitle(cue: Cue) {
        this.ee.emit("onChangeSubtitle", cue)
    }

}
export default SongPlayer;