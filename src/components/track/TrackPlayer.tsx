import { useEffect, useState } from 'react';
import TrackControls from './TrackControls';
import React from 'react';
import Subtitle from '../subtitle/Subtitle';
import AudioPlayer from '../audio/AudioPlayer';
import CanvasBackground from '../background/CanvasBackground';
import TrackDisplay from './TrackDisplay';
import BarToggle from '../track_explorer/BarToggle';
import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
} from '../ui/drawer';
import { Button } from '../ui/button';
import { FaBars } from 'react-icons/fa';
import TrackList from '../track_explorer/TrackList';
import TrackListDrawer from '../track_explorer/TrackListDrawer';
import { Separator } from '../ui/separator';
import { IAudioMetadata } from 'music-metadata-browser';
import ProgressBar from './Progressbar';
import TrackProgress from './TrackProgress';
import { LoadingSpinner } from '../ui/LoadingSpinner';
import { Track } from '@/data/Tracks';

type TrackPlayerInput = {
    tracks: Track[];
    trackID: string | undefined
};

const TrackPlayer = ({ tracks, trackID }: TrackPlayerInput) => {
    const [currTrackIndex, setCurrTrackIndex] = useState(0);
    const [currentTrackMeta, setCurrentTrackMeta] = useState<IAudioMetadata>();
    const [isPlaying, setIsPlaying] = useState(false);
    const [changedTime, setChangedTime] = useState(0);
    const [currentTime, setCurrentTime] = useState(0);
    const [changedTrackTrigger, setChangedTrackTrigger] = useState(false);
    const [onRestartTrigger, setOnRestartTrigger] = useState(false);
    const [isLoadingTrack, setIsLoadingTrack] = useState(false);
    const [firstLoad, setFirstLoad] = useState(true);
    const currentTrack = tracks[currTrackIndex];

    const updateTime = newTime => {

        setCurrentTime(newTime);
        if (currentTrackMeta?.format.duration) {
            if (currentTrackMeta?.format.duration - newTime < 0.2)
                nextTrack()
        }
    };

    const nextTrack = () => {
        setCurrTrackIndex(prevIndex => (prevIndex + 1) % tracks.length);
    };

    const prevTrack = () => {
        if (currentTime > 1) {
            setOnRestartTrigger(!onRestartTrigger)
            console.log("hejj")
        } else {
            setCurrTrackIndex(prevIndex => (prevIndex - 1 + tracks.length) % tracks.length);
        }
    };

    const togglePlayPause = async () => {
        setIsPlaying(!isPlaying);
    };

    const changeTrack = index => {
        if (index > tracks.length) throw new Error('track index out of range');

        setCurrTrackIndex(index);
        setChangedTrackTrigger(!changedTrackTrigger)
    };

    useEffect(() => {
        if (firstLoad) {
            // Do not load on when the user lands the first time on the webpage
            setFirstLoad(false)
            return;
        }
        setIsPlaying(true);
    }, [changedTrackTrigger]);


    useEffect(() => {
        if (trackID) {
            let startTrackIndex = tracks.findIndex(track => track.id === trackID)
            setCurrTrackIndex(startTrackIndex)
        } 
    }, [])

    // Should remove?
    const onEnd = () => {
        
        if (!currentTrackMeta || !currentTrackMeta?.format.duration) return 
        if (currentTrackMeta?.format.duration - currentTime < 0.01)
            console.log("change!!");
    };

    const onLoad = meta => {
        setCurrentTrackMeta(meta);
    };

    const onTimeUpdate = value => {
        let trackLength = currentTrackMeta?.format.duration;
        if (!trackLength) return;
        setChangedTime(trackLength * value);
    };

    const shouldDisableSubtitles = isLoadingTrack;

    return (
        <div className="flex flex-col justify-between w-full h-screen">
            <CanvasBackground track={currentTrack} />
            <div className='absolute w-full h-full flex items-center align-center justify-center'>
                {
                    isLoadingTrack ? 
                        <LoadingSpinner className="h-1/6 w-6/12 animate-spin z-0" />
                        :
                        ""
                }
            </div>
            <div className="flex flex-col items-center self-start w-full">
                <div className="w-full p-4 bg-black bg-opacity-70 z-10 rectangle-full">
                    {/* Combined Track Display and Controls for small screens */}
                    <div className="flex items-center w-full md:hidden">
                        {/* Bar icon to the left */}
                        <div className="flex-initial">
                            <TrackListDrawer
                                tracks={tracks}
                                currTrackIndex={currTrackIndex}
                                onPressTrack={changeTrack}
                            />
                        </div>
                        {/* Center content with automatic margins */}
                        <div className="flex-grow flex-col flex justify-center items-center mx-auto">
                            <TrackDisplay track={currentTrack} tracks={tracks} trackIndex={currTrackIndex} />
                            <TrackControls
                                onNext={nextTrack}
                                onPrev={prevTrack}
                                onTogglePlay={togglePlayPause}
                                isPlaying={isPlaying}
                            />
                                        
                        </div>
                        {/* Invisible icon or element to balance the grid, same size as drawer icon */}
                        <div className="flex-initial invisible mr-3">
                            <FaBars className="text-transparent" />
                        </div>
                    </div>

                    {/* Grid layout for larger screens */}
                    <div className="hidden md:grid md:grid-cols-3 md:items-center w-full">
                        {/* Left Side Track Display */}

                        <div className="justify-self-start flex flex-row" style={{ height: '40px' }}>
                            <TrackListDrawer
                                tracks={tracks}
                                currTrackIndex={currTrackIndex}
                                onPressTrack={changeTrack}
                            />
                            <Separator decorative orientation="vertical" style={{ margin: '0 15px' }} />
                            <TrackDisplay track={currentTrack} tracks={tracks} trackIndex={currTrackIndex} />
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
                            <AudioPlayer
                                track={currentTrack}
                                shouldPlay={isPlaying}
                                updateTimeCallback={updateTime}
                                onEnd={onEnd}
                                onLoad={onLoad}
                                changedTime={changedTime}
                                onRestart={onRestartTrigger}
                                setIsLoadingTrack={setIsLoadingTrack}
                                isLoadingTrack={isLoadingTrack}
                            />
                        </div>
                    </div>
                </div>
                {
                    currentTrackMeta ? <TrackProgress
                            value={currentTime}
                            max={currentTrackMeta?.format.duration}
                            onTimeUpdate={onTimeUpdate}
                        /> : <div />
                }

            </div>

            <div className="w-full text-center mb-8 self-end z-10">
                <Subtitle track={currentTrack} time={currentTime} disable={shouldDisableSubtitles} />
            </div>
        </div>
    );
};

export default TrackPlayer;
