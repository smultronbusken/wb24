import { Track } from '@/data/Tracks';
import { Card, CardContent } from './ui/card';
import { Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext } from './ui/carousel';
import TrackCard from './TrackCard';
import React from 'react';
const TrackList = ({
    tracks,
    trackIndex,
    onPressTrack,
}: {
    tracks: Track[];
    trackIndex: number;
    onPressTrack: (_) => {};
}) => {
    return (
        <Carousel
            opts={{
                align: 'start',
                startIndex: trackIndex,
            }}
            className="w-full max-w-sm"
        >
            <CarouselContent>
                {tracks.map((t, index) => (
                    <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                        <div className="p-1" onClick={() => onPressTrack(index)}>
                            <TrackCard track={t} isPlaying={trackIndex == index} />
                        </div>
                    </CarouselItem>
                ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
        </Carousel>
    );
};

export default TrackList;
