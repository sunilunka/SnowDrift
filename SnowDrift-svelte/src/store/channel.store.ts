import { writable } from "svelte/store";

type Channel = {
    channel: string;
    freq: number | string;
    active: boolean;
}

interface Channels {
   [index: number]: Channel;
}

let channelDict: Channels = {
    1: {
        channel: "1",
        freq: "2411Mhz",
        active: false
    },
    2: { 
        channel: "2",
        freq: "2433Mhz",
        active: false
    },
    3: { 
        channel: "3",
        freq: "2444Mhz",
        active: false
    },
}; 

export const channels = writable(channelDict);