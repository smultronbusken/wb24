# wb24 - Audio Player for Browser

## Overview

This project is an audio player designed for web browsers. Uses React, Node.js, TypeScript, and Vite. The application allows users to play audio tracks with additional features like custom backgrounds and subtitles.

## Installation and Usage

## Setting up Environment Variables

Before running the application, you need to set an environment variable in your `.env` file:

```
VITE_REACT_APP_TRACK_LIST_URL=<URL to your track list file>
```

### Github Pages

Set up a secret in the settings:

```TRACK_LIST_URL``` with the value of the URL to your track list file.

This URL should point to a JSON file containing a list of tracks in the following format:

```json
{
    "tracks": [
        {
            "title": "Track Title",
            "audioURL": "URL to the audio file",
            "backgroundURL": "URL to the background image",
            "VTTURL": "URL to the VTT subtitle file",
            "index": 0,
            "act": "Act information"
        },
        // ... more tracks
    ]
}
```

## Track Interface

Each track in the track list should adhere to the following interface:

```typescript
export interface Track {
    title: string;
    audioURL: string;
    backgroundURL: string;
    VTTURL: string;
    index: number;
    act: string;
}
```

## Example

To see an example of how the audio player functions, visit [https://smultronbusken.github.io/wb24/](https://smultronbusken.github.io/wb24/). 
