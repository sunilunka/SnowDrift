import { readable } from "svelte/store";

type UserData = {
    username: string;
    logged_in: boolean;
}

let initialData: UserData = {
    username: "",
    logged_in: false
}


export const userdata = readable(initialData, function(set){
    fetch("http://localhost:8666/session/check_setup_ok")
        .then(function(response: Response){
            console.dir(response);
            if(response.status === 200) {
                console.log("Response code: ", response.status);
            } else {
                console.log("Sorry, credentials may have already been setup.");
            }
            return response;
        })
        .then(function(response: Response){
            switch(response.headers.get("content-type")) {
                case "text/plain":
                    return response.text();
                default:
                    return response.json();
            }
        })
        .then(function(data){
            console.log("RETURNED DATA");
            console.log(data);
        })
        .catch(function(err){
            console.log(`ERROR: ${err}`)
        })

        return function(){
            console.warn("No more subscribers...close browser or end session");
        }

});