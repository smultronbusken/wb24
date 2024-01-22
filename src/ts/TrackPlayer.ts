
import EventEmitter from "events";
import AudioPlayer from "./AudioPlayer";
import BackgroundController from "./BackgroundController";
import SubtitleController, { Cue } from "./SubtitleController";

type TrackPlayerEventName =
    "onPause" |
    "onChangeSubtitle" |
    "onPlay" |
    "onTrackLoaded" |
    "onResetSubtitle";

class TrackPlayer {

    audioPlayer: AudioPlayer = new AudioPlayer;
    subtitleController: SubtitleController = new SubtitleController;
    backgroundController: BackgroundController = new BackgroundController;

    public typewriterElement: HTMLElement;
    public controlButton: HTMLElement;
    public trackNameElement: HTMLElement;

    private ee: EventEmitter = new EventEmitter;

    public tracks: Track[] = []
    private currTrackIndex = 0;
    

    constructor() {
        this.controlButton = this.loadElement('audioControl');
        this.typewriterElement = this.loadElement('typewriter');
        this.trackNameElement = this.loadElement('currentTrackName');
        this.setUpAudioControls();
        this.setUpSubtitles();

        this.loadElement('prevTrack').addEventListener('click', () => this.prevTrack());
        this.loadElement('nextTrack').addEventListener('click', () => this.nextTrack());

        const volumeSlider = this.loadElement('volumeSlider') as HTMLInputElement;
        volumeSlider.addEventListener('input', () => {
            const volume = parseFloat(volumeSlider.value);
            this.audioPlayer.setVolume(volume);
        });
    
    }

    private loadElement(id: string): HTMLElement {
        let element = document.getElementById(id)
        if (!element) {
            throw new Error("Can not find element with id: " + id);
        } else {
            return element
        }
    }

    public setUpAudioControls() {
        this.controlButton.addEventListener('click', () => {
            this.changeAudioPlayback()
        });
    }

    public setUpSubtitles() {
        setInterval(() => {
            const time = this.audioPlayer.getCurrentTime(); 
            const cue = this.subtitleController.getCue(time);
            if (cue)
                this.updateCue(cue);
        }, 500); // Check every 500 milliseconds
    }

    public populateTrackList() {
        const trackListElement = document.getElementById('trackList');
        if (!trackListElement) return;
    
        this.tracks.forEach((track, index) => {
            const listItem = document.createElement('li');
            listItem.textContent = track.title;
            listItem.addEventListener('click', () => {
                this.currTrackIndex = index;
                this.loadCurrentTrack();
                this.resetSubtitle()
            });
            trackListElement.appendChild(listItem);
        });
    }

    public prepareTracks(...tracks: Track[]) {
        this.tracks = tracks;
        this.populateTrackList()
    }

    public async loadCurrentTrack() {
        const track = this.tracks[this.currTrackIndex];
        await this.loadTrack(track)
        this.emit("onTrackLoaded", track)
        this.resetSubtitle()
        this.play()
    }

    public async prevTrack() {
        if (this.currTrackIndex > 0) {
            this.currTrackIndex--;
        } else {
            this.currTrackIndex = this.tracks.length - 1; // Loop back to the last track
        }
        await this.loadCurrentTrack();
        this.play();
    }

    public async nextTrack() {
        if (this.currTrackIndex < this.tracks.length - 1) {
            this.currTrackIndex++;
        } else {
            this.currTrackIndex = 0; // Loop back to the first track
        }
        await this.loadCurrentTrack();
        this.play();
    }

    public on(eventName: TrackPlayerEventName, listener: (...args: any[]) => void) {
        this.ee.on(eventName, listener)
    }

    private emit(eventName: TrackPlayerEventName, args?: any) {
        this.ee.emit(eventName, args)
    }

    public async loadTrack(track: Track) {
        console.log("Loading track " + track.title)
        await this.audioPlayer.loadAudio(track.audioURL)
        await this.subtitleController.loadVTT(track.VTTURL)
        await this.backgroundController.load(track.backgroundURL);
    }

    public async play() {
        this.playAudio();
    }


    public changeAudioPlayback() {
        this.audioPlayer.isPlaying ? this.pauseAudio() : this.playAudio()
    }

    public async pauseAudio() {
        await this.audioPlayer.pause();
        this.emit("onPause")
    }

    public async playAudio() {
        await this.audioPlayer.playAudio();
        this.emit("onPlay")
    }

    public async updateCue(cue: Cue) {

        this.emit("onChangeSubtitle", cue)
    }

    public async resetSubtitle() {
        this.emit("onResetSubtitle")
    }


}
export default TrackPlayer;