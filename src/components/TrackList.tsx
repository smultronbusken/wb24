import { Track } from '@/data/Tracks';
import { Card, CardContent } from './ui/card';
import { Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext } from './ui/carousel';

const TrackList = ({tracks, trackIndex, onPressTrack}: {tracks: Track[], trackIndex: number, onPressTrack: (_) => {}}) => {
    return (
        <Carousel
            opts={{
                align: 'start',
                startIndex: trackIndex
            }}
            className="w-full max-w-sm"
        >
            <CarouselContent>
                {tracks.map((t, index) => (
                    <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                        <div className="p-1" onClick={() => onPressTrack(index)}>
                            <Card>
                                <CardContent className="flex aspect-square items-center justify-center p-6">
                                    <span className="text-3xl font-semibold">{t.title}</span>
                                </CardContent>
                            </Card>
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
