import { test, expect } from '@playwright/test';

let bookingID: string;
let token: string;

test.beforeAll('GET Token', async ({ request }) => {
    const authResponse = await request.post('https://restful-booker.herokuapp.com/auth', {
        data: {
            "username": "admin",
            "password": "password123"
        }
    });
    const authResponseBody = await authResponse.json();
    token = authResponseBody.token;
    console.log(token);
});

test('POST create a booking', async ({ request }) => {
    const response = await request.post('https://restful-booker.herokuapp.com/booking', {
        data: {
            "firstname": "Jim",
            "lastname": "Brown",
            "totalprice": 111,
            "depositpaid": true,
            "bookingdates": {
                "checkin": "2018-01-01",
                "checkout": "2019-01-01"
            },
            "additionalneeds": "Breakfast"
        }
    });
    const responseBody = await response.json();
    expect(response.status()).toEqual(200);
    bookingID = responseBody.bookingid;
    const getBookingResponse = await request.get(`https://restful-booker.herokuapp.com/booking/${bookingID}`);
    expect(getBookingResponse.status()).toEqual(200);
});

test.afterEach('DELETE booking', async ({ request }) => {
    const deleteResponse = await request.delete(`https://restful-booker.herokuapp.com/booking/${bookingID}`, {
        headers: {
            Cookie: "token=" + token
        }
    });
});
