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
  await page.getByRole('heading', { name: '花店清晨的未送花束' }).waitFor();

  await page.locator('.scene-object').first().waitFor();
  if ((await page.locator('.board-cell > svg.cell-object-art').count()) !== 0) {
    throw new Error('scene cases should not render duplicate board-cell object icons');
  }

  await page.getByRole('button', { name: '江户川柯南' }).click();
  await page.getByText('柯南在盆景旁。').waitFor();

  await page.getByRole('button', { name: '第 4 行第 4 列' }).click();
  await page.getByRole('button', { name: '第 4 行第 4 列，江户川柯南' }).waitFor();

  await page.getByRole('button', { name: '第 4 行第 4 列，江户川柯南' }).click();
  await page.getByRole('button', { name: '第 4 行第 4 列' }).waitFor();

  await page.getByRole('button', { name: '江户川柯南' }).click();
  await page.getByRole('button', { name: '提示' }).click();
  await page.getByRole('button', { name: '第 1 行第 2 列，江户川柯南' }).waitFor();
  await page.getByText('江户川柯南的位置已确认。').waitFor();

  await page.getByRole('button', { name: '答案' }).click();
  await page.getByRole('button', { name: '第 1 行第 2 列，江户川柯南' }).waitFor();
  await page.getByRole('button', { name: '第 2 行第 1 列，毛利兰' }).waitFor();
  await page.getByRole('button', { name: '第 3 行第 7 列，吉田步美' }).waitFor();
  await page.getByRole('button', { name: '第 4 行第 6 列，圆谷光彦' }).waitFor();
  await page.getByRole('button', { name: '第 5 行第 5 列，毛利小五郎' }).waitFor();
  await page.getByRole('button', { name: '第 6 行第 4 列，铃木园子' }).waitFor();
  await page.getByRole('button', { name: '第 7 行第 3 列，小岛元太' }).waitFor();
  await page.getByText('答案已显示。').waitFor();

  await page.screenshot({ path: 'tests/smoke/mobile-smoke.png', fullPage: false });
} finally {
  await browser.close();
}
