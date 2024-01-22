
import EventEmitter from "events";
import AudioPlayer from "./AudioPlayer";
import BackgroundController from "./BackgroundController";
import SubtitleController, { Cue } from "./SubtitleController";

type TrackPlayerEventName =
    "onPause" |
    "onChangeSubtitle" |
    "onPlay";

class TrackPlayer {

    audioPlayer: AudioPlayer = new AudioPlayer;
    subtitleController: SubtitleController = new SubtitleController;
    backgroundController: BackgroundController = new BackgroundController;

    public subtitleElement: HTMLElement;
    public controlButton: HTMLElement;

    private ee: EventEmitter = new EventEmitter;

    public tracks: Track[] = []
    private currTrackIndex = 0;
    

    constructor() {
        this.controlButton = this.loadElement('audioControl');
        this.subtitleElement = this.loadElement('subtitle');
        this.setUpAudioControls();
        this.setUpSubtitles();

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
                this.updateSubtitle(cue.text);
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
                this.updateSubtitle("")
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
        this.play()
    }

    public async nextTrack() {
        this.currTrackIndex++;
        await this.loadCurrentTrack()
        this.play()
    }

    public on(eventName: TrackPlayerEventName, listener: (...args: any[]) => void) {
        this.ee.on(eventName, listener)
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
        this.ee.emit("onPause")
    }

    public async playAudio() {
        await this.audioPlayer.playAudio();
        this.ee.emit("onPlay")
    }

    public async updateSubtitle(content: string) {
        this.ee.emit("onChangeSubtitle", content)
    }



}
export default TrackPlayer;