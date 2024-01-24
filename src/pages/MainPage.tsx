import { useEffect, useState } from 'react';
import TrackPlayer from '../components/TrackPlayer';

import * as mm from 'music-metadata';
import { Track, _tracks } from '../data/Tracks';
import TrackPlayerToggle from '@/components/BarToggle';

const MainPage = () => {
    const [tracks, setTracks] = useState<Track[]>(_tracks);

    useEffect(() => {}, []);

    return (
        <div className="bg-slate-700">
            <TrackPlayer tracks={tracks} />
        </div>
    );
};

export default MainPage;
