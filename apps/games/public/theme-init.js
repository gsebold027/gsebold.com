// Applies the saved theme class before first paint so the page doesn't flash the default.
// An external file, not inline, so the CSP can stay script-src 'self'. Mirrors ThemeProvider in
// @gsebold/ui: the shared "theme" cookie (PREFERENCE_KEYS.theme), then localStorage, then dark.
;(function () {
  var c = document.documentElement.classList
  try {
    var m = document.cookie.match(/(?:^|; )theme=([^;]*)/)
    var t = (m && decodeURIComponent(m[1])) || localStorage.getItem('theme') || 'dark'
    if (t === 'system') t = matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
    c.add(t)
  } catch (e) {
    c.add('dark')
  }
})()
