import { test, expect } from '@playwright/test';

test('GET all bookings', async ({ request }) => {
  const response = await request.get('https://restful-booker.herokuapp.com/booking');
  expect(response.status()).toEqual(200);
});
