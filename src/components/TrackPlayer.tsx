import { useState } from 'react';
import TrackControls from './TrackControls';

import Subtitle from './Subtitle';
import AudioPlayer from './AudioPlayer';
import CanvasBackground from './CanvasBackground';
import { _tracks } from '../data/tracks';

function TrackPlayer() {
    const [currTrackIndex, setCurrTrackIndex] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);

    const currentTrack = _tracks[currTrackIndex];

    const updateTime = newTime => {
        setCurrentTime(newTime);
    };

    const nextTrack = () => {
        setCurrTrackIndex(prevIndex => (prevIndex + 1) % _tracks.length);
    };

    const prevTrack = () => {
        setCurrTrackIndex(prevIndex => (prevIndex - 1 + _tracks.length) % _tracks.length);
    };

    const togglePlayPause = async () => {
        setIsPlaying(!isPlaying);
    };

    return (
        <div className="relative w-full h-screen">
            <CanvasBackground track={currentTrack} />
            <div className="absolute top-0 w-full">
                <TrackControls
                    track={currentTrack}
                    onNext={nextTrack}
                    onPrev={prevTrack}
                    onTogglePlay={togglePlayPause}
                    isPlaying={isPlaying}
                />
                <AudioPlayer track={currentTrack} shouldPlay={isPlaying} updateTimeCallback={updateTime} />
            </div>
            <div className="absolute bottom-0 w-full text-center mb-8">
                <Subtitle track={currentTrack} time={currentTime} />
            </div>
        </div>
    );
}

export default TrackPlayer;
