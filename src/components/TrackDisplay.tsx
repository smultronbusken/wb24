import { FaBars } from 'react-icons/fa';
import { Button } from './ui/button';
import {
    DrawerTrigger,
    DrawerContent,
    DrawerHeader,
    DrawerTitle,
    DrawerDescription,
    DrawerFooter,
    DrawerClose,
    Drawer,
} from './ui/drawer';
import { Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext } from './ui/carousel';
import { Card, CardContent } from './ui/card';
import TrackList from './TrackList';

const TrackDisplay = ({ tracks, track, trackIndex }) => {
    return (
        <div className="flex flex-col justify-center ">
            <span className="text-xs text-white text-opacity-80 font-medium">
                {track ? `${track.title}` : 'No Track'}
            </span>
            <span className="text-xs text-white text-opacity-70 font-small sm:hidden">
                {track ? `Act ${track.act}` : '-'}
            </span>
        </div>
    );
};

export default TrackDisplay;
