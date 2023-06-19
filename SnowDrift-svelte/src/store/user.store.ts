import { writable } from "svelte/store";

import type { UrlData, RequestConfig } from "../services/request.service";

import { CredCheck, UserService } from  "../services/user.service";

type UserData = {
    logged_in: boolean;
    first_login: boolean;
    login_error: string;
    username?: string;
    password?: string;
}

let initialData: UserData = {
    logged_in: false,
    first_login: false,
    login_error: "",
    username: "",
    password: ""
}

let getConfig: RequestConfig = {
    method: "GET",
    headers: new Headers()
}

let checkCredsValid = function(response: Response): Response {
    if(response.status === 200) {
        response["login_status"] = CredCheck.CREDENTIALS_VALID;
    } else {
        response["login_status"] = CredCheck.CREDENTIALS_ERROR;
    }
    return response;
}

let validityError = function(error): Response {
    throw new Error(error);  
}


export const userdata = writable(initialData, function(set){
    getConfig.headers.set("Content-Type", "text/plain; application/json");
    
    UserService.requestUserSetupStatus(getConfig)
        .then(function(response: Response){
            console.dir(response);
            switch(response.status) {
                case 200:
                    return UserService.requestSessionCheck(getConfig, initialData.username, initialData.password)
                        .then(checkCredsValid)
                        .catch(validityError);
                    break;
                case 406:
                    console.log("Credentials are hard coded into config file");
                    response["login_status"] = CredCheck.CREDENTIALS_REQUIRED;
                    return response;
                    break;
                case 500:
                    console.log("No credentials set, need user to setup.");
                    response["login_status"] = CredCheck.CREDENTIALS_NEED_SETUP;
                    return response;
                    break;
                default:
                    response["login_status"] = CredCheck.CREDENTIALS_ERROR;
                    return response;
                    break;
            }
        })
        .then(function(response: Response){
            switch(response["login_status"]){
                case CredCheck.CREDENTIALS_VALID:
                    set({
                        ...initialData,
                        logged_in: true
                    });
                    break;
                case CredCheck.CREDENTIALS_REQUIRED:
                    set({
                        ...initialData,
                    });
                    break;
                case CredCheck.CREDENTIALS_NEED_SETUP:
                    set({
                        ...initialData,
                        first_login: true
                    });
                    break;
                default:
                    set({
                        ...initialData,
                        login_error: `Error Status: ${response.status} - ${response.statusText}`
                    });
                    break;
            }
        })
        .catch(function(err){
            console.log(`ERROR: ${err}`)
            set({
                ...initialData,
                logged_in: false,
                login_error: `${err}`
            })
        })

        return function(){
            console.warn("No more subscribers...close browser or end session");
        }

});