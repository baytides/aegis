# Aegis Initiative

Brand assets and resources for the Aegis Initiative, a Bay Tides program connecting veterans and service members with environmental stewardship opportunities.

## About

The Aegis Initiative recognizes that those who served our nation bring valuable skills, leadership, and purpose to defending our local environment. Veterans lead here, not just participate.

**Website:** [baytides.org/aegis](https://baytides.org/aegis)

## Brand Assets

### Logo

The Aegis logo features a stylized eagle formed by geometric shapes, representing military service and protection. The upward-facing design symbolizes aspiration and growth.

| File | Usage |
|------|-------|
| `logo/aegis-logo-dark.svg` | Black logo for light backgrounds |
| `logo/aegis-logo-light.svg` | White logo for dark backgrounds |

### Colors

| Color | Hex | Usage |
|-------|-----|-------|
| Aegis Green | `#2d5a3d` | Primary brand color |
| Aegis Green Light | `#e8f5e9` | Background accents |
| Dark mode green | `#8bc49a` | Text/accents on dark backgrounds |

### Images

| File | Description | License |
|------|-------------|---------|
| `images/veterans-talking.jpg` | Two veterans in conversation | [Unsplash License](https://unsplash.com/license) - Free for commercial use |

## Usage Guidelines

- Maintain clear space around the logo equal to the height of the "A" in AEGIS
- Do not rotate, distort, or alter the logo colors
- Use the light version on dark backgrounds, dark version on light backgrounds
- Minimum display size: 100px width

## Domain Proxy Worker

The `worker/` directory contains a Cloudflare Worker that proxies `aegisinitiative.com` to `baytides.org/aegis`.

### Deployment

1. Install Wrangler: `npm install -g wrangler`
2. Login: `wrangler login`
3. Add aegisinitiative.com to Cloudflare
4. Update `worker/wrangler.toml` with your zone configuration
5. Deploy: `cd worker && wrangler deploy`

### How it works

- `aegisinitiative.com/` → `baytides.org/aegis/`
- `aegisinitiative.com/subpage` → `baytides.org/aegis/subpage`
- Links to other Bay Tides pages (donate, contact, etc.) redirect to baytides.org
- Assets are served from baytides.org
- Canonical URLs are rewritten for SEO

## Contact

For partnership inquiries or media requests, contact us at [baytides.org/contact](https://baytides.org/contact).

---

*Aegis Initiative is a program of [Bay Tides](https://baytides.org), a 501(c)(3) nonprofit organization.*
