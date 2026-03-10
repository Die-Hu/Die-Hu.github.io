# Diorama Studio

**AI-generated city diorama miniature art** — photorealistic tilt-shift style images of world-renowned universities and natural landscapes.

🌐 **Live site:** [die-hu.github.io](https://die-hu.github.io)

## Features

- **51+ Artworks** — Universities, national parks, and landmarks from around the world
- **Interactive 3D Globe** — Browse artworks geographically on a rotating globe ([globe.gl](https://github.com/vasturiano/globe.gl))
- **Gallery** — Filterable grid view with lightbox preview and region-based filtering
- **Crypto Payment** — Binance Pay, USDT (TRC20/ERC20), BTC, ETH
- **Dark + Gold Theme** — Elegant design with Playfair Display typography

## Pages

| Page | Description |
|------|-------------|
| `index.html` | Landing page with hero, featured works, pricing |
| `gallery.html` | Full gallery with category and region filters |
| `globe.html` | Interactive 3D globe with location markers |
| `product.html` | Dynamic product detail (via `?id=` param) |
| `payment.html` | Crypto payment flow with QR codes |

## Tech Stack

- **Frontend:** Vanilla HTML/CSS/JS (no framework, no build step)
- **Globe:** [globe.gl](https://github.com/vasturiano/globe.gl) via CDN
- **Fonts:** Google Fonts (Playfair Display + Inter)
- **Payment QR:** [qrcode.js](https://github.com/soldair/node-qrcode) via CDN
- **Hosting:** GitHub Pages (static)

## Data

- `data/products.json` — Product catalog (51 entries)
- `data/globe-points.json` — Geographic coordinates for globe markers (49 points)

## Image Pipeline

Source images (2048×2048 PNG) are processed into:
- **Preview** (800px, watermarked JPEG) — for display
- **Thumbnail** (400px JPEG) — for gallery cards

Run `process-images.sh` to regenerate all previews and thumbnails.

## License

All artwork and prompts are proprietary. The website code is provided as-is for the purpose of hosting and displaying the art collection.

---

*Built with AI assistance. Powered by Claude.*
