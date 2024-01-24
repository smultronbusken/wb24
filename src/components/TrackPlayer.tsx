import { useState } from 'react';
import TrackControls from './TrackControls';

import Subtitle from './Subtitle';
import AudioPlayer from './AudioPlayer';
import CanvasBackground from './CanvasBackground';
import { Track } from '../data/Tracks';
import TrackDisplay from './TrackDisplay';
import BarToggle from './BarToggle';
import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
} from './ui/drawer';
import { Button } from './ui/button';
import { FaBars } from 'react-icons/fa';
import TrackList from './TrackList';
import TrackListDrawer from './TrackListDrawer';
import { Separator } from './ui/separator';

type TrackPlayerInput = {
    tracks: Track[];
};

const TrackPlayer = ({ tracks }: TrackPlayerInput) => {
    const [currTrackIndex, setCurrTrackIndex] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const currentTrack = tracks[currTrackIndex];

    const updateTime = newTime => {
        setCurrentTime(newTime);
    };

    const nextTrack = () => {
        setCurrTrackIndex(prevIndex => (prevIndex + 1) % tracks.length);
    };

    const prevTrack = () => {
        setCurrTrackIndex(prevIndex => (prevIndex - 1 + tracks.length) % tracks.length);
    };

    const togglePlayPause = async () => {
        setIsPlaying(!isPlaying);
    };

    const changeTrack = (index) => {
        if (index > tracks.length) throw new Error("track index out of range")
        setCurrTrackIndex((index))
    }

    return (
        <div className="relative w-full h-screen">
            <CanvasBackground track={currentTrack} />
                    <div className="absolute top-0 w-full p-2 bg-black bg-opacity-50">
                    {/* Combined Track Display and Controls for small screens */}
                    <div className="flex items-center w-full md:hidden">
                        {/* Bar icon to the left */}
                        <div className="flex-initial">
                            <TrackListDrawer tracks={tracks} currTrackIndex={currTrackIndex} onPressTrack={changeTrack} />
                        </div>
                        {/* Center content with automatic margins */}
                        <div className="flex-grow flex-col flex justify-center items-center mx-auto">
                            <TrackDisplay track={currentTrack} tracks={tracks} trackIndex={currTrackIndex}/>
                            <TrackControls
                                onNext={nextTrack}
                                onPrev={prevTrack}
                                onTogglePlay={togglePlayPause}
                                isPlaying={isPlaying}
                            />
                        </div>
                        {/* Invisible icon or element to balance the grid, same size as drawer icon */}
                        <div className="flex-initial invisible">
                            <FaBars className="text-transparent" />
                        </div>
                    </div>


                    {/* Grid layout for larger screens */}
                    <div className="hidden md:grid md:grid-cols-3 md:items-center w-full">
                        {/* Left Side Track Display */}
                        
                        <div className="justify-self-start flex flex-row" style={{ height: '40px' }}>
                            <TrackListDrawer tracks={tracks} currTrackIndex={currTrackIndex} onPressTrack={changeTrack} />
                            <Separator
                                decorative
                                orientation="vertical"
                                style={{ margin: '0 15px' }}
                            />
                            <TrackDisplay track={currentTrack} tracks={tracks}  trackIndex={currTrackIndex} />
                        </div>

                        {/* Centered Track Controls */}
                        <div className="justify-self-center">
                            <TrackControls
                                onNext={nextTrack}
                                onPrev={prevTrack}
                                onTogglePlay={togglePlayPause}
                                isPlaying={isPlaying}
                            />
                        </div>

                        {/* Right Side Placeholder */}
                        <div className="justify-self-end">
                            <AudioPlayer track={currentTrack} shouldPlay={isPlaying} updateTimeCallback={updateTime} />
                        </div>
                    </div>
                </div>
    

            <div className="absolute bottom-0 w-full text-center mb-8">
                <Subtitle track={currentTrack} time={currentTime} />
            </div>
        </div>
    );
};

export default TrackPlayer;