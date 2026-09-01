# Swapping the hero portrait

The site reads the portrait from one place: the `PHOTO` object at the top of
`constants.tsx`.

## To swap in a new photo

1. Drop the image into this `public/` folder, e.g. `public/ranjith-hero.jpg`.
2. Open `constants.tsx` and update `PHOTO`:

```ts
export const PHOTO = {
  src: '/ranjith-hero.jpg',
  fit: 'contain',        // 'contain' for a full-body shot, 'cover' for head-and-shoulders
  position: '50% 22%',   // only used when fit is 'cover'
  alt: 'Ranjith Ramadass',
};
```

3. `npm run build` and check the hero.

## Choosing `fit`

| `fit` | What the circle shows | Use when |
|---|---|---|
| `cover` | Fills the circle, edges cropped | Head-and-shoulders photo |
| `contain` | The **whole** image, nothing cropped | Full-body shot where the pose and hands must stay visible (the WhatsApp-DP look) |

With `contain`, the image sits on the circle's dark background, so a photo with a
clean or transparent background looks best.

## Source quality

For a crisp 400px circle on a retina screen the image needs to be at least
**1200 x 1600 px**; 2000px on the long edge is comfortable. Below that it will
soften when enlarged — no amount of processing recovers detail that is not in the
file, because upscaling invents pixels rather than revealing them.

The current `ranjith-profile.jpg` was recovered from the CV PDF, where the photo
is only about **350 x 430 px (0.15 megapixels)** of real detail. That is the cause
of the softness; it is a source-file limit, not a display setting.

## Formats

JPEG at quality 85-90 for photographs. PNG only if the background is transparent
(a cut-out portrait) — PNG photographs are several times larger for no visible
gain. Keep the file under ~400KB so the hero paints fast.
