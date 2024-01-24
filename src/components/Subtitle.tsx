import React, { useState, useEffect } from 'react';
import webvtt from 'node-webvtt';
import SubtitleDisplay from './SubtitleDisplay';
import { Track } from '@/data/Tracks';

export interface ISubtitle {
    valid: boolean;
    cues: Cue[];
}

export interface Cue {
    identifier: string;
    start: number;
    end: number;
    text: string;
    styles: string;
}

export const EmptyCue: Cue = {
    identifier: '',
    start: -1,
    end: -1,
    text: '',
    styles: '',
};
export const EmptySubtitle: ISubtitle = {
    cues: [],
    valid: true,
};

type SubtitleProps = {
    track: Track;
    time: number;
};

export const Subtitle = ({ track, time }: SubtitleProps) => {
    const [currentSubtitle, setCurrentSubtitle] = useState<ISubtitle>(EmptySubtitle);
    const [currentCue, setCurrentCue] = useState<Cue>(EmptyCue);

    useEffect(() => {
        loadVTT(track);
    }, [track]);

    const loadVTT = async (track: Track) => {
        const response = await fetch(track.VTTURL);
        const text = await response.text();
        const parsed = webvtt.parse(text);
        setCurrentSubtitle(parsed);
    };

    useEffect(() => {
        setCurrentCue(getCue(time));
    }, [time]);

    const getCue = (time: number) => {
        const cue = currentSubtitle.cues.find(cue => time >= cue.start && time <= cue.end);
        return cue ? cue : EmptyCue;
    };

    return (
        <div className="text-center mb-8">
            <SubtitleDisplay cue={currentCue} />
        </div>
    );
};

export default Subtitle;
