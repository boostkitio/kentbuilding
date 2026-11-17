/**
 * IndexNow submission for kentbuildingandconstruction.co.uk, run by hand when content meaningfully changes
 * (same pattern as the other Boostkit sites).
 *
 * Usage:  node scripts/indexnow.mjs                    (main pages)
 *         node scripts/indexnow.mjs --all              (full sitemap, major refreshes only)
 *         node scripts/indexnow.mjs --match "blog/"    (sitemap pages matching a pattern)
 *         add --dry-run to print without submitting
 *
 * It refuses to submit while the live robots.txt disallows everything.
 * Never wire this into the build: submitting on every deploy gets a host banned by Bing
 * (UserForbiddedToAccessSite), and only a support ticket lifts it.
 * IndexNow notifies Bing, Yandex, Seznam and Naver. Google does not use it.
 */
const HOST = "kentbuildingandconstruction.co.uk"
const INDEXNOW_KEY = "6e7ff6cc2dd6c50919fcd3b6d27e7724" // public/<key>.txt
const KEY_LOCATION = `https://${HOST}/${INDEXNOW_KEY}.txt`
const MAIN_PATHS = ["/"]

const arg = (name) => process.argv[process.argv.indexOf(name) + 1]
const dryRun = process.argv.includes("--dry-run")

const robots = await (await fetch(`https://${HOST}/robots.txt`, { cache: "no-store" })).text()
if (/^\s*disallow:\s*\/\s*$/im.test(robots) && !dryRun) {
  console.error("[IndexNow] robots.txt still disallows everything (site not launched). Nothing submitted.")
  process.exit(1)
}

async function sitemapUrls() {
  const res = await fetch(`https://${HOST}/sitemap.xml`, { cache: "no-store" })
  if (!res.ok) throw new Error(`sitemap fetch failed: ${res.status}`)
  return Array.from((await res.text()).matchAll(/<loc>([^<]+)<\/loc>/g))
    .map((m) => m[1].trim())
    .filter((u) => u.includes(HOST))
}

const match = process.argv.includes("--match") ? new RegExp(arg("--match")) : null
const urls = match
  ? (await sitemapUrls()).filter((u) => match.test(u))
  : process.argv.includes("--all")
    ? await sitemapUrls()
    : MAIN_PATHS.map((p) => `https://${HOST}${p === "/" ? "" : p}`)
if (dryRun) {
  console.log(`[IndexNow] Dry run, would submit ${urls.length} URLs:\n  ${urls.join("\n  ")}`)
  process.exit(0)
}
const response = await fetch("https://api.indexnow.org/IndexNow", {
  method: "POST",
  headers: { "Content-Type": "application/json; charset=utf-8" },
  body: JSON.stringify({ host: HOST, key: INDEXNOW_KEY, keyLocation: KEY_LOCATION, urlList: urls }),
})
if (response.status === 200 || response.status === 202) console.log(`[IndexNow] ${urls.length} URLs accepted (${response.status}).`)
else if (response.status === 403) console.log("[IndexNow] Host is in Bing's UserForbiddedToAccessSite state. Open a Bing Webmaster Tools support ticket.")
else console.warn(`[IndexNow] Unexpected response ${response.status}: ${await response.text().catch(() => "")}`)
