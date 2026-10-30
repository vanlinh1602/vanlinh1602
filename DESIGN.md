# Storybook neighborhood

The user-supplied town illustration is the visual authority. The portfolio is an experience-led surface: a coherent illustrated town leads, while interface controls stay quiet and readable.

## Artwork

Use thin warm brown outlines, flat muted pastel fills, gentle pencil grain, cream walls, terracotta and slate roofs, rounded sage trees, mint atmosphere, and small cats. Streets run diagonally between neighborhood blocks. The three principal landmarks are the left software studio, right cottage, and lower central post office. Use the clean town background without baked-in cats or clouds, with a separate transparent four-frame cat sheet and localized ambient SVG layers.

## Interface tokens

- Ink: `#51443a`; secondary ink: `#756454`.
- Paper: `#fff9ec`; page: `#f5efdf`; mint: `#acd3c3`.
- Terracotta emphasis: `#954e43`; soft coral: `#f5e5dc`.
- Border: `#d7c8af`; strong border: `#9c8269`.
- Typeface: Nunito, weights 400 through 800, with Vietnamese characters.
- Panels and scene corners: 14–18px. Controls use fine strokes and restrained offset soft shadows. Landmark names are mounted facade signs: warm wood for the studio, slate enamel for the cottage, and cream with terracotta trim for the post office.

## Interaction and responsive behavior

The town fills the entire viewport edge to edge without a page frame or external header/footer. Preserve the artwork's proportions and let its oversized axis scroll. Mouse visitors can drag the map; phone visitors can swipe it. A profile badge floats at the top left and instructions sit over the scene. A compact section selector provides keyboard and screen-reader access alongside the clickable buildings; there is no miniature map. Selecting a landmark zooms toward it beside a desktop content panel or above a phone content sheet. Keep close, return, section switching, and Escape working. Honor reduced motion. Factual content and outbound links retain their existing values.

## Camera controls

Provide small paper controls for zoom in, zoom out, current percentage, and resetting the view. The default view remains fullscreen. The minimum scale fits the complete map into the viewport; the maximum is 300% of the default view. Mouse-wheel zoom anchors the world point beneath the cursor, and two-finger pinch anchors the gesture midpoint. A single pointer drags the map, with gesture movement suppressing building clicks. The map region also accepts +, −, and 0. Opening or closing a section resets manual zoom before the existing focus transition. Scale artwork, living scenery, and building hit regions together. Facade signs use map coordinates, with a vertical shear matching each wall and a narrow lower edge suggesting thickness. They scale with the buildings during all camera movement. The whole building remains clickable, and the HTML navigation retains accessible touch and keyboard targets.

## Living scenery

Cats walk independently along configured street routes, reverse direction, and use a four-frame sprite cycle. Route motion and facing share the same SVG timeline so cats face their travel direction through pauses and resumes. Supporting motion stays quiet: slow clouds, chimney puffs, pond ripples, warm lamps, and occasional drifting leaves. These layers never intercept map clicks or dragging. The top-right motion control pauses both SVG route motion and CSS animation at their current positions. Reduced-motion preference disables autoplay by default; explicitly pressing play opts in. Hidden pages suspend animation automatically. Use browser-native SVG/CSS timelines, without a React animation loop or additional dependencies.

Motion should read within the first few seconds. Seven cats have staggered routes and more visible walking speeds; tapping a cat produces a brief hop and heart response. Butterfly wingbeats, overhead bird flocks, drifting wind trails, water reflections, and the studio screen sheen add activity at different depths. Most scenery remains non-interactive; only cat hit regions receive petting taps. A bare-map tap creates a short ripple in world coordinates, while drags and pinches suppress it. Subtle sign illumination, pressed buttons, and a short content transition explain interaction. Signs stay fixed against their facades on hover. The same pause state freezes all decorative loops. When paused, petting may show a short static heart without spatial movement.
