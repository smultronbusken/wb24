import { useEffect, useRef, useState } from 'react';
import AudioControls from './AudioControls';
import { Track } from '../data/Tracks';
import * as musicMetadata from 'music-metadata-browser';
import React from 'react';


type AudioPlayerProps = {
    track: Track;
    shouldPlay: boolean;
    updateTimeCallback: any;
    onEnd: any;
    onLoad: any;
    changedTime: number;
};

export const AudioPlayer = ({
    track,
    shouldPlay,
    updateTimeCallback,
    onEnd,
    onLoad,
    changedTime,
}: AudioPlayerProps) => {
    const audioContext = useRef<AudioContext | null>();
    const audioBuffer = useRef<AudioBuffer | null>();
    const sourceNode = useRef<AudioBufferSourceNode | null>();
    const gainNode = useRef<GainNode | null>();

    const [startedAt, setStartedAt] = useState(0);
    const [pausedAt, setPausedAt] = useState(0);
    const [paused, setPaused] = useState(false);
    const [currentVolume, setCurrentVolume] = useState(-0.5);
    const [volumeBeforeMute, setVolumeBeforeMute] = useState(currentVolume);
    const [isMuted, setIsMuted] = useState(false);

    const shouldDebug = false;

    useEffect(() => {
        playAt(changedTime);
    }, [changedTime]);

    /* Needed? for timer */
    const startedAtRef = useRef(startedAt);
    const pausedRef = useRef(paused);
    useEffect(() => {
        startedAtRef.current = startedAt;
    }, [startedAt]);
    useEffect(() => {
        pausedRef.current = paused;
    }, [paused]);
    
    useEffect(() => {
        const interval = setInterval(() => {
            if (audioContext.current && !pausedRef.current) {
                const currentTime = audioContext.current.currentTime - startedAtRef.current;
                updateTimeCallback(currentTime);
            }
        }, 10);

        return () => clearInterval(interval);
    }, []); // Empty dependency array to run only once
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
        gainNode.current = new GainNode(audioContext.current, { gain: currentVolume });
    };

    const loadAudio = async (url: string) => {
        if (!audioContext.current) return;
        reset();

        // Fetch the audio file as an ArrayBuffer
        const response = await fetch(url);
        const arrayBuffer = await response.arrayBuffer();

        // Metadata
        const uint8Array = new Uint8Array(arrayBuffer);
        const mimeType = response.headers.get('content-type') || undefined;
        try {
            const metadata = await musicMetadata.parseBuffer(uint8Array, { mimeType });
            onLoad(metadata);
        } catch (error) {
            console.error('Error reading metadata:', error);
        }

        audioBuffer.current = await audioContext.current.decodeAudioData(arrayBuffer);
    };

    const onSourceNodeEnded = () => {
        if (audioContext.current) {
            const currentTime = audioContext.current.currentTime - startedAtRef.current;
            updateTimeCallback(currentTime);
            console.log(currentTime)
            //onEnd()
        }
    }

    const play = () => {
        if (!audioBuffer.current || !gainNode.current || !audioContext.current) return;
        sourceNode.current = audioContext.current.createBufferSource();
        sourceNode.current.buffer = audioBuffer.current;
        sourceNode.current.connect(gainNode.current).connect(audioContext.current.destination);
        sourceNode.current.connect(audioContext.current.destination);
        sourceNode.current.onended = _ => onSourceNodeEnded();
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

    const playAt = time => {
        debug('Playing at ' + time);
        if (!paused) {
            if (!audioBuffer.current || !gainNode.current || !audioContext.current) return;
            reset();
            sourceNode.current = audioContext.current.createBufferSource();
            sourceNode.current.buffer = audioBuffer.current;
            sourceNode.current.connect(gainNode.current).connect(audioContext.current.destination);
            sourceNode.current.connect(audioContext.current.destination);
            sourceNode.current.onended = _ => onSourceNodeEnded();
            sourceNode.current.start(0, time);
            setStartedAt(audioContext.current.currentTime - time);
            setPaused(false);
        } else {    
            if (!audioContext.current) return;
            setPausedAt(time)
            updateTimeCallback(time);
            setStartedAt(audioContext.current.currentTime - time);
        }
    };

    const pause = () => {
        if (!audioContext.current) return;
        debug('Pausing');
        sourceNode.current?.stop(0);
        setPausedAt(audioContext.current.currentTime - startedAt);
        setPaused(true);
    };

    const reset = () => {
        if (!audioContext.current) return;
        debug('Resetting');
        sourceNode.current?.stop(0);
        setPausedAt(0);
        setPaused(true);
    };

    const debug = (action: string) => {
        if (!shouldDebug) return;
        console.log(action);
        console.log('Current time: ' + audioContext.current?.currentTime);
        console.log('Started at: ' + startedAt);
        console.log('Paused at: ' + pausedAt);
    };

    const handleVolumeChange = newVolume => {
        console.log(newVolume);
        setCurrentVolume(newVolume);
        setIsMuted(false);
        if (gainNode.current) {
            gainNode.current.gain.value = newVolume;
        }
    };

    const mute = () => {
        let newVolume = -1;
        if (isMuted) {
            setIsMuted(false);
            setCurrentVolume(volumeBeforeMute);
            newVolume = volumeBeforeMute;
        } else {
            setVolumeBeforeMute(currentVolume);
            setIsMuted(true);
            setCurrentVolume(-1);
            newVolume = -1;
        }

        if (gainNode.current) {
            gainNode.current.gain.value = newVolume;
        }
    };

    return <AudioControls onChangeVolume={handleVolumeChange} currentVolume={currentVolume} onMute={mute} />;
};

export default AudioPlayer;
