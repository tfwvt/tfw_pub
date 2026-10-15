# tfw_pub

Promotional website for **Triggerfish Interactive**: a static, multi-page portfolio site for winning web development clients. No build step and no dependencies apart from Google Fonts.

## Pages

| File | What it is |
| --- | --- |
| `index.html` | Home: hero, clients, services, featured 270toWin case study, selected work, process, CTA |
| `work.html` | Filterable portfolio of 19 projects; each card opens a gallery dialog |
| `work/270towin.html` | Case study: live election maps and Kalshi prediction-market data |
| `work/ecaring.html` | Case study: website, WordPress CMS, help portal, wiki and product UI |
| `services.html` | Services, engagement models and FAQ |
| `about.html` | Studio story, timeline, behind-the-scenes hardware work, clients |
| `contact.html` | Project enquiry form |

## Structure

- `css/styles.css`: design tokens (Triggerfish teal and lime), light and dark themes, layout and components
- `js/main.js`: theme toggle, mobile nav, scroll reveal, hero parallax, work filters, project dialog, image zoom, contact form
- `js/projects.js`: **portfolio data**. Each project's title, copy, highlights, tags and gallery images live here.
- `img/work/`: optimized WebP images. `*-card.webp` files are 720×540 crops used on cards.
- `img/favicon.svg`: the Triggerfish "T" mark, redrawn as SVG; also used as the header logo
- `img/og-image.png`: 1200×630 social share image

## Editing

- **Add or change a project:** edit its entry in `js/projects.js`. On `work.html`, also add or update the matching card (`<a class="project" data-project="slug" data-category="web|sites|exhibits|media">`). The filter counts update automatically.
- **Theme:** colors are CSS custom properties at the top of `css/styles.css`. Dark is the default; light follows the visitor's system setting, and the header button lets visitors choose.
- **Contact form:** the form validates in the browser but sends nothing until you connect it. Set `data-endpoint` on `#contact-form` in `contact.html` to a form backend that accepts JSON POSTs (for example Formspree or Basin). Fields: `name`, `email`, `company`, `services`, `budget`, `timeline` and `message`. A hidden `website` field catches spam bots.
- **Social image:** `og:image` uses a relative path. Some social networks need an absolute URL, so change it to the full URL once the site has its final domain.

## Preview

```sh
python3 -m http.server 8000
# open http://localhost:8000
```

## Content sources

Copy and images come from the Triggerfish work archive (the VM-Share "work examples" folder). Exhibit photos are courtesy of Moey, Inc., and the credits are shown in each project's dialog.
