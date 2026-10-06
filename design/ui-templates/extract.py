# Usage: python3 extract.py <Awesome-UI-Templates/README.md> <source-commit-sha> > templates.json
import re, sys, json, html
src, commit = sys.argv[1], sys.argv[2]
text = open(src, encoding="utf-8").read()

# Category descriptions from the table at the top
desc = {}
for anchor, name, ex in re.findall(r'<td><a href="#([^"]+)">([^<]+)</a></td>\s*<td>([^<]+)</td>', text):
    desc[anchor] = (html.unescape(name), html.unescape(ex).strip())

body = text.split("## Contributors")[0]
sections = re.split(r'^[ \t]*## ', body, flags=re.M)[1:]
cats = []
for sec in sections:
    title, rest = sec.split("\n", 1)
    title = title.strip()
    if title.lower() == 'art and design': title = 'Art and Design'
    if title == "Categories":
        continue
    anchor = re.sub(r'[^a-z0-9 -]', '', title.lower()).replace(' ', '-')
    name, examples = desc.get(anchor, (title, ""))
    items = []
    # capture optional <a href> wrapping each img
    for m in re.finditer(r'(?:<a href="([^"]+)">\s*)?<img src="([^"]+)"', rest):
        link, img = m.group(1), m.group(2)
        shot = re.search(r'/screenshots/(\d+)/', img)
        user = re.search(r'/users/(\d+)/', img)
        shot_url = link.replace("/attachments", "") if link else (f"https://dribbble.com/shots/{shot.group(1)}" if shot else None)
        items.append({
            "image": img.split("?")[0],
            "shot_url": shot_url,
            "dribbble_shot_id": shot.group(1) if shot else None,
            "dribbble_user_id": user.group(1) if user else None,
        })
    if not items:
        continue
    cats.append({"category": name, "slug": anchor, "examples": examples, "templates": items})

# Design resources table (COLOR | UI GRADIENTS | ...)
resources = {}
tbl = re.search(r'^\s*\| COLOR \|.*?(?=^\s*$)', text, flags=re.M | re.S)
if tbl:
    rows = [r.strip() for r in tbl.group(0).strip().splitlines()]
    heads = [h.strip().title() for h in rows[0].strip('|').split('|')]
    for h in heads: resources[h] = []
    for r in rows[2:]:
        for h, cell in zip(heads, r.strip().strip('|').split('|')):
            m = re.search(r'\[([^\]]+)\]\(([^)]+)\)', cell)
            if m: resources[h].append({"name": m.group(1), "url": m.group(2)})

out = {
    "source": "https://github.com/KKshitiz/Awesome-UI-Templates",
    "source_commit": commit,
    "note": "All designs belong to their respective creators on Dribbble. Only links are stored here; no images are redistributed.",
    "total_templates": sum(len(c["templates"]) for c in cats),
    "categories": cats,
    "design_resources": resources,
}
json.dump(out, sys.stdout, indent=2, ensure_ascii=False)
