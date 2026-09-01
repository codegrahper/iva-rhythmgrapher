import requests
from bs4 import BeautifulSoup
import markdownify
import re

sitemap_urls = [
    "https://www.rhythmgrapher.com",
    "https://www.rhythmgrapher.com/rhythm-grapher",
    "https://www.rhythmgrapher.com/blank-6",
    "https://www.rhythmgrapher.com/humanfractal",
    "https://www.rhythmgrapher.com/redrums",
    "https://www.rhythmgrapher.com/낯섬에-떠도는-그리움",
    "https://www.rhythmgrapher.com/resequence4",
    "https://www.rhythmgrapher.com/performance",
    "https://www.rhythmgrapher.com/timescape",
    "https://www.rhythmgrapher.com/rhythmscape",
    "https://www.rhythmgrapher.com/drumscape",
    "https://www.rhythmgrapher.com/blank-7",
    "https://www.rhythmgrapher.com/blank-3",
    "https://www.rhythmgrapher.com/blank-4",
    "https://www.rhythmgrapher.com/blank-5",
    "https://www.rhythmgrapher.com/video"
]

inventory_md = "# RHYTHMGRAPHER Content Inventory\n\n"

for url in sitemap_urls:
    print(f"Fetching {url}")
    try:
        response = requests.get(url)
        response.encoding = 'utf-8'
        soup = BeautifulSoup(response.text, 'html.parser')
        
        title = soup.title.string if soup.title else "No Title"
        inventory_md += f"## URL: {url}\n"
        inventory_md += f"- **Page Title:** {title}\n\n"
        
        # Wix specific content container
        content_container = soup.find('main', id='PAGES_CONTAINER')
        if not content_container:
            content_container = soup.body
            
        if content_container:
            # Clean up
            for tag in content_container(["script", "style", "noscript", "svg"]):
                tag.extract()
                
            md = markdownify.markdownify(str(content_container), heading_style="ATX", strip=['img', 'iframe'])
            md = re.sub(r'\n{3,}', '\n\n', md).strip()
            
            # Remove repetitive empty link brackets from markdownify
            md = re.sub(r'\[\]\([^)]+\)', '', md)
            md = re.sub(r'\n\s*\n', '\n\n', md)
            
            inventory_md += "### Extracted Text\n"
            inventory_md += md + "\n"
        
        inventory_md += "\n### Detected Links\n"
        for a in soup.find_all('a', href=True):
            href = a['href']
            text = a.get_text(strip=True) or "No Text"
            if "youtube.com" in href or "youtu.be" in href:
                inventory_md += f"- [YouTube] {text}: {href}\n"
            elif href.startswith('http') and "rhythmgrapher.com" not in href:
                inventory_md += f"- [External] {text}: {href}\n"
            elif href.endswith('.pdf'):
                inventory_md += f"- [PDF] {text}: {href}\n"
                
        inventory_md += "\n---\n\n"
    except Exception as e:
        inventory_md += f"## URL: {url}\n- **Error:** {e}\n\n"

with open("CONTENT_INVENTORY.md", "w", encoding='utf-8') as f:
    f.write(inventory_md)

print("Done generating CONTENT_INVENTORY.md")

# generate SITE_MAP.md
sitemap_md = """# RHYTHMGRAPHER Site Map

## Current URLs to New Sections

- `https://www.rhythmgrapher.com` → `01 — INTRO` (Anchor: `/#intro`)
- `https://www.rhythmgrapher.com/rhythm-grapher` → `02 — RHYTHMGRAPHER` (Anchor: `/#rhythmgrapher`)
- `https://www.rhythmgrapher.com/blank-6` → `03 — BIO` (Anchor: `/#bio`)
- `https://www.rhythmgrapher.com/humanfractal` → `04 — DISCOGRAPHY` (Anchor: `/#human-fractal`)
- `https://www.rhythmgrapher.com/redrums` → `04 — DISCOGRAPHY` (Anchor: `/#redrums`)
- `https://www.rhythmgrapher.com/낯섬에-떠도는-그리움` → `04 — DISCOGRAPHY` (Anchor: `/#낯섬에-떠도는-그리움`)
- `https://www.rhythmgrapher.com/resequence4` → `04 — DISCOGRAPHY` (Anchor: `/#resequence4`)
- `https://www.rhythmgrapher.com/performance` → `05 — WORKS` (Anchor: `/#performance`)
- `https://www.rhythmgrapher.com/timescape` → `05 — WORKS` (Anchor: `/#timescape`)
- `https://www.rhythmgrapher.com/rhythmscape` → `05 — WORKS` (Anchor: `/#rhythmscape`)
- `https://www.rhythmgrapher.com/drumscape` → `05 — WORKS` (Anchor: `/#drumscape`)
- `https://www.rhythmgrapher.com/blank-7` → `06 — LINKS / CONTACT` (Anchor: `/#contact`)

### Unknown / Deprecated URLs (TODO: Verify content)
- `https://www.rhythmgrapher.com/blank-3`
- `https://www.rhythmgrapher.com/blank-4`
- `https://www.rhythmgrapher.com/blank-5`
- `https://www.rhythmgrapher.com/video`
"""

with open("SITE_MAP.md", "w", encoding='utf-8') as f:
    f.write(sitemap_md)

print("Done generating SITE_MAP.md")
