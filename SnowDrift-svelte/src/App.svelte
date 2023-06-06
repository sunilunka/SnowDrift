<script lang="ts">
  import { userdata } from "./store/user.store";
  import ChannelList from "./lib/ChannelList.svelte";
  import LoginPanel from "./lib/LoginPanel.svelte";

  let userData;
  

  userdata.subscribe(data => {
    console.dir(data);
    userData = { ...data };  
  });


</script>


<main>
  {#if userData.logged_in}
  <div>
    <h1>SnowDrift - Svelte</h1>
    <ChannelList></ChannelList>
  </div>
  {/if}
  {#if !userData.logged_in && !userData.first_login }
  <div>
    <p>Logged in: {userData.username ? userData.username : 'None'}</p>
    <p>Logged in: {userData.logged_in}</p>
  </div>
  {/if}
  {#if userData.first_login}
    <LoginPanel></LoginPanel>
  {/if}
  {#if userData.login_error}
    <p class="warning">{userData.login_error}</p>
  {/if}
</main>


<style>
</style>
