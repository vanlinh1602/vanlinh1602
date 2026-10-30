# Artwork

Runtime artwork lives in `public/images/town/` and is referenced only through `src/configs/artwork.ts`.

| File                                    | Use                                                          |
| --------------------------------------- | ------------------------------------------------------------ |
| `public/images/town/background.png`     | Clean town backdrop (no baked-in cats or clouds), 1000 × 700 |
| `public/images/town/cat-walk-sheet.png` | Transparent four-frame cat walk sprite sheet                 |
| `assets/reference/storybook-town.png`   | Original reference image; not shipped, kept for re-cropping  |

Style notes (outlines, palette, landmarks) are in `DESIGN.md`. Hit regions and facade signs are aligned to the backdrop in `src/configs/mapViews.ts`; re-check them whenever `background.png` changes.
