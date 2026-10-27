# Challenge submission: Lost Archive

## API
**Library of Congress JSON/YAML API**  
Base URL: https://www.loc.gov/  
Official documentation: https://www.loc.gov/apis/json-and-yaml/

The API exposes structured metadata for the Library of Congress's digitized collections, including photographs, maps, posters, manuscripts, videos, sound recordings, and collection records. The official documentation states that it is publicly accessible without an API key or authentication.

## Reproducible request

```bash
curl -L "https://www.loc.gov/search/?q=forgotten%20city&fo=json&c=12"
```

The `q` parameter supplies the search term, `fo=json` requests JSON, and `c=12` limits the response page size.

**Attach a real response captured just before submission.** The response is live and can change, so do not invent example values.

## Working demo
Lost Archive is a static web app that searches the API, renders image-led cards from returned records, links to the original item pages, and lets users load additional results. Upload the project to GitHub and deploy it through GitHub Pages, then insert the repository and live demo URLs here.

## Practical use case
A visual discovery tool for educators, designers, journalists and researchers to find archival imagery and primary-source records. It can support digital exhibits, historical storytelling, design research and classroom projects.

## Why it is special
The API provides a direct programmatic route into a large cultural-heritage collection, not just a prebuilt search page. Developers can build custom discovery experiences over photographs, maps, manuscripts and other historical material without registration or API credentials.

The Library of Congress is an established institution; the entry's claim is that this useful endpoint and its creative applications may be unfamiliar to developers who mainly use commercial image APIs.

## Terms and responsible reuse
The API is free to query without authentication, but it has rate limits. Rights vary by item, so users must check the original record's rights statement before reusing media. This project is independent and not affiliated with the Library of Congress.

Official sources:
- https://www.loc.gov/apis/json-and-yaml/
- https://www.loc.gov/apis/json-and-yaml/requests/
- https://www.loc.gov/apis/json-and-yaml/working-within-limits/
