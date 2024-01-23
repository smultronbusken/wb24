import { useEffect, useRef, useState } from 'react';
import AudioControls from './AudioControls';
import { Track } from '../data/tracks';

type AudioPlayerProps = {
    track: Track;
    shouldPlay: Boolean;
    updateTimeCallback: any;
};

export const AudioPlayer = ({ track, shouldPlay, updateTimeCallback }: AudioPlayerProps) => {
    let audioContext = useRef<AudioContext | null>();
    let audioBuffer = useRef<AudioBuffer | null>();
    let sourceNode = useRef<AudioBufferSourceNode | null>();
    let gainNode = useRef<GainNode | null>();

    const [startedAt, setStartedAt] = useState(0);
    const [pausedAt, setPausedAt] = useState(0);
    const [paused, setPaused] = useState(false);

    const shouldDebug = false;

    useEffect(() => {
        const interval = setInterval(() => {
            if (audioContext.current && !paused) {
                const currentTime = audioContext.current.currentTime - startedAt;
                updateTimeCallback(currentTime);
            }
        }, 100);
        return () => clearInterval(interval);
    }, [paused]);

    useEffect(() => {
        onChangeShouldPlay();
    }, [shouldPlay]);

    const onChangeShouldPlay = async () => {
        if (shouldPlay) {
            if (!audioContext.current) {
                // First time the user starts audio
                setUp();
                await loadAudio(track.audioURL);
            }
            play();
        } else {
            pause();
        }
    };

    useEffect(() => {
        onChangeTrack();
    }, [track]);

    const onChangeTrack = async () => {
        updateTimeCallback(0);
        await loadAudio(track.audioURL);
        if (shouldPlay) play();
    };

    const setUp = () => {
        audioContext.current = new AudioContext();
        gainNode.current = new GainNode(audioContext.current, { gain: -0.5 });
    };

    const loadAudio = async (url: string) => {
        if (!audioContext.current) return;
        reset();
        const response = await fetch(url);
        const arrayBuffer = await response.arrayBuffer();
        audioBuffer.current = await audioContext.current.decodeAudioData(arrayBuffer);
    };

    const play = () => {
        if (!audioBuffer.current || !gainNode.current || !audioContext.current) return;
        sourceNode.current = audioContext.current.createBufferSource();
        sourceNode.current.buffer = audioBuffer.current;
        sourceNode.current.connect(gainNode.current).connect(audioContext.current.destination);
        sourceNode.current.connect(audioContext.current.destination);
        if (paused) {
            debug('Resuming');
            setStartedAt(audioContext.current.currentTime - pausedAt);
            sourceNode.current.start(0, pausedAt);
        } else {
            debug('Playing');
            setStartedAt(audioContext.current.currentTime);
            sourceNode.current.start(0);
        }
        setPaused(false);
    };

    const pause = () => {
        if (!audioContext.current) return;
        debug('Pausing');
        setPausedAt(audioContext.current.currentTime - startedAt);
        setPaused(true);
        sourceNode.current?.stop(0);
    };

    const reset = () => {
        if (!audioContext.current) return;
        debug('Resetting');
        setPausedAt(0);
        setPaused(true);
        sourceNode.current?.stop(0);
    };

    const debug = (action: string) => {
        if (!shouldDebug) return;
        console.log(action);
        console.log('Current time: ' + audioContext.current?.currentTime);
        console.log('Started at: ' + startedAt);
        console.log('Paused at: ' + pausedAt);
    };

    const handleVolumeChange = event => {
        const newVolume = parseFloat(event.target.value);
        if (gainNode.current) {
            gainNode.current.gain.value = newVolume;
        }
    };

    return <AudioControls onChangeVolume={handleVolumeChange} />;
};

export default AudioPlayer;
