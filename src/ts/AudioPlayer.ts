class AudioPlayer {
    private audioContext: AudioContext;
    private sourceNode: AudioBufferSourceNode | null;

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
    }

    async loadAudio(url: string): Promise<ArrayBuffer> {
        const response = await fetch(url);
        const arrayBuffer = await response.arrayBuffer();
        this.buffer = await this.decodeAudioData(arrayBuffer);
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
            throw new Error("Can not play audio, not audio is loaded.")
        }
        try {
            this.sourceNode = this.createAudioBufferSourceNode(this.buffer);
            this.sourceNode.connect(this.audioContext.destination);
            this.sourceNode.start(0, this.pauseTime); // Start from the pauseTime if any
            this.startTime = this.audioContext.currentTime - this.pauseTime;
            this.isPlaying = true;
        } catch (error) {
            console.error('Error playing audio:', error);
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