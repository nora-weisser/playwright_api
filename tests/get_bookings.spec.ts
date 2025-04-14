import { expect } from '@playwright/test';
import { test } from '../utils/fixtures';

test('GET all bookings', async ({ api }) => {
  const response = await api.path('/booking').getRequest(200);
  expect(response.status()).toEqual(200);
});
