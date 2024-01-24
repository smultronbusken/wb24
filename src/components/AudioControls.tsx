import React from 'react';
import { FaBars, FaVolumeUp, FaVolumeDown, FaVolumeMute, FaVolumeOff } from 'react-icons/fa';

const AudioControls = ({ onChangeVolume, onMute, currentVolume }) => {
    let VolumeIcon = FaVolumeUp;

    if (currentVolume <= -0.5) {
        VolumeIcon = FaVolumeDown;
    }
    if (currentVolume === -1) {
        VolumeIcon = FaVolumeMute;
    }

    return (
        <div>
            <div className="flex items-center justify-center space-x-4 p-4">
                <button className="btn btn-ghost" onClick={onMute}>
                    <VolumeIcon className="text-white text-lg" />
                </button>
                <input
                    type="range"
                    min="-1"
                    max="-0.01"
                    step="0.01"
                    value={currentVolume}
                    className="w-24"
                    onChange={onChangeVolume} // Pass onChangeVolume to the input
                />
            </div>
        </div>
    );
};

export default AudioControls;
