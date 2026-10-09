// Development fallback. Production HTML is wired to the Vite documents entry.
const source = new URL('src/documents.js', document.currentScript.src.replace(/growth\.js.*$/, ''));
import(source.href).catch(() => console.info('Document interactions are unavailable; article links remain usable.'));
