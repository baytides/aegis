/**
 * Aegis Initiative Domain Proxy Worker
 *
 * Proxies aegisinitiative.com to baytides.org/aegis
 * while keeping the aegisinitiative.com URL in the browser.
 */

const ORIGIN = 'https://baytides.org';
const AEGIS_PATH = '/aegis';

// Paths that should redirect to baytides.org (not Aegis-specific)
const REDIRECT_PATHS = ['/about', '/donate', '/volunteer', '/events', '/privacy', '/terms'];

export default {
  async fetch(request) {
    const url = new URL(request.url);
    const path = url.pathname;

    // Redirect non-Aegis pages to baytides.org
    for (const redirectPath of REDIRECT_PATHS) {
      if (path === redirectPath || path.startsWith(redirectPath + '/')) {
        return Response.redirect(`${ORIGIN}${path}`, 302);
      }
    }

    // Contact page - redirect to baytides.org/contact
    if (path === '/contact' || path.startsWith('/contact/')) {
      return Response.redirect(`${ORIGIN}${path}`, 302);
    }

    // Map paths:
    // / -> /aegis/
    // /anything -> /aegis/anything
    // /assets/* -> /assets/* (no prefix, assets are at root)
    let originPath;

    if (path.startsWith('/assets/')) {
      // Assets are served from baytides.org root
      originPath = path;
    } else if (path === '/' || path === '') {
      originPath = AEGIS_PATH + '/';
    } else {
      originPath = AEGIS_PATH + path;
    }

    const originUrl = ORIGIN + originPath + url.search;

    // Fetch from origin
    const response = await fetch(originUrl, {
      method: request.method,
      headers: request.headers,
      body: request.body,
    });

    // For HTML responses, rewrite links
    const contentType = response.headers.get('content-type') || '';

    if (contentType.includes('text/html')) {
      let html = await response.text();

      // Rewrite /aegis/ links to /
      html = html.replace(/href="\/aegis\//g, 'href="/');
      html = html.replace(/href='\/aegis\//g, "href='/");

      // Rewrite /aegis" to /" (for exact /aegis link)
      html = html.replace(/href="\/aegis"/g, 'href="/"');
      html = html.replace(/href='\/aegis'/g, "href='/'");

      // Update canonical URL for SEO
      html = html.replace(
        /https:\/\/baytides\.org\/aegis/g,
        'https://aegisinitiative.com'
      );

      // Return modified HTML
      return new Response(html, {
        status: response.status,
        headers: {
          ...Object.fromEntries(response.headers),
          'content-type': 'text/html; charset=utf-8',
        },
      });
    }

    // For non-HTML, pass through as-is
    return response;
  },
};
