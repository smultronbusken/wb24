import { useEffect, useState } from 'react';
import TrackPlayer from '../components/TrackPlayer';
import React from 'react';
import * as mm from 'music-metadata';
import TrackPlayerToggle from '@/components/BarToggle';
import { LoadingSpinner } from '@/components/LoadingSpinner';
import { Track } from '@/data/Tracks';
import { useParams } from 'react-router-dom';




const MainPage = () => {

    const [tracks, setTracks] = useState<Track[]>();

    useEffect(() => {
        loadTracks()
    }, []);
    
    const loadTracks = async () => {
        const response = await fetch(import.meta.env.VITE_REACT_APP_TRACK_LIST_URL + "?cachebust="+new Date().getTime().toString());
        const json = await response.json()
        setTracks(json.tracks)
    }

    let { trackID } = useParams();
    


    return (
        <div className="bg-slate-700">

            {   
            
                tracks ? 
                    <TrackPlayer tracks={tracks} trackID={trackID} />
                :
                    
                    <div className='absolute w-full h-full flex items-center align-center justify-center'>
                        <h1>LOADING TRACKS</h1>
                        <LoadingSpinner className="h-1/6 w-6/12 animate-spin z-0" />
                    </div>
            }
        </div>
    );
};

export default MainPage;
