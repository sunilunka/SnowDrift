<script lang="ts">
import { channels } from "../store/channel.store"

export let channel: string;

let channelData;

let isActive: boolean;

channels.subscribe(chans => { 
    channelData = chans[channel];
    isActive = channelData.active;
})

function toggleChannel(evt: Event) {
    console.log("Channel Data:", channelData);
    channels.update((channels) => {
        channelData.active = !channelData.active;
        return channels = {
            [channelData.channel]: {
                ...channelData
            },
            ...channels
        }
    });
}

</script>

<button on:click="{toggleChannel}" class="{ isActive ? 'active' : ''}">
    {channelData.channel}
</button>

<style>
    button {
        border: 1px solid #00ff08;
    }

    .active {
        background-color: #00FF08;
        color: #000000;
    }
</style>