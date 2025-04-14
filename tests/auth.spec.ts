import { test } from '../utils/fixtures';

test('Auth', async ({ api }) => {
  const authResponse = await api.path('/auth').body({
    "username": "admin",
    "password": "password123"
  }).postRequest(200);
});
