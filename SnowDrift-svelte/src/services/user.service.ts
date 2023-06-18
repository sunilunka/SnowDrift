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

    requestUserSetupStatus(config: RequestConfig): Promise<Response> {
        return this.sessionRequest.get("/check_setup_ok", config);
    };

    requestSessionCheck(config: RequestConfig, username?: string = "", password?: string = ""): Promise<Response> {
        let creds = "";

        if(this.isDevelopment) { 
            creds = `?username=${username}&password=${password}`
        } else {

        }
        return this.sessionRequest.get(`/check_session${creds}`, config);
    }

    requestSetCredentials(config: RequestConfig, username: string, password: string): Promise<Response> {
        return this.session.post("/set_password", { username: username, password: password });
    }
}

export const UserService = new SnowDriftUserService();

