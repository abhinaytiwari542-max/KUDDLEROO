# Kuddleroo — website

Marketing site for **Kuddleroo**, a parent-and-toddler space in Sector 15-D, Chandigarh.

Static HTML/CSS/JS. No build step, no dependencies, no framework — open `index.html`
or drop the folder on any host.

```
index.html
assets/
  css/styles.css
  js/main.js
  img/…
```

## Run locally

```bash
python3 -m http.server 4173
```

Then open <http://localhost:4173>. (Use a server rather than opening the file
directly so relative asset paths and the map embed behave.)

## Deploy

Any static host works — Netlify, Vercel, Cloudflare Pages, GitHub Pages, or plain
nginx/Apache. Upload the whole folder; `index.html` is the entry point.

If you put it on a custom domain, update two things in `index.html`:

- `<link rel="canonical" href="https://kuddleroo.in/">`
- `<meta property="og:image" …>` — social previews need an **absolute** URL
  (e.g. `https://yourdomain.com/assets/img/space-balloons.webp`)

## ⚠️ One thing to finish: the enrolment form

The enrolment button currently opens WhatsApp. The Google Form linked from the
Instagram bio is the **owner** URL (`/forms/d/<id>/viewform`) — it returns a 401
sign-in wall for anyone who isn't the form's owner, so it isn't safe to give to
parents.

To switch the button to the form:

1. Open the form → **Send** (or **Publish**) → copy the **link**.
2. It should look like `https://docs.google.com/forms/d/e/1FAIpQLSc…/viewform`.
3. Paste it into the `href` of the enrolment button in `index.html` (there's a
   comment marking the exact spot, search for `ENROLMENT LINK`).

## Content sources

Everything on the page comes from Kuddleroo's own public material:

| Detail | Source |
| --- | --- |
| Founder bio (Neena Aggarwal) | Instagram "Meet the heart behind Kuddleroo" post, 26 Jan 2026 |
| The kangaroo + cuddle name story | second slide of that same Instagram post |
| Programmes, days and timings | Instagram "Our current batches" post + profile bio |
| "A Toddler's Safe Haven", "explore, imagine and grow" | Instagram bio and the inauguration post |
| Address, phone | Google Business listing, magicpin listing |
| Interior photos | magicpin store gallery |
| Activity posters (pottery, puppet show, sensory, pool day) | Instagram feed |
| Logo, brand colours | Instagram profile mark, sampled from the source images |

Contact details used:

- Phone **+91 98140 82995**
- WhatsApp **+91 92170 02598**
- Aggarwal Ashram, Prem Sagar Nanda Marg, 15-D, Sector 15, Chandigarh 160015
- Instagram [@kuddleroo](https://www.instagram.com/kuddleroo/)

Nothing on the page is invented — no fee figures, no age ranges, no testimonials,
no opening hours beyond the published batch timings. Add those once you have them.

**Spelling note:** the founder's name is rendered **Neena Aggarwal**, which is how it
appears in Kuddleroo's own Instagram graphic. A web sweep across directories, press
and social found no other public source for her, so that post is the authority.

## Design notes

Palette is sampled directly from the brand assets rather than approximated:

| Token | Value | Where it came from |
| --- | --- | --- |
| `--g-600` | `#038442` | the logo wordmark |
| `--cream` | `#FDF7E9` | the background of their Instagram posters |
| `--yellow` | `#F9E90F` | the profile-picture badge |
| `--mint` | `#D3E5E1` | the actual painted wall colour in the room |

Type is **Baloo 2** (display — matches the chunky rounded headlines on their
posters) and **Nunito** (body), both from Google Fonts.

Other things worth knowing if you edit it:

- Scroll reveals use `IntersectionObserver`, not scroll-driven CSS animations,
  so they work in Firefox too.
- `prefers-reduced-motion: reduce` switches off the decorative motion — the bobbing
  doodles, the spinning badge, the pulsing dot and the scroll reveals. The word
  ticker is the deliberate exception: frozen, it hides most of its own words, so it
  keeps scrolling (slower) and pauses on hover or keyboard focus per WCAG 2.2.2.
  If the whole page looks still on your machine, check System Settings →
  Accessibility → Display → Reduce motion.
- Childlike texture is drawn in CSS/SVG, not images: confetti dots (`.tex-dots`),
  scalloped section edges (`.scallop`), and pencil/puzzle/balloon/star doodles.
- The page is deliberately light-only (`color-scheme: light`) — the brand is a
  warm cream palette and a dark inversion would fight it.
- `ChildCare` JSON-LD structured data is in the `<head>` for local SEO. Keep the
  timings there in sync with the Programmes section if they change.
- Images are `loading="lazy"` except the hero, which is `fetchpriority="high"`.
