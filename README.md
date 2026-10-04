# jhlee0619.github.io

Personal research site of **Junhyeok Lee**, a Ph.D. student working on medical imaging AI for imperfect clinical data.

Live: https://jhlee0619.github.io · Korean: https://jhlee0619.github.io/?lang=ko

## Structure

```
index.html            page skeleton (static copy + i18n keys)
assets/js/data.js     ALL content: research directions, publications, repos, awards, timeline, EN/KO strings
assets/js/main.js     rendering + interactions (research tabs, figure lightbox, filters, command palette, live stats)
assets/js/hero.js     hero canvas (sparse scan that "recovers" around the cursor)
assets/css/style.css  design tokens (light/dark) and layout
assets/img/           profile photo, Open Graph card
```

No build step. Edit `assets/js/data.js` and push — GitHub Pages serves the files as-is.

## Updating content

- **New paper** → add an object to `SITE.publications` (newest first; mark co-first authors with a trailing `*`).
- **New award** → add to `SITE.awards`.
- **New repo** → add to `SITE.repos` (`repo` enables live GitHub stars, `npm` enables live download counts).
- **Copy** → edit the `I18N.en` / `I18N.ko` dictionaries.

## Local preview

```bash
python -m http.server 8000
# open http://localhost:8000
```

## Live data

Star counts (GitHub REST API) and npm download totals (api.npmjs.org) are fetched client-side and cached for an hour per session. If either API is unavailable, the static values in `data.js` are shown.
