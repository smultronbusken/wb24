import { subscribe } from "diagnostics_channel";
import AudioPlayer from "./AudioPlayer";

const webvtt = require('node-webvtt');

export interface Subtitle {
    valid: boolean
    cues: Cue[]
}

export interface Cue {
    identifier: string;
    start: number;
    end: number;
    text: string;
    styles: string;
}


class SubtitleController {

    public currentSubtitle: Subtitle | undefined;

    public async loadVTT(url: string) : Promise<Subtitle>{
        const response = await fetch(url);
        const text = await response.text();
        console.log(text)
        const parsed =  webvtt.parse(text)
        this.currentSubtitle = parsed;
        console.log(parsed)
        return parsed
    }

    public getCue(time: number): Cue | undefined {
        if (this.currentSubtitle) 
            return this.currentSubtitle.cues.find(cue => time >= cue.start && time <= cue.end);
        return
    }

}

export default SubtitleController;

