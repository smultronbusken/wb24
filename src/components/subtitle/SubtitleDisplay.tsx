import React, { useState, useEffect } from 'react';
import webvtt from 'node-webvtt';
import { Cue, EmptyCue } from './Subtitle';

type SubtitleDisplayProps = {
    cue: Cue;
};

export const SubtitleDisplay = ({ cue }: SubtitleDisplayProps) => {
    return (
        <div>
            <p className="text-4xl bg-white">{cue.text}</p>
        </div>
    );
};

export default SubtitleDisplay;
