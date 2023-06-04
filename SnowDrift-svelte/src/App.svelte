<script lang="ts">
  import { userdata } from "./store/user.store";
  import ChannelList from "./lib/ChannelList.svelte";

  let userData;
  

  userdata.subscribe(userdata =>{
    userData = userdata;  
  });


</script>


<main>
  {#if userData.logged_in}
  <div>
    <h1>SnowDrift - Svelte</h1>
    <ChannelList></ChannelList>
  </div>
  {:else}
  <div>
    <p>Logged in: {userData.username ? userData.username : 'None'}</p>
    <p>Logged in: {userData.logged_in}</p>
  </div>
  {/if}
</main>


<style>
</style>
