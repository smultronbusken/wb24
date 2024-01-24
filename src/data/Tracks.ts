export interface Track {
    title: string;
    audioURL: string;
    backgroundURL: string;
    VTTURL: string;
    index: number;
    act: string;
}

export const _tracks: Track[] = [
    {
        audioURL:
            'https://weeklybeats.s3.amazonaws.com/music/2024/smultron_weeklybeats-2024_2_the-great-speech-of-stockholm-port.mp3',
        backgroundURL: 'https://cdn.midjourney.com/8d63d055-7629-4217-884f-4186d7aecc62/0_3.webp',
        VTTURL: '/wb1.vtt',
        title: 'The Great Speech of Stockholm Port',
        index: 1,
        act: '1',
    },
    {
        audioURL:
            'https://weeklybeats.s3.amazonaws.com/music/2024/smultron_weeklybeats-2024_3_captain-of-the-sky-[2].mp3',
        backgroundURL:
            'https://cdn.discordapp.com/attachments/1028301488105201744/1198630443625484308/steamcraft_You_find_youself_in_the_small_crowd_of_the_dancing_w_7177ff71-dd8a-4a8d-87e4-ea40c5a796a9.png?ex=65bf9a97&is=65ad2597&hm=95736a77221fb4c47bcea10d693b7d5ae5656eed9d1dbcce740dc287e0da06b1&',
        VTTURL: '/wb2.vtt',
        title: 'Captain of the Sky!',
        index: 2,
        act: '1',
    },
    {
        audioURL: 'https://weeklybeats.s3.amazonaws.com/music/2024/nozzlan_weeklybeats-2024_2_jack-black.mp3',
        backgroundURL:
            'https://cdn.discordapp.com/attachments/1028301488105201744/1198630443625484308/steamcraft_You_find_youself_in_the_small_crowd_of_the_dancing_w_7177ff71-dd8a-4a8d-87e4-ea40c5a796a9.png?ex=65bf9a97&is=65ad2597&hm=95736a77221fb4c47bcea10d693b7d5ae5656eed9d1dbcce740dc287e0da06b1&',
        VTTURL: '/wb2.vtt',
        title: 'jackblack',
        index: 3,
        act: '????',
    },
];
