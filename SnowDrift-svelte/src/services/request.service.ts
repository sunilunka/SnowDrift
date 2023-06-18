/**
 * @type location
 */
export type UrlData = {
    protocol?: string;
    host?: string;
    port?: string | number;
    pathprefix?: string;
}

export interface RequestConfig {
    method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE" | "OPTIONS"; 
    headers: Headers;
    mode?: "cors" | "no-cors" | "same-origin"; // Default is "cors"
    cache?: "default" | "no-cache" | "reload" | "force-cache" | "only-if-cached"; // Default is "default"
    credentials?: "include" | "same-origin" | "omit"; // Default is "same-origin"
    redirect?: "manual" | "follow" | "error"; // Default "follow" 
    referrerPolicy?: "no-referrer" | "no-referrer-when-downgrade" | "origin" | "origin-when-cross-origin" | "same-origin" | "strict-origin" | "strict-origin-when-cross-origin" | "unsafe-url"; // Default "no-referrer-when-downgrade"
}

/**
 * @class SnowDriftRequest
 * 
 */
export class SnowDriftRequest {

    private PROD_PORT: string = "2501";
    private protocol: string = "";
    private host: string = "";
    private port: string | number = "";
    private pathprefix: string;
    private devEnvironment: boolean = false;

    private baseUrl: String = "";



    constructor(baseData?: UrlData) {
        this.protocol = baseData.protocol || window.location.protocol;
        this.host = baseData.host || window.location.hostname;
        this.port = baseData.port || window.location.port;

        let pathprefix = "/";
        if(baseData.hasOwnProperty("pathprefix")) {
            if(baseData.pathprefix[0] !== "/") {
                pathprefix = `${pathprefix}${baseData.pathprefix.slice(0)}`
            } else {
                pathprefix += baseData.pathprefix;
            }
        }

        this.pathprefix = pathprefix;
        this.setBaseParameters();
        this.baseUrl = this.buildBaseUrl();
    }

    private generatePath(pathname: string): string {
        let path = "/";
        if(pathname[0] === "/") {
            path = `${path}${pathname.slice(1)}`;
        }
        return path; 
    }

    /**
     * 
     * @returns string -> a concatenated string representing the base URL the request will use.
     */
    private buildBaseUrl(): string {
        let port = ":"
        if(this.port) {
            switch(typeof this.port) {
                case "number": 
                    port += this.port.toString();
                    break;
                case "string":
                    port += this.port;
                    break;
                default:
                    port = "";
                    break;
            }
        }
        return `${this.protocol}://${this.host}${port}${this.pathprefix}`;
    }

    /**
     * isDevelopment 
     *  
     * Check if this is development environment or not based on port designation.
     * TODO: Improve development environment logic. (Perhaps if/when containerisation of client app occurs).
     * 
     * @returns boolean 
     */
    private isDevelopment(): boolean {
        return (this.port !== this.PROD_PORT) 
        || (this.port !== "80") || (this.port.length <= 0)
    }
    
    /**
     * Check parameters and set development params if required. Overrides user specified data. 
     */
    private setBaseParameters(): void {
        if(this.isDevelopment()) {
            this.protocol = "http"
            this.host = "localhost"
            this.port = "8666";
        }
    }

    isDev(): boolean {
        return this.devEnvironment;
    }

    get(pathname: string, config: RequestConfig) {
        let path = this.generatePath(pathname);

        if(config.method !== "GET") {
            config.method = "GET";
        }

        return fetch(`${this.buildBaseUrl()}${path}`, config);
    }

    post(pathname: string, config: RequestConfig) {
        let path = this.generatePath(pathname);

        if(config.method !== "POST") {
            config.method = "POST";
        }

        if(!config.hasOwnProperty("body")) {
            config["body"] = {};
        }

        return fetch(`${this.buildBaseUrl()}${path}`, config);
    }
    
    delete(pathname: string, config: RequestConfig) {
        let path = this.generatePath(pathname);

        if(config.method !== "DELETE") {
            config.method = "DELETE";
        }

        return fetch(`${this.buildBaseUrl()}${path}`, config);
    }




}