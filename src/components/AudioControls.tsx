import React from 'react';
import { FaBars, FaVolumeUp, FaVolumeDown, FaVolumeMute, FaVolumeOff } from 'react-icons/fa';
import { Slider } from './ui/slider';

const AudioControls = ({ onChangeVolume, onMute, currentVolume }) => {
    let VolumeIcon = FaVolumeUp;

    if (currentVolume <= -0.5) {
        VolumeIcon = FaVolumeDown;
    }
    if (currentVolume <= -1) {
        VolumeIcon = FaVolumeMute;
    }

    return (
        <div>
            <div className="flex items-center justify-center space-x-4 p-4">
                <button className="btn btn-ghost" onClick={onMute}>
                    <VolumeIcon className="text-white text-lg" />
                </button>

                <Slider
                    className="w-24 h-4 rectangle-full"
                    defaultValue={[currentVolume]}
                    min={-1.01}
                    max={0}
                    step={0.01}
                    value={[currentVolume]}
                    onValueChange={onChangeVolume}
                />
            </div>
        </div>
    );
};

export default AudioControls;
