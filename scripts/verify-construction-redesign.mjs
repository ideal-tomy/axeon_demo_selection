import { chromium } from 'playwright';
import assert from 'node:assert/strict';
const browser = await chromium.launch({headless:true});
try {
const page=await browser.newPage();const errors=[];page.on('pageerror',e=>errors.push(e.message));
for(const width of [320,390,768,1280]){
await page.setViewportSize({width,height:844});
await page.goto('http://localhost:4173/?demo=construction-record');
await page.locator('.story-preview-card img').first().waitFor();
await page.evaluate(()=>Promise.all([...document.images].map(i=>i.decode().catch(()=>{}))));
await page.waitForTimeout(500);
const metrics=await page.evaluate(()=>{const d=document.querySelector('#detail');return {width:d.clientWidth,scrollWidth:d.scrollWidth,images:[...document.querySelectorAll('.story-gallery img')].every(i=>i.complete&&i.naturalWidth>0),previewTop:document.querySelector('.story-gallery').getBoundingClientRect().top};});
assert(metrics.scrollWidth<=metrics.width,JSON.stringify(metrics));assert(metrics.images);assert(metrics.previewTop<650);
await page.screenshot({path:`docs/construction-redesign-${width}.png`});
const gallery=page.locator('.story-gallery');await gallery.focus();await page.keyboard.press('ArrowRight');await page.waitForTimeout(400);
if(width<701) assert(await gallery.evaluate(e=>e.scrollLeft>0));
assert.equal(await page.getByText('デモの操作手順',{exact:true}).count(),0);
assert(await page.getByRole('heading',{name:'このツールで変わること',exact:true}).isVisible());
assert.equal(await page.locator('.story-compare-stack-icon').count(),0);
if(width>=701) assert(await page.locator('.story-construction-compare-pc').isVisible());
if(width<701) assert(await page.locator('.story-construction-compare-mobile').isVisible());
assert.equal(await page.locator('#story-usecase').count(),0);
assert.equal(await page.locator('#story-conditions details').evaluate(el=>el.open),false);
assert.equal(await page.getByRole('heading',{name:'こんな業務に',exact:true}).count(),0);
assert.equal(await page.locator('#story-experience-detail').count(),0);
const conditionsSummary=page.locator('#story-conditions summary').filter({hasText:'利用条件・写真を使う際の注意'});
await conditionsSummary.click();
assert(await page.locator('#story-conditions .story-disclosure-body ul li').first().isVisible());
assert.equal(await page.locator('.story-related').count(),0);
assert(await page.getByRole('heading',{name:'実際に試してみる',exact:true}).isVisible());
assert(await page.locator('.story-closing--cta-strong').isVisible());
await page.locator('#dBack').click();assert(new URL(page.url()).searchParams.get('view')==='all');
await page.goto('http://localhost:4173/?demo=construction-record');
console.log(width,metrics,'interactions passed');
}
await page.setViewportSize({width:390,height:844});await page.goto('http://localhost:4173/?demo=shift');await page.waitForTimeout(500);await page.screenshot({path:'docs/construction-redesign-reference.png'});
assert.deepEqual(errors,[]);console.log('No page errors');
} finally {await browser.close();}

