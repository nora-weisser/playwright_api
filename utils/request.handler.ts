import { APIRequestContext, expect } from "@playwright/test";
import { APILogger } from "./logger";
import Env from "./env";

export class RequestHandler {

    private request: APIRequestContext;
    private logger: APILogger;

    constructor(request: APIRequestContext, logger: APILogger) {
        this.request = request;
        this.logger = logger;
    }

    async getRequest(url: string, headers?: {[key: string]: string}) {
        this.logger.logRequest('GET', url, headers);
        const response = await this.request.get(url, {
            headers: headers
        });
        const responseJSON = await response.json();
        this.logger.logResponse(response.status(), responseJSON);
        return response;
    }

    async postRequest(url: string, apiBody?: object, headers?: {[key: string]: string}) {
        this.logger.logRequest('POST', url, headers, apiBody);
        const response = await this.request.post(url, {
            headers: headers,
            data: apiBody
        });
        const responseJSON = await response.json();
        this.logger.logResponse(response.status(), responseJSON);
        return response;
    }

    async putRequest(url: string, apiBody?: object, headers?: {[key: string]: string}) {
        this.logger.logRequest('PUT', url, headers, apiBody);
        const response = await this.request.put(url, {
            headers: headers,
            data: apiBody
        });
        const responseJSON = await response.json();
        return response;
    }

    async deleteRequest(url: string, headers?: {[key: string]: string}) {
        this.logger.logRequest('DELETE', url, headers);
        const response = await this.request.delete(url, {
            headers: headers
        });
        const responseJSON = await response.json();
        return response;
    }

    getUrl(apiPath: string, queryParams?: object) {
        const url = new URL(`${Env.API_URL}${apiPath}`);
        if (queryParams) {
            for (const [key, value] of Object.values(queryParams)) {
                url.searchParams.append(key, value);
            }
        }
        return url.toString();
    }
}
