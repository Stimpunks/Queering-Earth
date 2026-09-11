#!/usr/bin/env python3
"""Transcode the botanical plates to AVIF and WebP at the widths they are displayed at.

WHY THIS IS A SECOND PYTHON TOOL. `CLAUDE.md` used to say make-images.py was "the one
Python tool here". The reason behind that sentence was never the count — it was that
Python is here because something has to touch pixels and nothing may need `npm install`.
Transcoding a scan is that same job, and folding it into make-images.py would mix two
unrelated ones: that tool DRAWS from the palette, this one RE-ENCODES somebody else's
scan. So the rule is now a boundary rather than a number, the same correction the
queering.js rule already took: **Python for anything that touches pixels, Node for
everything else.**

WHY AT ALL. The audit found 2.4 MB of plates served as JPEG only, with no <picture> and
no modern format. The spec's image-optimization item was rewritten on 2026-08-08, after
AVIF reached Baseline widely available on 2026-07-25: encode AVIF FIRST rather than
treating it as an enhancement layered over WebP, and keep the fallback chain, because
"widely available" describes the browser versions shipped in the last thirty months and
not the ones people are running.

THE WIDTHS ARE MEASURED, NOT GUESSED. A plate is displayed at a FIXED css width — the
layout never reflows it wider — so the ladder is short and `sizes` is simple:

    .qe-plate       max-width: 23rem  =  368px   ->  368w and 736w  (1x and 2x)
    .qe-plate-wide  max-width: 34rem  =  544px   ->  544w and 1088w

NEVER UPSCALE. A rung above the source width is dropped and the source width used
instead. Inventing pixels a 19th-century lithograph never had would make the plate
look worse and the file bigger, which is both halves of wrong.

THE ORIGINAL JPEG STAYS. It is the <img> fallback at the end of the chain and it is the
archival copy; the filename is the provenance. Nothing here overwrites it.

    python3 tools/make-plates.py            # write anything missing or out of date
    python3 tools/make-plates.py --force    # re-encode everything

Writes: images/<stem>-<width>.avif and images/<stem>-<width>.webp
"""

import sys, pathlib, hashlib, json

try:
    from PIL import Image
except ImportError:
    sys.exit("Pillow is required: python3 -m pip install --user Pillow")

for codec in ("avif", "webp"):
    from PIL import features
    if not features.check(codec):
        sys.exit(f"This Pillow has no {codec.upper()} support. Pillow >= 11 ships both; "
                 f"upgrade rather than skipping a format the spec asks for.")

REPO = pathlib.Path(__file__).resolve().parent.parent
IMAGES = REPO / "images"
FORCE = "--force" in sys.argv

# The wide plate is the only one that breaks 23rem, and it is named rather than detected
# so that adding a .qe-plate-wide figure is a decision somebody makes here too.
WIDE = {"waterhouse-1916-miranda-the-tempest",
        # Both Snark plates are wide. MEASURED, because the first version of this
        # comment claimed the chart needed 544px and that is not what a wide plate
        # gets: a normal plate's box is 368px and a wide one's is 448px, capped by
        # main's content box rather than by its own 34rem. So the gain is 22% and
        # not 48%, and it is still worth having twice over — the Ocean-Chart IS its
        # lettering, and the Barrister's Dream is dense wood engraving whose fine
        # hatching goes first. The ladder matters more than the class here: a 448px
        # box at DPR 2 wants ~896px, which only the wide ladder's 1088 rung reaches.
        # A normal plate is exactly 368 and 736, which is why that ladder is right
        # for a 368px box and short for this one.
        "holiday-1876-snark-ocean-chart-macmillan-1931",
        "holiday-1876-snark-barristers-dream-macmillan-1931",
        # Both Bewick cuts are wide, for the Barrister's-Dream reason exactly: a wood
        # engraving IS its hatching, and hatching is the first thing a short ladder
        # loses. The hedgehog is nothing but fine parallel strokes — 1650px of them
        # reduced to a 368px box turns the spines into grey. Landscape, too: at 368
        # the fox in his undergrowth is 232px tall and the animal stops being findable
        # inside his own thicket.
        "hedgehog-bewick-general-history-of-quadrupeds-1792",
        "cur-fox-bewick-general-history-of-quadrupeds-1792",
        # Almond Blossom is wide for a different reason from the four above, which are
        # all about losing fine line to a short ladder. This is a painting, and it is
        # LANDSCAPE — 1280x1011. In a 368px box it is 291px tall, and the subject is a
        # canopy seen from below, so the thing the picture is about is the spread. It
        # is also the sheet's ending rather than one of its illustrations. The
        # Sunflowers beside it stays narrow: it is portrait, and a vase on a table
        # reads perfectly well at 368.
        "van-gogh-almond-blossom-1890-vgm-google-art-project"}
LADDER_NORMAL = (368, 736)
LADDER_WIDE = (544, 1088)

# AVIF at 62 and WebP at 80 were chosen by encoding these plates and looking: fine
# lithographic hatching is what breaks first, and it survives both. Raise rather than
# lower if a future plate has finer line work than Cooke's fungi.
AVIF_Q, WEBP_Q = 62, 80

MANIFEST = REPO / "tools" / "plate-variants.json"


def variants_for(stem, native_w):
    ladder = LADDER_WIDE if stem in WIDE else LADDER_NORMAL
    widths = sorted({min(w, native_w) for w in ladder})
    return widths


def main():
    sources = sorted(p for p in IMAGES.glob("*.jpg"))
    if not sources:
        sys.exit("No plates in images/ — nothing to transcode.")

    manifest, wrote, skipped, before_total, after_total = {}, 0, 0, 0, 0
    print()
    for src in sources:
        stem = src.stem
        with Image.open(src) as im:
            im = im.convert("RGB")
            native_w, native_h = im.size
            widths = variants_for(stem, native_w)
            src_bytes = src.stat().st_size
            before_total += src_bytes
            rows = []
            for w in widths:
                h = round(native_h * w / native_w)
                resized = im.resize((w, h), Image.LANCZOS) if w != native_w else im
                for ext, kwargs in (("avif", dict(quality=AVIF_Q)),
                                    ("webp", dict(quality=WEBP_Q, method=6))):
                    out = IMAGES / f"{stem}-{w}.{ext}"
                    if out.exists() and not FORCE:
                        skipped += 1
                    else:
                        resized.save(out, **kwargs)
                        wrote += 1
                    after_total += out.stat().st_size
                    rows.append((w, ext, out.stat().st_size, out.name))
            manifest[src.name] = {
                "native": [native_w, native_h],
                "sha256": hashlib.sha256(src.read_bytes()).hexdigest(),
                "widths": widths,
                "variants": [r[3] for r in rows],
            }
            best = min((r for r in rows if r[1] == "avif"), key=lambda r: r[0])
            top = max((r for r in rows if r[1] == "avif"), key=lambda r: r[0])
            print(f"  {stem[:46]:46} {native_w:>5}px  jpeg {src_bytes//1024:>4} KB"
                  f"   ->  avif {best[0]}w {best[2]//1024:>3} KB · {top[0]}w {top[2]//1024:>3} KB")

    MANIFEST.write_text(json.dumps(manifest, indent=2, sort_keys=True) + "\n", encoding="utf-8")
    print(f"\n  {len(sources)} plate(s) · {wrote} written · {skipped} already current")
    print(f"  originals {before_total/1048576:.2f} MB · all variants {after_total/1048576:.2f} MB")
    print(f"  manifest: tools/plate-variants.json")
    print("\nWrote the plate variants. Commit them, and re-run after replacing any scan.")


if __name__ == "__main__":
    main()
