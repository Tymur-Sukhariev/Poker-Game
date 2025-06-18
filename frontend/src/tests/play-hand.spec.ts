import { test, expect } from '@playwright/test';

test('Play a full hand and see it in history', async ({ page }) => {
  await page.goto('http://localhost:3000');

  // Assume button to start new game exists
  await page.click('text=New Game');

  // Perform actions (you may have to simulate one fold or check at least)
  await page.click('text=Fold');
  await page.click('text=All IN');

  // Wait for hand to complete and history to refresh
  await page.waitForTimeout(1000); // wait for refresh or use a better selector

  // Check if hand is in history
  const historyPanel = await page.locator('text=Players:').first();
  await expect(historyPanel).toBeVisible();
});
