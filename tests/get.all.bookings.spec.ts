import { test } from '../utils/fixtures';
import { expect } from '@playwright/test';

test('GET All Bookings', async ({ api }) => {
  const url = api.getUrl('/booking');
  const response = await api.getRequest(url);
  expect(response.status()).toEqual(200);
});