import { chromium } from 'playwright';

const targetUrl = process.env.SMOKE_URL ?? 'http://127.0.0.1:64466/';
const browser = await chromium.launch({ headless: true });
const page = await browser.newPage({
  isMobile: true,
  viewport: { width: 390, height: 844 }
});

try {
  await page.addInitScript(() => window.localStorage.clear());
  await page.goto(targetUrl, { waitUntil: 'load' });
  await page.getByRole('heading', { name: '毛利侦探事务所的遗失录音' }).waitFor();

  await page.getByRole('button', { name: '第 1 行第 2 列' }).click();
  await page.locator('button[aria-label="第 1 行第 2 列"] .cell-object', { hasText: '报纸' }).waitFor();

  await page.getByRole('button', { name: '浅井编辑' }).click();
  await page.getByText('浅井编辑说自己一直盯着报纸剪报。').waitFor();

  await page.getByRole('button', { name: '浅井编辑' }).click();
  await page.getByRole('button', { name: '第 4 行第 4 列' }).click();
  await page.getByRole('button', { name: '第 4 行第 4 列，浅井编辑' }).waitFor();

  await page.getByRole('button', { name: '第 4 行第 4 列，浅井编辑' }).click();
  await page.getByRole('button', { name: '第 4 行第 4 列' }).waitFor();

  await page.getByRole('button', { name: '浅井编辑' }).click();
  await page.getByRole('button', { name: '提示' }).click();
  await page.getByRole('button', { name: '第 1 行第 2 列，浅井编辑' }).waitFor();
  await page.getByText('浅井编辑的位置已确认。').waitFor();

  await page.getByRole('button', { name: '答案' }).click();
  await page.getByRole('button', { name: '第 1 行第 2 列，浅井编辑' }).waitFor();
  await page.getByRole('button', { name: '第 2 行第 4 列，北岛快递员' }).waitFor();
  await page.getByRole('button', { name: '第 3 行第 1 列，真壁委托人' }).waitFor();
  await page.getByRole('button', { name: '第 4 行第 3 列，佐久间经理' }).waitFor();
  await page.getByText('答案已显示。').waitFor();

  await page.screenshot({ path: 'tests/smoke/mobile-smoke.png', fullPage: false });
} finally {
  await browser.close();
}
