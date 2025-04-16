import { test } from '../utils/fixtures';
import Env from '../utils/env';
import { expect } from '@playwright/test';

//test.use({ storageState: { cookies: [], origins: [] } });

test('Authentication Test', async ({ api }) => {
  const url = api.getUrl('/auth');
  const authResponse = await api.postRequest(url, {
    "username": Env.USERNAME,
    "password": Env.PASSWORD
  });
  expect(authResponse.status()).toEqual(200);
});
