<script lang="ts">
  type band = {
    channel: number;
    selected: boolean;
  }
  let bands: band[] = [{
    channel: 1,
    selected: false
  }, {
    channel: 2,
    selected: false
  }];

  function toggleBand(evt): void {

  }
</script>

{#each bands as band (band.channel)}
<button on:click={toggleBand}>
  {band.channel}
</button>
{/each}

<style>
  button {
    border: 1px solid #00ff1e;
  }
</style>