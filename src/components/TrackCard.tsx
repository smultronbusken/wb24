import { Card, CardContent } from './ui/card';
import React from 'react';
const TrackCard = ({ track, isPlaying }) => {
    return (
        <Card>
            {isPlaying ? 'playing' : ''}
            <CardContent className="flex aspect-square items-center justify-center p-6 ">
                <span className="text-3xl font-bold">{track.title} </span>
            </CardContent>
        </Card>
    );
};

export default TrackCard;
