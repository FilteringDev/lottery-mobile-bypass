import * as ESBuild from 'esbuild'
import * as Process from 'node:process'
import PackageJson from '@npmcli/package-json'

let ProjectRoot = Process.cwd()
if (Process.cwd().endsWith('/builder')) {
  ProjectRoot = Process.cwd() + '/..'
}

let Banner = `
// ==UserScript==
// @name         lottery-mobile-bypass`
Banner += `\n// @version    ${(await PackageJson.load(ProjectRoot)).content.version ?? '0.0.0'}`
Banner += '\n// @match      *://dhlottery.co.kr/*'
Banner += '\n// @match      *://*.dhlottery.co.kr/*'
Banner += '\n// @grant      unsafeWindow'
Banner += '\n// @downloadURL https://cdn.jsdelivr.net/npm/@filteringdev/lottery-mobile-bypass@latest/dist/lottery-mobile-bypass.user.js'
Banner += '\n// @updateURL   https://cdn.jsdelivr.net/npm/@filteringdev/lottery-mobile-bypass@latest/dist/lottery-mobile-bypass.user.js'
Banner += '\n// ==/UserScript=='

await ESBuild.build({
  entryPoints: [`${ProjectRoot}/userscript/source/index.ts`],
  bundle: true,
  minify: false,
  banner: {
    js: Banner,
  },
  outfile: `${ProjectRoot}/dist/lottery-mobile-bypass.user.js`,
  target: ['es2024', 'chrome119', 'firefox142', 'safari26']
})