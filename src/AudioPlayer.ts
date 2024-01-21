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

    async playAudio(url: string): Promise<void> {
        try {
            if (!this.buffer) { // Load and decode buffer only if it's not already done
                const arrayBuffer = await this.loadAudio(url);
                this.buffer = await this.decodeAudioData(arrayBuffer);
            }
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
        if (!this.isPlaying) {
            this.playAudio(); // Call playAudio which now handles resuming from pauseTime
        }
    }
}

export default AudioPlayer;