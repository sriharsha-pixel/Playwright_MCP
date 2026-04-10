import { test, expect } from '@playwright/test';

test('GET /posts/1 - Validate API Response', async ({ request }) => {
  // Make a GET request to a sample API endpoint
  const response = await request.get('https://jsonplaceholder.typicode.com/posts/1');
  console.log('API Response Status:', response.status());
  console.log('API Response Body:', await response.text());
  console.log('API Response Headers:', response.headers());
  console.log('API Response JSON:', await response.json());
  console.log('API Response OK:', response.ok());
  console.log('API Response Status Text:', response.statusText());
  console.log('API Response URL:', response.url());

  // Validate that the response is successful (status 200)
  expect(response.ok()).toBeTruthy();
  expect(response.status()).toBe(200);

  // Parse the JSON response
  const data = await response.json();
  console.log('Parsed API Response Data:', data);

  // Validate the response structure and data
  expect(data).toHaveProperty('id');
  expect(data.id).toBe(1);
  expect(data).toHaveProperty('title');
  expect(typeof data.title).toBe('string');
  expect(data.title).toContain('sunt aut');
  expect(data).toHaveProperty('body');
  expect(typeof data.body).toBe('string');
  expect(data).toHaveProperty('userId');
  expect(data.userId).toBe(1);
});