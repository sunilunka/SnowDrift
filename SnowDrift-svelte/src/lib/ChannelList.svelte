<script lang="ts">
  import { channels } from "../store/channel.store";
  import ChannelButton from "./ChannelButton.svelte"; 

  let chanlist;

  channels.subscribe( bands => {
    console.log(bands);
    chanlist = Object.keys(bands);
  });

</script>

{#each chanlist as chan}
  <ChannelButton channel="{chan}"></ChannelButton>
{/each}