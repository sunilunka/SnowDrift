import axios from "axios";
import { AxiosError } from "axios";
import { readable } from "svelte/store";

import type AxiosResponse from "axios";


type UserData = {
    username: string;
    logged_in: boolean;
}

let initialData: UserData = {
    username: "",
    logged_in: false
}


export const userdata = readable(initialData, function(set){
    axios.get("http://localhost:8666/session/check_setup_ok")
        .then(function(response){
            console.dir(response);
            if(response.status === 200) {
                console.log(`${response.data}`);
            } else {
                console.log("Sorry, credentials may have already been setup.");
            }
        })
        .catch(function(err){
            console.log(`ERROR: ${err}`)
        })

        return function(){
            console.warn("No more subscribers...close browser or end session");
        }

});