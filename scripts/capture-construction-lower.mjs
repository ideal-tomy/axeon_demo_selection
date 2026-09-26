import { chromium } from 'playwright';

const browser = await chromium.launch({ headless: true });
try {
  const page = await browser.newPage();
  await page.goto('http://localhost:4173/?demo=construction-record');
  await page.locator('.story-preview-card img').first().waitFor();
  await page.evaluate(() => Promise.all([...document.images].map(i => i.decode().catch(() => {}))));

  await page.setViewportSize({ width: 1280, height: 900 });
  await page.locator('#story-benefits').scrollIntoViewIfNeeded();
  await page.waitForTimeout(300);
  await page.screenshot({ path: 'docs/construction-lower-pc-1280.png', fullPage: true });

  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('http://localhost:4173/?demo=construction-record');
  await page.locator('#story-benefits').scrollIntoViewIfNeeded();
  await page.waitForTimeout(300);
  await page.screenshot({ path: 'docs/construction-lower-mobile-390.png', fullPage: true });

  const checks = await page.evaluate(() => ({
    icons: document.querySelectorAll('.story-compare-stack-icon').length,
    usecaseBorder: getComputedStyle(document.querySelector('.story-fit-grid')).borderTopWidth,
    accordionOpen: document.querySelector('#story-conditions details')?.open ?? null
  }));
  console.log('checks', checks);
} finally {
  await browser.close();
}
