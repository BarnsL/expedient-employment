import fs from 'node:fs';
import path from 'node:path';
import http from 'node:http';
import assert from 'node:assert/strict';
import {fileURLToPath} from 'node:url';
import {createRequire} from 'node:module';
import {build} from '../../gui/node_modules/esbuild/lib/main.js';
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..');
if (!process.argv[2]) throw new Error('Usage: node crew/tests/check-ui.mjs OUTPUT_FOLDER');
const output = path.resolve(process.argv[2]);
fs.mkdirSync(output,{recursive:true});
// Uses a global Playwright install so the repository needs no browser dependency.
const require = createRequire(path.join(process.env.APPDATA || '','npm/node_modules/@playwright/cli/package.json'));
const {chromium} = require('playwright');
const result = await build({stdin:{contents:`import React from 'react'; import {createRoot} from 'react-dom/client'; import Employment from './crew/expedient-employment/ui/index.mjs'; createRoot(document.getElementById('root')).render(React.createElement(Employment));`,resolveDir:root,sourcefile:'ui-check.jsx',loader:'jsx'},bundle:true,write:false,format:'esm',nodePaths:[path.join(root,'gui/node_modules')],plugins:[{name:'fixture-sdk',setup(b){b.onResolve({filter:/^@codexcrew\/app-sdk$/},()=>({path:path.join(root,'crew/tests/ui-fixture.mjs')}));}}]});
const html = `<!doctype html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><style>:root{--bg:#f7f8fa;--card:#fff;--text:#172235;--muted:#526176;--border:#c7d0dd;--accent:#145ac2;--accent-fg:#fff;--danger:#b52632;--ok:#127543}body{margin:0}#root{height:calc(100vh - 28px)}#fixture{height:28px;background:#27384d;color:white;padding:4px 16px;box-sizing:border-box;font:13px system-ui}</style></head><body><div id="fixture">Isolated UI fixture. No live backend, credentials or applications.</div><div id="root"></div><script type="module" src="/app.js"></script></body></html>`;
const server = http.createServer((req,res)=>{res.setHeader('Content-Type',req.url==='/app.js'?'text/javascript':'text/html');res.end(req.url==='/app.js'?result.outputFiles[0].text:html);});
await new Promise(resolve=>server.listen(0,'127.0.0.1',resolve));
const base = 'http://127.0.0.1:'+server.address().port;
const browser = await chromium.launch({channel:'msedge',headless:true});
const page = await browser.newPage({viewport:{width:1440,height:900}});
const errors=[];page.on('pageerror',error=>errors.push(error.message));
const checks=[];
try {
  await page.goto(base);
  await page.getByRole('heading',{name:'Expedient Employment',exact:true}).waitFor();
  await page.screenshot({path:path.join(output,'employment-desktop.png')});
  for(const name of ['Assistant','Automations','Web workbench','Search','Jobs','Applications','Agents','Browser','Paperclip','Resume-Matcher','Settings']) {
    await page.getByRole('button',{name,exact:true}).first().click();
    await page.waitForTimeout(80);
    assert.ok((await page.locator('main').innerText()).trim().length>10,name);
    checks.push('navigation: '+name);
  }
  await page.getByRole('button',{name:'Validate',exact:true}).first().click();
  assert.ok(await page.getByText('valid JSON',{exact:true}).count());
  await page.getByRole('button',{name:'Save',exact:true}).first().click();
  await page.getByText(/saved \(backup/).first().waitFor();
  checks.push('settings validation and save dispatch');
  await page.getByRole('button',{name:'Jobs',exact:true}).click();
  await page.getByText('Software Engineer II, Azure Arc',{exact:true}).waitFor();
  await page.screenshot({path:path.join(output,'employment-jobs.png')});
  await page.setViewportSize({width:430,height:900});
  await page.screenshot({path:path.join(output,'employment-narrow.png')});
  assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),'Employment viewport overflow');
  await page.setViewportSize({width:1440,height:900});
  await page.evaluate(()=>{for(const [key,value] of Object.entries({'--bg':'#111827','--card':'#182235','--text':'#f1f5f9','--muted':'#b2c0d3','--border':'#45556e','--accent':'#8baeff','--accent-fg':'#101b30'})) document.documentElement.style.setProperty(key,value);});
  await page.waitForFunction(()=>getComputedStyle(document.querySelector('.expedient-crew')).color==='rgb(241, 245, 249)');
  await page.screenshot({path:path.join(output,'employment-dark.png')});
  const colors = await page.getByRole('button',{name:'Jobs',exact:true}).evaluate(el=>({text:getComputedStyle(el).color,background:getComputedStyle(el).backgroundColor}));
  assert.notEqual(colors.text,colors.background);
  checks.push('dark theme follows Crew tokens');
  assert.deepEqual(errors,[]);
  checks.push('desktop and narrow viewport containment','no runtime page errors');
  fs.writeFileSync(path.join(output,'ui-verification.json'),JSON.stringify({fixture:true,passed:checks.length,checks},null,2));
  console.log(JSON.stringify({fixture:true,passed:checks.length,output}));
} finally {await browser.close();server.close();}
