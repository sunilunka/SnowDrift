/**
 * @type location
 */
export type UrlData = {
    protocol: string;
    host: string;
    port: string | number;
    pathprefix?: string;
}

/**
 * @class SnowDriftRequestService
 * 
 */
export class SnowDriftRequestService {

    protocol: string = "";
    host: string = "";
    port: string | number = "";
    pathprefix: string;

    baseUrl: string = "";



    constructor(baseUrl?: UrlData) {
        this.protocol = baseUrl.protocol || window.location.protocol;
        this.host = baseUrl.host || window.location.hostname;
        this.port = baseUrl.port || window.location.port;
        this.pathprefix = baseUrl.pathprefix || "/";
        this.buildBaseUrl();
    }

    buildBaseUrl(): string {
        let port = ":"
        if(this.port) {
            switch(typeof this.port) {
                case "number": 
                    port += this.port.toString();
                    break;
                case "string":
                    port += this.port;
                default:
                    port = "";
            }
        }
        return `${this.protocol}://${this.host}${port}${this.pathprefix}`;
    }

    get() {

    }

    post() {

    }



}