import { test as base } from '@playwright/test';
import { RequestHandler } from './request_handler';

export type TestOptions = {
    api: RequestHandler;
}

export const test = base.extend<TestOptions>({
    api: async({request}, use) => {
        const baseUrl = 'https://restful-booker.herokuapp.com';
        const requestHandler = new RequestHandler(request, baseUrl);
        await use(requestHandler);
    }
})
