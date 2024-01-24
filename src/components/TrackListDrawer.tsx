import { FaBars } from 'react-icons/fa';

import TrackList from './TrackList';
import { DrawerTrigger, DrawerContent, Drawer } from './ui/drawer';

const TrackListDrawer = ({ tracks, currTrackIndex, onPressTrack }) => {
    return (
        <Drawer>
            <DrawerTrigger>
                <FaBars className="text-white text-lg ml-3" />
            </DrawerTrigger>
            <DrawerContent className="bg-black bg-opacity-50 rounded-none border-none flex justify-center items-center">
                {/* Centered TrackList with margin */}
                <div className="m-4">
                    <TrackList tracks={tracks} trackIndex={currTrackIndex} onPressTrack={onPressTrack} />
                </div>
            </DrawerContent>
        </Drawer>
    );
};

export default TrackListDrawer;
