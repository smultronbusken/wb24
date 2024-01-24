import React from 'react';
import { FaPlay, FaPause, FaStepForward, FaStepBackward, FaVolumeUp, FaBars } from 'react-icons/fa'; // Import additional icons
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover';
import { Separator } from './ui/separator';

const TrackControls = ({ onNext, onPrev, onTogglePlay, isPlaying }) => {
    return (
        <div className="flex items-center space-x-1 ">
            {' '}
            {/* Adjusted spacing and added margin-top */}
            <button onClick={onPrev} className="btn btn-ghost p-1 aspect-square">
                {' '}
                {/* Square aspect ratio */}
                <FaStepBackward className="text-white" />
            </button>
            <button onClick={onTogglePlay} className="btn btn-ghost p-1 aspect-square">
                {isPlaying ? <FaPause className="text-white" /> : <FaPlay className="text-white" />}
            </button>
            <button onClick={onNext} className="btn btn-ghost p-1 aspect-square">
                <FaStepForward className="text-white" />
            </button>
        </div>
    );
};

export default TrackControls;
