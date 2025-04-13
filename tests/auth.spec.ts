import { test, expect } from '@playwright/test';

test('Auth', async ({ request }) => {
  const authResponse = await request.post('https://restful-booker.herokuapp.com/auth', {
    data: {
      "username": "admin",
      "password": "password123"
    }
  });
  expect(authResponse.status()).toEqual(200);
});
