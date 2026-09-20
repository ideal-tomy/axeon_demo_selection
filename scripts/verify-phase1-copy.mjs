import { chromium } from 'playwright';
import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { DEMOS, featuredDemos } from '../src/data.js';
const base = 'http://127.0.0.1:4187';
const out = new URL('../docs/phase1-verification/', import.meta.url);
await fs.mkdir(out, { recursive: true });
const browser = await chromium.launch({ headless: true, channel: 'msedge' });
const errors = [], results = [];
try {
 const page = await browser.newPage();
 page.on('pageerror', e => errors.push(e.message));
 for (const width of [390, 1280]) {
  await page.setViewportSize({width,height:844});
  await page.goto(base);
  await page.locator('#cards .card').first().waitFor();
  assert.equal(await page.locator('#cards .card').count(),featuredDemos().length);
  assert.equal(await page.locator('#countListed').innerText(),'28');
  await page.screenshot({path:fileURLToPath(new URL(`home-${width}.png`,out))});
  await page.locator('#openAll').click();
  await page.locator('.catalog-card').first().waitFor();
  assert.equal(await page.locator('.catalog-card').count(),28);
  await page.screenshot({path:fileURLToPath(new URL(`catalog-${width}.png`,out))});
  await page.locator('#allList [data-id="construction-record"]').click();
  await page.locator('#dBack').waitFor();
  assert.equal(new URL(page.url()).searchParams.get('demo'),'construction-record');
  await page.screenshot({path:fileURLToPath(new URL(`detail-${width}.png`,out))});
  await page.reload();
  await page.locator('#dBack').waitFor();
  await page.locator('#dBack').click();
  await page.goto(`${base}/?view=all&q=${encodeURIComponent('シフト')}`);
  await page.locator('.catalog-card').first().waitFor();
  assert.equal(await page.locator('.catalog-card').count(),1);
  results.push({width,homeCards:5,catalogCards:28,detailAndReload:true,search:true});
 }
 for(const demo of DEMOS){
  await page.goto(`${base}/?demo=${demo.id}`);
  await page.locator('#dBack').waitFor();
  assert((await page.locator('#dIn').innerText()).trim().length>0,demo.id);
 }
 assert.deepEqual(errors,[]);
 const report={checkedAt:new Date().toISOString(),base,results,detailsChecked:DEMOS.length,pageErrors:errors};
 await fs.writeFile(new URL('result.json',out),JSON.stringify(report,null,2));
 console.log(JSON.stringify(report,null,2));
}finally{await browser.close();}
