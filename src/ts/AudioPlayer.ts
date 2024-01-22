class AudioPlayer {
    private audioContext: AudioContext;
    private sourceNode: AudioBufferSourceNode | null;
    private gainNode: GainNode;

    public isPlaying: boolean;
    private startTime: number;
    private pauseTime: number;
    private buffer: AudioBuffer | null;

    constructor() {
        this.audioContext = new AudioContext();
        this.sourceNode = null;
        this.isPlaying = false;
        this.startTime = 0;
        this.pauseTime = 0;
        this.buffer = null; // Store the decoded buffer
        this.gainNode = new GainNode(this.audioContext, {gain: -0.5});
    }

    async loadAudio(url: string): Promise<ArrayBuffer> {
        if (this.isPlaying) {
            this.stop(); // Pause current audio if it's playing
        }
        const response = await fetch(url);
        const arrayBuffer = await response.arrayBuffer();
        this.buffer = await this.decodeAudioData(arrayBuffer);
        this.pauseTime = 0; // Reset pauseTime for new audio
        return arrayBuffer;
    }

    async decodeAudioData(arrayBuffer: ArrayBuffer): Promise<AudioBuffer> {
        const audioBuffer = await this.audioContext.decodeAudioData(arrayBuffer);
        return audioBuffer;
    }

    createAudioBufferSourceNode(audioBuffer: AudioBuffer): AudioBufferSourceNode {
        const source = this.audioContext.createBufferSource();
        source.buffer = audioBuffer;
        return source;
    }

    async playAudio(): Promise<void> {

        if (!this.buffer) {
            throw new Error("Cannot play audio, no audio is loaded.");
        }
    
        if (this.isPlaying && this.sourceNode) {
            this.stop(); // Stop any currently playing audio
        }
    
        try {
            this.sourceNode = this.createAudioBufferSourceNode(this.buffer);
            this.sourceNode.connect(this.gainNode).connect(this.audioContext.destination);
            this.sourceNode.connect(this.audioContext.destination);
            this.sourceNode.start(0, this.pauseTime); 
            this.startTime = this.audioContext.currentTime - this.pauseTime;
            this.isPlaying = true;
        } catch (error) {
            console.error('Error playing audio:', error);
        }
    }

    setVolume(volume: number) {
        console.log(volume)
        console.log(this.gainNode.gain.defaultValue)
        console.log(this.gainNode.gain.minValue)
        this.gainNode.gain.value = volume;
    }


    stop(): void {
        if (this.sourceNode && this.isPlaying) {
            this.sourceNode.stop();
            this.sourceNode.disconnect(); // Disconnect the sourceNode
            this.sourceNode = null; // Dispose of the sourceNode
            this.pauseTime = 0;
            this.isPlaying = false;
        }
    }

    pause(): void {
        if (this.sourceNode && this.isPlaying) {
            this.sourceNode.stop();
            this.pauseTime = this.audioContext.currentTime - this.startTime; // Calculate the total played time
            this.isPlaying = false;
        }
    }

    resume(): void {
        if (this.sourceNode && !this.isPlaying) {
            this.sourceNode.start();
            this.pauseTime = this.audioContext.currentTime - this.startTime; // Calculate the total played time
            this.isPlaying = false;
        }
    }

    getCurrentTime(): number {
        if (!this.isPlaying) {
            // If audio is paused, return the pause time
            return this.pauseTime;
        } else {
            // If audio is playing, calculate current playback time
            return (this.audioContext.currentTime - this.startTime);
        }
    }
}

export default AudioPlayer;