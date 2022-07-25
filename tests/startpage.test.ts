import { expect, test } from '@playwright/test';

test('brand has correct text', async ({ page }) => {
  await page.goto('/');
  expect(await page.textContent('.brand')).toBe('svekom');
});
