<script lang="ts">

    import { UserService } from "../services/user.service";

    let username: String = "";
    let password: String = "";
    let confirmation: String = "";
    let passwordIsValid: Boolean = true;
    let loginError: Boolean = false;
    let errorStatus: String = "";

    let cancelSubmit = function(evt: Event): void {
        console.log(evt);
        username = "";
        password = "";
        confirmation = "";
    }

    let comparePassword = function(evt: Event): void {
        if(password === confirmation) {
            passwordIsValid = true;
        } else {
            passwordIsValid = false;
        }
    }

    let submitCredentials = function(evt: Event): void {
        if((password === "") || !passwordIsValid) {
            loginError = true;
            errorStatus = "Password invalid or do not match";
        } 


        console.dir(`PARAMS: ${username}, ${password}, ${confirmation}`);


    }


</script>

<div>
    <form on:submit|preventDefault="{submitCredentials}">
        <h2>Create User Login</h2>
        <div class="login-form">
            <input name="username" 
                   type="text" 
                   bind:value="{username}"
                   placeholder="Username"/>    
            <input name="password" 
                   type="password" 
                   bind:value="{password}" 
                   on:keyup="{comparePassword}"
                   placeholder="Password"/>
            <input name="" 
                   type="password" 
                   bind:value="{confirmation}"
                   on:keyup="{comparePassword}"
                   placeholder="Confirm Password"/>
            <input type="submit" 
                   value="Create"/>  
            <button on:click="{cancelSubmit}"></button>
            {#if !passwordIsValid}
                <div class="warning">Passwords do not match</div>
            {/if}
            {#if loginError}
                <div class="warning">{errorStatus}</div>
            {/if}
        </div>
    </form>
</div>

<style>
    input[type="text"], input[type="password"] {
        border-top: none;
        border-left: none;
        border-right: none;
        border-bottom: 1px solid #FFF;
        display: block;
        margin: 0px 0px 1rem 0px;
        padding: 0.5rem;
        outline: none;
    }

    input[type="text"]:focus, input[type="password"]:focus {
        border-bottom: 2px solid #FFF;
        display: block;
        margin: 0px 0px 1rem 0px;
        padding: 0.5rem;
        font-size: 1rem;
    }
    .login-form {
        text-align: center;
    }

</style>