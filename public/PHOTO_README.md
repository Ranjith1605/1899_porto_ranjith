# The portrait

The site reads the portrait from one place: the `PHOTO` object at the top of
`constants.tsx`. There are two files:

| File | Used for | Shape |
|---|---|---|
| `ranjith-avatar.jpg` | The hero circle | 1600 × 1600 square, head dead centre |
| `ranjith-profile.jpg` | The "view full photo" panel | The unpadded portrait |

## Why two files

The source photo has almost no margin around the head, so any circular crop of
it clips the hair or the chin. The avatar solves that by padding the photo out
to a square with its own blurred background and a radial feather, so the whole
head sits inside the circle with room to spare. The full portrait stays as-is
for the panel.

## Swapping in a new photo

1. Drop the new image into `public/`.
2. Point `PHOTO.full` at it in `constants.tsx`.
3. For the circle, either point `PHOTO.avatar` at a square you have already
   cropped with the face centred, or rebuild one from the new file — the
   padding technique is a short Pillow script: blur-and-darken a scaled copy
   as the background, place the portrait so the head centre lands on the
   canvas centre, and paste it through a large blurred elliptical mask.
4. `npm run build` and check the hero.

## Source quality

For a crisp 420 px circle on a retina screen the avatar wants to be at least
1200 px square; 1600 is comfortable. Below that it softens when enlarged — no
processing recovers detail that is not in the file.

The current portrait was recovered from the CV PDF, which holds roughly
350 × 430 px of real detail. It has been resampled and sharpened to the limit
of that source. A real photo file at 1200 × 1600 or larger would look
materially better.

## Formats

JPEG at quality 85–90 for photographs; keep each file under ~400 KB so the
hero paints fast.
