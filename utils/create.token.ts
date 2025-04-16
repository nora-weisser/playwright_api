import { RequestHandler } from "./request.handler";
import Env from "./env";
import { request } from "@playwright/test";
import { APILogger } from "./logger";

export async function createToken() {

    const context = await request.newContext()
    const logger = new APILogger()
    const api = new RequestHandler(context, logger)


    const url = await api.getUrl('/auth');
    try {
        const tokenResponse = await api.postRequest(url, undefined, {
            "username": Env.USERNAME,
            "password": Env.PASSWORD
        })
        const responseBody = await tokenResponse.json();
        return 'token=' + responseBody.token
    } catch (error) {
        throw error
    }
}