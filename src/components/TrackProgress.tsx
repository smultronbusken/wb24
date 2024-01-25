import { Slider } from './ui/slider';
import React from 'react';
const TrackProgress = ({ value, max, onTimeUpdate }) => {
    const currValue = max && value ? value / max : 0;
    return (
        <div className="w-full max-w-screen-sm relative z-20 -top-2.5">
            <Slider
                className="w-full h-4 rectangle-full"
                defaultValue={[currValue]}
                max={1}
                step={0.01}
                value={[currValue]}
                onValueChange={onTimeUpdate}
            />
        </div>
    );
};

export default TrackProgress;
