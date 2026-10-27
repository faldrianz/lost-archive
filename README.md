# Lost Archive

A responsive live-search explorer for the Library of Congress JSON API. Built as a submission for the challenge “Find the most useful free API nobody knows about.”

## Why this API?

The Library of Congress JSON/YAML API exposes structured metadata for digitized photographs, maps, posters, manuscripts, videos, sound recordings, collections, and more. The official documentation says it is publicly accessible without an API key or authentication. This makes it a compelling source for independent visual research tools.

This project avoids claiming the Library itself is unknown; the discovery is how much rich material developers can query directly through a documented, keyless endpoint.

## Live example

```bash
curl -L "https://www.loc.gov/search/?q=forgotten%20city&fo=json&c=12"
```

- `q` is the search phrase.
- `fo=json` requests JSON.
- `c=12` requests a small page of results.

The API response is live and may change. Save the actual output when submitting; do not invent or fabricate a response.

## Run locally

No build tools or API keys are required.

```bash
python3 -m http.server 8000
```

Open http://localhost:8000.

## What the demo does

- Live search across Library of Congress collection records.
- Displays returned images, titles, summaries and item types where available.
- Links to the original record.
- Supports suggested queries and loading more results.
- Shows the reproducible curl request for the current query.

## Practical use case

**Lost Archive** turns a large public collection into an approachable visual search experience. It could help educators, designers, journalists and researchers find historical visual material, follow unexpected connections, and prototype digital exhibits.

## Why it's special

Unlike a typical image search API, this is a public cultural-heritage collection backed by a national library. The endpoint can return structured metadata and links to original records, letting developers create new interfaces for research and discovery without an account or key.

## Important notes

- The API has rate limits. Avoid aggressive polling; the official documentation currently describes a limit of 20 requests per minute.
- Rights vary by item. Check the rights and access statements on each original record before reusing media.
- Not every record includes an image or full metadata.
- This is an independent demo, not affiliated with or endorsed by the Library of Congress.

## Official sources

- API overview: https://www.loc.gov/apis/json-and-yaml/
- Making requests: https://www.loc.gov/apis/json-and-yaml/requests/
- Rate limits: https://www.loc.gov/apis/json-and-yaml/working-within-limits/
- Example API query: https://www.loc.gov/search/?q=forgotten%20city&fo=json&c=12

## Deploy to GitHub Pages

This is a static website. Upload `index.html`, `styles.css`, `app.js`, and this README to the repository root. In repository Settings → Pages, choose deploy from branch `main` and folder `/ (root)`.
