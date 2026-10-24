// Prerendered pages carry inline <script>s (React Router's hydration data and bootstrap, and the
// theme script in root.tsx). Their content is fixed at build time, so instead of allowing every
// inline script, this adds a CSP <meta> to each HTML file that allows only those exact scripts by
// hash. nginx's CSP header allows inline scripts; the browser enforces both policies, so only the
// hashed scripts can run.
import { createHash } from 'node:crypto'
import { readFile, readdir, writeFile } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const clientDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../dist/client')
const EXTERNAL_SCRIPT_SOURCES = ["'self'", 'https://static.cloudflareinsights.com']
const INLINE_SCRIPT = /<script(?![^>]*\bsrc=)[^>]*>([\s\S]*?)<\/script>/gi

const findHtmlFiles = async (dir) => {
  const entries = await readdir(dir, { withFileTypes: true })
  const files = await Promise.all(
    entries.map((entry) => {
      const fullPath = path.join(dir, entry.name)
      if (entry.isDirectory()) return findHtmlFiles(fullPath)
      return entry.name.endsWith('.html') ? [fullPath] : []
    })
  )
  return files.flat()
}

const htmlFiles = await findHtmlFiles(clientDir)
if (htmlFiles.length === 0) throw new Error(`No HTML files found in ${clientDir}`)

for (const file of htmlFiles) {
  const html = await readFile(file, 'utf8')
  if (html.includes('http-equiv="Content-Security-Policy"')) continue

  const hashes = [...html.matchAll(INLINE_SCRIPT)]
    .map(([, content]) => content)
    .filter((content) => content.trim().length > 0)
    .map((content) => `'sha256-${createHash('sha256').update(content, 'utf8').digest('base64')}'`)
  const policy = `script-src ${[...EXTERNAL_SCRIPT_SOURCES, ...new Set(hashes)].join(' ')}`

  // Must come before any script in <head> to apply to it.
  const tag = `<meta http-equiv="Content-Security-Policy" content="${policy}"/>`
  const withPolicy = html.replace(/<head>/i, `<head>${tag}`)
  if (withPolicy === html) throw new Error(`No <head> found in ${file}`)

  await writeFile(file, withPolicy)
  console.log(`csp: ${path.relative(clientDir, file)} (${hashes.length} inline scripts)`)
}
