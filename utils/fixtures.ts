import { test as base } from '@playwright/test';
import { RequestHandler } from './request.handler';
import Env from './env';
import { APILogger } from './logger';
import { createToken } from './create.token';

export type TestOptions = {
    api: RequestHandler;
}

export type WorkerFixture = {
    authToken: string
}

export const test = base.extend<TestOptions, WorkerFixture>({
    authToken: [ async ({}, use) => {
        const authToken = await createToken();
        await use(authToken);
    }, {scope: 'worker'}], 
    api: async({request}, use) => {
        const logger = new APILogger();
        const requestHandler = new RequestHandler(request, logger);
        await use(requestHandler);
    },
})
