import { expect } from '@playwright/test';
import { test } from '../utils/fixtures';

let bookingID: string;
let token: string;

test.beforeAll('GET Token', async ({ api }) => {
    const authResponse = await api
        .path('/auth')
        .body({
            "username": "admin",
            "password": "password123"
        }).postRequest(200)
    token = authResponse.token;
});

test('POST create a booking', async ({ api }) => {
    const response = await api
        .path('/booking')
        .body({
            "firstname": "Jim",
            "lastname": "Brown",
            "totalprice": 111,
            "depositpaid": true,
            "bookingdates": {
                "checkin": "2018-01-01",
                "checkout": "2019-01-01"
            },
            "additionalneeds": "Breakfast"
        }).postRequest(200);
    bookingID = response.bookingid;
    const getBookingResponse = await api.path(`/booking/${bookingID}`).getRequest(200);
});

test.afterEach('DELETE booking', async ({ api }) => {
    const deleteResponse = await api.path(`/booking/${bookingID}`).headers({
        Cookie: `token=${token}`
    }).deleteRequest(201);
});
