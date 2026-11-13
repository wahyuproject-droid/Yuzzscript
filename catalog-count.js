/* Server-side total count for Vercel. Returns exact count when the last catalog page is accessible,
 * otherwise a clearly marked pagination-based approximate count. Never invents an exact total. */
'use strict';

const ORIGIN = 'https://scriptblox.com/api/script/fetch';
const PAGE_SIZE = 20;
let recent = null;
let recentAt = 0;
let pending = null;

async function getPage(page) {
  const url = new URL(ORIGIN);
  url.searchParams.set('page', String(page));
  url.searchParams.set('max', String(PAGE_SIZE));
  url.searchParams.set('sortBy', 'updatedAt');
  url.searchParams.set('order', 'desc');
  const response = await fetch(url, {
    headers: { Accept: 'application/json' },
    signal: AbortSignal.timeout(6500),
    redirect: 'follow'
  });
  if (!response.ok) throw new Error(`ScriptBlox HTTP ${response.status}`);
  const data = await response.json();
  const result = data?.result;
  if (!result || !Number.isSafeInteger(Number(result.totalPages)) || !Array.isArray(result.scripts)) {
    throw new Error('Format API tidak valid');
  }
  return result;
}

async function compute() {
  const first = await getPage(1);
  const pages = Number(first.totalPages);
  const size = Number(first.max) || PAGE_SIZE;
  if (!Number.isSafeInteger(pages) || pages < 1 || pages > 10000000 ||
      !Number.isSafeInteger(size) || size < 1 || size > PAGE_SIZE) {
    throw new Error('Metadata pagination tidak valid');
  }
  const lowerBound = (pages - 1) * size + 1;
  const upperBound = pages * size;
  let exact = null;
  if (pages === 1) exact = first.scripts.length;
  else {
    try {
      const last = await getPage(pages);
      const length = last.scripts.length;
      if (length > 0 && length <= size && Number(last.totalPages) === pages) {
        exact = (pages - 1) * size + length;
      }
    } catch (_) {
      // ScriptBlox can reject high page numbers/rate limit the last page.
    }
  }
  const count = exact == null ? Math.round((lowerBound + upperBound) / 2) : exact;
  return {
    ok: true, count,
    precision: exact == null ? 'approximate' : 'exact',
    range: exact == null ? { min: lowerBound, max: upperBound } : null,
    totalPages: pages, pageSize: size, updatedAt: new Date().toISOString(), source: 'ScriptBlox pagination'
  };
}

module.exports = async function handler(req, res) {
  if (req.method !== 'GET') {
    res.setHeader('Allow', 'GET');
    return res.status(405).json({ ok: false, error: 'Method not allowed' });
  }
  res.setHeader('Cache-Control', 'public, max-age=0, s-maxage=120, stale-while-revalidate=600');
  try {
    if (recent && Date.now() - recentAt < 120000 && req.query?.refresh !== '1') return res.status(200).json(recent);
    if (!pending) pending = compute().finally(() => { pending = null; });
    const value = await pending;
    recent = value;
    recentAt = Date.now();
    return res.status(200).json(value);
  } catch (_) {
    if (recent) return res.status(200).json({ ...recent, stale: true });
    return res.status(503).json({ ok: false, error: 'Katalog ScriptBlox belum dapat diakses' });
  }
};
