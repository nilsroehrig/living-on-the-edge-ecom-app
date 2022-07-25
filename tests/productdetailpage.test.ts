import { expect, test } from '@playwright/test';

test('shows correct vendor', async ({ page }) => {
  await page.goto('/products/3560da91-ad6a-4586-922d-301b4b929871');
  expect(await page.textContent('.vendor')).toBe('Glasseria');
});

