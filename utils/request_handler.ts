import { APIRequestContext } from "@playwright/test";

export class RequestHandler {

    private request: APIRequestContext;
    private baseUrl: string | undefined;
    private defaultBaseUrl: string;
    private apiPath: string = '';
    private queryParams: object = {};
    private apiHeaders: object = {};
    private apiBody: object = {};

    constructor(request: APIRequestContext, apiBaseUrl: string) {
        this.request = request;
        this.defaultBaseUrl = apiBaseUrl;
    }


    url(url: string) {
        this.baseUrl = url;
        return this;
    }

    path(path: string) {
        this.apiPath = path;
        return this;
    }

    params(params: object) {
        this.queryParams = params;
        return this;
    }

    headers(headers: object) {
        this.apiHeaders = headers;
        return this;
    }

    body(body: object) {
        this.apiBody = body;
        return this;
    }

    private getUrl() {
        const url = new URL(`${this.baseUrl ?? this.defaultBaseUrl}${this.apiPath}`);
        for (const [key, value] of Object.values(this.queryParams)) {
            url.searchParams.append(key, value);
        }
        return url.toString();
    }
}