#!/usr/bin/env python3
"""Generate the favicons and the Open Graph cards for queering.earth.

WHY THIS IS PYTHON when every other tool here is Node: it needs to rasterise, and
the repo's standing rule is that nothing requires `npm install`. Pillow ships with
the Python on this machine; there is no Node equivalent without a dependency. If
Pillow is missing this fails loudly rather than emitting a blank card.

WHY IT IS A GENERATOR and not a folder of hand-made PNGs: every new sheet wants an
OG card, and a card made by hand once is a card that drifts from the palette the
next time a token changes. The colours below are read from queering.css so there is
one source of truth for them, exactly as CLAUDE.md requires of the pages.

    python3 tools/make-images.py

Writes: favicon.ico, apple-touch-icon.png, images/og-*.png
"""

import re, sys, pathlib
try:
    from PIL import Image, ImageDraw, ImageFont
except ImportError:
    sys.exit("Pillow is required: python3 -m pip install --user Pillow")

REPO = pathlib.Path(__file__).resolve().parent.parent

# ── the palette, read from queering.css so it cannot drift ────────────────────
css = (REPO / "queering.css").read_text(encoding="utf-8")
def token(name):
    m = re.search(r"--qe-%s:\s*(#[0-9a-fA-F]{6})" % re.escape(name), css)
    if not m:
        sys.exit("token --qe-%s not found in queering.css" % name)
    return m.group(1)

PAPER      = token("paper")
PAPER_DEEP = token("paper-deep")
INK        = token("ink")
MOSS       = token("moss")
RUST       = token("rust")
LICHEN     = token("lichen")
VERDIGRIS  = token("verdigris")
VIOLET     = token("violet")
MARIGOLD   = token("marigold")
CORAL      = token("coral")
RULE       = token("rule")

# ── fonts. Iowan Old Style is the site's own first fallback after Fraunces, so a
#    card set in it is what a reader without the webfont already sees. ──────────
def font(size, bold=False, italic=False):
    for path, idx in (("/System/Library/Fonts/Supplemental/Iowan Old Style.ttc",
                       (3 if bold and italic else 1 if bold else 2 if italic else 0)),):
        try:
            return ImageFont.truetype(path, size, index=idx)
        except Exception:
            pass
    name = "Georgia"
    if bold: name += " Bold"
    if italic: name += " Italic" if bold else " Italic"
    for p in ("/System/Library/Fonts/Supplemental/%s.ttf" % name,
              "/System/Library/Fonts/Supplemental/Georgia.ttf"):
        try:
            return ImageFont.truetype(p, size)
        except Exception:
            pass
    return ImageFont.load_default()

def bezier(p0, p1, p2, p3, steps=60):
    pts = []
    for i in range(steps + 1):
        t = i / steps
        u = 1 - t
        x = u*u*u*p0[0] + 3*u*u*t*p1[0] + 3*u*t*t*p2[0] + t*t*t*p3[0]
        y = u*u*u*p0[1] + 3*u*u*t*p1[1] + 3*u*t*t*p2[1] + t*t*t*p3[1]
        pts.append((x, y))
    return pts

# ── the mark: a pressed leaf, pinned. ────────────────────────────────────────
# Upright and filled in MOSS, not tilted and filled in LICHEN. Both earlier versions
# were judged at 64px and both died at 16: a tilted leaf reads as a diagonal stroke,
# and lichen on vellum has too little contrast to be anything at all. A favicon is
# judged at 16px, so these were rendered at 16 and compared before this one was kept.
# The pale rib is what stops the shape reading as a generic teardrop at larger sizes;
# the rust dot is the wordmark's, pinning the specimen to the sheet.
def draw_mark(d, cx, cy, s):
    """s is the half-size of the square the mark occupies."""
    import math
    L, w = s * 1.95, s * 0.66
    bot, top = cy + L/2, cy - L/2
    def side(sign):
        return [(cx + sign*w*math.sin(math.pi*i/32), bot - L*i/32) for i in range(33)]
    d.polygon(side(1) + list(reversed(side(-1))), fill=MOSS)
    d.line([(cx, bot), (cx, top)], fill=LICHEN, width=max(1, int(s * 0.11)))
    r = s * 0.23
    d.ellipse([cx-r, bot-r, cx+r, bot+r], fill=RUST)

def favicon(size):
    ss = 4  # supersample, then downsample: PIL has no antialiased polygon
    img = Image.new("RGB", (size*ss, size*ss), PAPER)
    d = ImageDraw.Draw(img)
    draw_mark(d, size*ss/2, size*ss/2, size*ss*0.40)
    return img.resize((size, size), Image.LANCZOS)

ico_sizes = [16, 32, 48, 64]
favicon(64).save(REPO / "favicon.ico", sizes=[(s, s) for s in ico_sizes])
favicon(180).save(REPO / "apple-touch-icon.png")
favicon(512).save(REPO / "images" / "icon-512.png")

# ── the Open Graph cards ──────────────────────────────────────────────────────
W, H = 1200, 630

def spray(d, x0, y0, scale, accents):
    """The site's botanical idiom: one stem, leaves along it, heads of several colours."""
    stem = bezier((x0, y0), (x0+120*scale, y0-70*scale),
                  (x0+260*scale, y0-110*scale), (x0+400*scale, y0-130*scale))
    d.line(stem, fill=MOSS, width=max(2, int(4*scale)), joint="curve")
    for i, col in enumerate(accents):
        t = 0.22 + i * (0.62 / max(1, len(accents) - 1))
        px, py = stem[int(t * (len(stem)-1))]
        # short side stem
        top = (px + 6*scale, py - 44*scale)
        d.line(bezier((px, py), (px+2*scale, py-20*scale), (px+5*scale, py-30*scale), top),
               fill=MOSS, width=max(1, int(2.5*scale)))
        # the head
        r = 15 * scale
        for k in range(6):
            import math
            a = math.radians(k * 60)
            ex, ey = top[0] + math.cos(a)*r*0.62, top[1] + math.sin(a)*r*0.62
            d.ellipse([ex-r*0.52, ey-r*0.36, ex+r*0.52, ey+r*0.36], fill=col, outline=MOSS)
        d.ellipse([top[0]-r*0.28, top[1]-r*0.28, top[0]+r*0.28, top[1]+r*0.28], fill=INK)
        # a leaf on the main stem
        lp = stem[int((t - 0.10) * (len(stem)-1))]
        lt = (lp[0] - 40*scale, lp[1] + 16*scale)
        up = bezier(lp, (lp[0]-14*scale, lp[1]-14*scale), (lt[0]+10*scale, lt[1]-14*scale), lt)
        dn = bezier(lt, (lt[0]+10*scale, lt[1]+10*scale), (lp[0]-14*scale, lp[1]+14*scale), lp)
        d.polygon(up + dn, fill=LICHEN, outline=MOSS)

def wrap(d, text, f, maxw):
    words, lines, cur = text.split(), [], ""
    for w in words:
        t = (cur + " " + w).strip()
        if d.textlength(t, font=f) <= maxw or not cur:
            cur = t
        else:
            lines.append(cur); cur = w
    if cur: lines.append(cur)
    return lines

def og_card(out, title, kicker, sub, accent):
    ss = 2
    img = Image.new("RGB", (W*ss, H*ss), PAPER)
    d = ImageDraw.Draw(img)
    # the foxed wash: three soft stains, the same idea as body::before
    wash = Image.new("RGB", (W*ss, H*ss), PAPER)
    wd = ImageDraw.Draw(wash)
    for (cx, cy, rr) in ((0.14, 0.12, 0.52), (0.88, 0.26, 0.44), (0.72, 0.94, 0.48)):
        wd.ellipse([(cx-rr)*W*ss, (cy-rr)*H*ss, (cx+rr)*W*ss, (cy+rr)*H*ss], fill=PAPER_DEEP)
    from PIL import ImageFilter
    img = Image.blend(img, wash.filter(ImageFilter.GaussianBlur(120*ss)), 0.55)
    d = ImageDraw.Draw(img)

    # accent tape across the top, the same device as a card on the plate
    d.rectangle([0, 0, W*ss, 10*ss], fill=accent)

    m = 80 * ss
    # the site line
    f_site = font(30*ss)
    x = m
    d.text((x, 70*ss), "QUEERING", font=f_site, fill=MOSS)
    x += d.textlength("QUEERING", font=f_site) + 5*ss
    r = 4.5*ss                     # the wordmark's rust dot, drawn rather than typed
    d.ellipse([x, 96*ss - r, x + 2*r, 96*ss + r], fill=RUST)
    x += 2*r + 5*ss
    d.text((x, 70*ss), "EARTH", font=f_site, fill=MOSS)

    # the kicker, when there is one to draw. The index card has none: its kicker
    # would have read "QUEERING EARTH" directly under "QUEERING.EARTH".
    if kicker:
        f_k = font(23*ss)
        d.text((m, 132*ss), kicker.upper(), font=f_k, fill=MOSS)

    # the title
    f_t = font(78*ss, bold=True)
    lines = wrap(d, title, f_t, W*ss - 2*m - 250*ss)
    y = 186*ss
    for ln in lines[:3]:
        d.text((m, y), ln, font=f_t, fill=INK)
        y += 92*ss

    # the sub
    if sub:
        f_s = font(30*ss, italic=True)
        for ln in wrap(d, sub, f_s, W*ss - 2*m - 300*ss)[:2]:
            d.text((m, y + 26*ss), ln, font=f_s, fill=MOSS)
            y += 42*ss

    # rule and footer
    d.line([m, H*ss - 96*ss, W*ss - m, H*ss - 96*ss], fill=RULE, width=2*ss)
    f_f = font(24*ss)
    d.text((m, H*ss - 78*ss), "Stimpunks Foundation  ×  More Realms", font=f_f, fill=MOSS)

    # Sized to FIT: the stem runs 400*scale from x0, so x0 + 400*scale must stay
    # inside the canvas or the far head is drawn off the edge and silently lost.
    spray(d, W*ss - 500*ss, H*ss - 150*ss, 1.2*ss, [VIOLET, accent, VERDIGRIS])
    img.resize((W, H), Image.LANCZOS).save(out, optimize=True)

(REPO / "images").mkdir(exist_ok=True)
og_card(REPO/"images"/"og-index.png", "Post-normal possibilities.", "",
        "Reading art, literature, poetry, politics, people, and history through a queering lens.",
        LICHEN)
og_card(REPO/"images"/"og-on-being-ill.png", "The Army of the Upright", "Sheet · a reading",
        "Virginia Woolf, On Being Ill, as she left it in 1930.", VERDIGRIS)
og_card(REPO/"images"/"og-coming-to-terms.png", "Coming to Terms", "Sheet · an essay",
        "Ryan Boren on a lifetime of seeking a word that fits.", VIOLET)
og_card(REPO/"images"/"og-promises-like-pie-crust.png", "The Die Uncast", "Sheet · a reading",
        "Christina Rossetti, Promises like Pie-crust, written 20 April 1861.", CORAL)
og_card(REPO/"images"/"og-invention-of-normal.png", "Wyrd, Weird, and the Invention of Normal",
        "Sheet · a reading",
        "Before it meant strange, it meant fate.",
        MARIGOLD)
og_card(REPO/"images"/"og-design.png", "How this site is made", "Colophon",
        "A Victorian herbarium sheet as the model: the palette, the type, the drawings.", MARIGOLD)

for p in ("favicon.ico", "apple-touch-icon.png", "images/icon-512.png",
          "images/og-index.png", "images/og-on-being-ill.png", "images/og-coming-to-terms.png",
          "images/og-design.png", "images/og-promises-like-pie-crust.png"):
    f = REPO / p
    print("  %-34s %7d bytes" % (p, f.stat().st_size))
