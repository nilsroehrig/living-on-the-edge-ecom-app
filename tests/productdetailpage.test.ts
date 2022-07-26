import { expect, test } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('/products/3560da91-ad6a-4586-922d-301b4b929871');
});

test('shows correct product information', async ({ page }) => {
  expect(await page.textContent('.vendor')).toBe('Glasseria');
  expect(await page.textContent('.title')).toBe('Golden Sunglasses');
  expect(await page.textContent('.price')).toBe('€ 1299.00');
  expect(await page.textContent('.category')).toBe('Accessories');
  expect(await page.textContent('.origin')).toBe('Molvanîa');
  expect(await page.getAttribute('.image', 'src')).toBe(
    '/products/accessories-sunglasses-golden.jpg'
  );
});
