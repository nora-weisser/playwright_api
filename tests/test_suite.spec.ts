import { test } from "../utils/fixtures";

test('first test', async ({ api }) => {
    api
        .url('https://restful-booker.herokuapp.com/auth')
        .body({
            "username": "admin",
            "password": "password123"
        })
});
