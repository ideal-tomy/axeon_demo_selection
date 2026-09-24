import fs from 'node:fs'
import { chromium } from 'playwright'
import { listedDemos } from '../../../src/data.js'
const dir='docs/text-audit/verification-2026-09-25/layout-after'
fs.mkdirSync(dir,{recursive:true})
const routes=[['works','/'],['cat','/?view=cat'],['how','/?view=how'],['me','/?view=me'],...listedDemos().map(d=>[d.id,'/?demo='+d.id])]
const b=await chromium.launch({channel:'msedge',headless:true});const all=[]
try{
for(const [device,width,height] of [['mobile',390,844],['pc',1280,900]]){
 const c=await b.newContext({viewport:{width,height},deviceScaleFactor:1,reducedMotion:'reduce'})
 for(const [id,url]of routes){
  const p=await c.newPage(),errors=[];p.on('pageerror',e=>errors.push(e.message))
  await p.goto('http://127.0.0.1:5173'+url,{waitUntil:'networkidle'});await p.evaluate(()=>document.fonts.ready)
  if(id!=='works'&&id!=='cat'&&id!=='how'&&id!=='me')await p.locator('#detail.open').waitFor()
  const detail=!['works','cat','how','me'].includes(id),root=detail?'#dIn':id==='works'?'#cards':'.view.on'
  await p.locator('details').evaluateAll(es=>es.forEach(e=>e.open=true))
  if(!detail){for(let y=0;y<await p.evaluate(()=>document.body.scrollHeight);y+=500){await p.evaluate(y=>scrollTo(0,y),y);await p.waitForTimeout(25)}await p.evaluate(()=>scrollTo(0,0))}
  const info=await p.locator(root).evaluate(root=>{
   const nodes=[...root.querySelectorAll('h1,h2,h3,p,summary,.story-meta strong,.story-intro,.lead,.story-button,.cta,.story-section-lead')].filter(e=>e.getClientRects().length&&!e.closest('.sr-only'))
   const blocks=nodes.map(e=>{const w=document.createTreeWalker(e,NodeFilter.SHOW_TEXT),rows=[];let n;while(n=w.nextNode()){if(n.parentElement.closest('.sr-only'))continue;for(let i=0;i<n.length;i++){const ch=n.textContent[i];if(!ch.trim())continue;const r=document.createRange();r.setStart(n,i);r.setEnd(n,i+1);const x=r.getBoundingClientRect();if(!x.width||!x.height)continue;let g=rows.find(v=>Math.abs(v.y-x.y)<2);if(!g)rows.push(g={y:x.y,s:'',left:x.left,right:x.right});g.s+=ch;g.left=Math.min(g.left,x.left);g.right=Math.max(g.right,x.right)}}const r=e.getBoundingClientRect();return{text:e.textContent.trim(),selector:e.tagName.toLowerCase()+(e.className?'.'+String(e.className).split(' ').join('.'):''),lines:rows.map(x=>x.s),short:rows.length>1?rows.filter(x=>x.s.trim().length<=2).map(x=>x.s.trim()):[],overflow:rows.some(x=>x.left<r.left-2||x.right>r.right+2)}})
   return{blocks,docWidth:document.documentElement.scrollWidth,viewportWidth:innerWidth,rootWidth:root.scrollWidth,links:[...root.querySelectorAll('a')].map(a=>({text:a.textContent.trim(),href:a.getAttribute('href')})),badImages:[...root.querySelectorAll('img')].filter(i=>i.complete&&!i.naturalWidth).map(i=>i.src)}
  })
  const path=dir+'/'+device+'/'+id;fs.mkdirSync(path,{recursive:true});await p.screenshot({path:path+'/viewport.png'})
  if(detail){let i=0;for(const selector of ['.story-hero','.story-meta','.story-preview-card figcaption','.story-conditions','.story-closing','.story-related'])for(const el of await p.locator(selector).all()){if(!await el.isVisible())continue;await el.scrollIntoViewIfNeeded();await el.screenshot({path:path+'/part-'+String(++i).padStart(2,'0')+'.png'})}}
  else if(id==='works'){let i=0;for(const el of await p.locator('#cards .card').all()){await el.scrollIntoViewIfNeeded();await el.screenshot({path:path+'/card-'+String(++i).padStart(2,'0')+'.png'})}}
  const result={device,id,url,errors,...info};all.push(result);fs.writeFileSync(path+'/audit.json',JSON.stringify(result,null,2));console.log(device,id,'short',info.blocks.filter(x=>x.short.length&&!x.short.every(s=>/^0[123]$/.test(s))).length,'overflow',info.blocks.filter(x=>x.overflow).length,'document',info.docWidth)
  await p.close()
 }
 await c.close()
}
}finally{await b.close()}
fs.writeFileSync(dir+'/all.json',JSON.stringify(all,null,2))
