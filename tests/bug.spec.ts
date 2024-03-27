import { test } from '@playwright/test';

test('no full screen', async ({ page }) => {
  await page.goto('https://www.w3schools.com/html/mov_bbb.mp4');
  await page.waitForTimeout(2000);
  await page.locator('video').click({
    clickCount: 2
  });
  await page.waitForTimeout(2000);
});
