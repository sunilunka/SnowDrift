import type { UrlData, RequestConfig } from "./request.service";
import { SnowDriftRequest } from "./request.service"; 


export enum CredCheck {
    CREDENTIALS_NEED_SETUP,
    CREDENTIALS_REQUIRED,
    CREDENTIALS_VALID,
    CREDENTIALS_ERROR
}

// TODO: Set Credentials interface/type?

class SnowDriftUserService {

    sessionRequest: SnowDriftRequest;
    isDevelopment: boolean = false;

    constructor() {
        this.sessionRequest = new SnowDriftRequest({
            pathprefix: "session"
        })
        this.isDevelopment = this.sessionRequest.isDev();
    }

    generateAuthHeaderValue(username: string, password: string): string {
        let creds = btoa(`${username}:${password}`);
        return `Basic ${creds}`;
    }

    requestUserSetupStatus(config: RequestConfig): Promise<Response> {
        return this.sessionRequest.get("/check_setup_ok", config);
    };

    requestSessionCheck(config: RequestConfig, username?: string, password?: string): Promise<Response> {
        let creds = "";

        if(this.isDevelopment) { 
            creds = `?username=${username}&password=${password}`
        } else {
            config.headers.set("Authorization", this.generateAuthHeaderValue(username, password))
        }
        return this.sessionRequest.get(`/check_session${creds}`, config);
    }

    requestSetCredentials(config: RequestConfig, username: string, password: string): Promise<Response> {
        config.set("body", { username: username, password: password });
        return this.sessionRequest.post("/set_password", config, );
    }
}

export const UserService = new SnowDriftUserService();

