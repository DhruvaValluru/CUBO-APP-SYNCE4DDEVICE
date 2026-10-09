# Usage: python3 render_md.py templates.json > README.md
import json, sys
d = json.load(open(sys.argv[1], encoding="utf-8"))
# Categories whose screens map most directly onto CUBO features (dashboards, scores, vehicles, maps, goals)
CUBO = ["auto-and-vehicles", "maps-and-navigation", "health-and-fitness", "productivity", "finance", "tools", "parenting"]
L = []
w = L.append
w("# UI Templates\n")
w(f"{d['total_templates']} mobile app UI design references across {len(d['categories'])} categories, extracted from "
  f"[KKshitiz/Awesome-UI-Templates]({d['source']}) (commit `{d['source_commit'][:7]}`).\n")
w("> All designs belong to their original creators on Dribbble. This catalog only links to them — no images are copied "
  "into this repo. Click any thumbnail to open the original shot and credit the designer.\n")
w("Machine-readable version: [`templates.json`](templates.json). Regenerate with [`extract.py`](extract.py) and [`render_md.py`](render_md.py).\n")
w("## Most relevant to CUBO\n")
w("Categories whose screens are closest to CUBO's scores, trend charts, vehicle management, goals, and parent reports:\n")
by = {c["slug"]: c for c in d["categories"]}
for s in CUBO:
    c = by[s]
    w(f"- [{c['category']}](#{s}) ({len(c['templates'])}): {c['examples']}")
w("\n## All categories\n")
w("| Category | Templates | Examples |\n| --- | :---: | --- |")
for c in d["categories"]:
    w(f"| [{c['category']}](#{c['slug']}) | {len(c['templates'])} | {c['examples']} |")
w("")
for c in d["categories"]:
    w(f'<a id="{c["slug"]}"></a>\n\n## {c["category"]}\n')
    if c["examples"]:
        w(f"_{c['examples']}_\n")
    w('<p float="left">')
    for t in c["templates"]:
        href = t["shot_url"] or t["image"]
        w(f'  <a href="{href}"><img src="{t["image"]}" width="49%"></a>')
    w("</p>\n")
w("## Design resources\n")
w("Tool links from the same source list.\n")
for k, items in d["design_resources"].items():
    w(f"**{k.replace('Ui', 'UI').replace('Ux', 'UX')}:** " + " · ".join(f"[{i['name']}]({i['url']})" for i in items) + "\n")
print("\n".join(L))
