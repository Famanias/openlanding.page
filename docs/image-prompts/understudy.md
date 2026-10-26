# Understudy: image prompts

The template ships complete without photography: every part card draws its prop standing in a spotlight. These optional photos replace the drawn scene on each part card, through `Picture` (`part-<id>` keys). No API keys for image generation were found when the template was built, so nothing was generated.

**Save to:** `assets/incoming/understudy/<filename>`, then run `npm run images -- understudy` (writes 800w and 1600w AVIF/WebP to `public/templates/understudy/` and fills `assets.generated.ts`). The card switches to the photo automatically.

## Style preamble (paste into every prompt)

> Portrait photograph, 4:5, of one person standing alone in a single cool spotlight on an empty black theatre stage, shot from the stalls at eye level with a 50mm lens, shallow depth of field. The spotlight is soft violet-white (#AE9CFF tint) falling from above; everything outside the pool goes to near-black (#0D0D10). The person is in their twenties, dressed for an ordinary office day, holding or standing beside one object that belongs to their job, mid-gesture as if rehearsing a line. Quiet, confident, slightly theatrical; matte film look, fine grain, no lens flare. Leave the top 15% and the bottom 30% of the frame dark and empty for text. No text, no logos, no brand marks on clothing or objects, no audience, no other people.

## Images

| Filename | Aspect | Used on | Subject |
|---|---|---|---|
| `part-ai-engineer.jpg` | 4:5 | Parts card: AI Engineer | laptop held open on one arm, reading from it |
| `part-product-analyst.jpg` | 4:5 | Parts card: Product Analyst | a printed bar chart, pointing at one bar |
| `part-product-manager.jpg` | 4:5 | Parts card: Product Manager | a stack of index cards, holding one up |
| `part-product-designer.jpg` | 4:5 | Parts card: Product Designer | a phone held out at arm's length, testing it |
| `part-growth-marketer.jpg` | 4:5 | Parts card: Growth Marketer | a small paper megaphone, mid-announcement |
| `part-data-scientist.jpg` | 4:5 | Parts card: Data Scientist | a clipboard of plotted lines, pen in hand |
| `part-frontend-engineer.jpg` | 4:5 | Parts card: Frontend Engineer | a keyboard under one arm, laughing |
| `part-content-designer.jpg` | 4:5 | Parts card: Content Designer | a fountain pen and a page of marked-up copy |
| `part-ops-analyst.jpg` | 4:5 | Parts card: Operations Analyst | a hotel front-desk bell on a stool beside them |
| `part-customer-success.jpg` | 4:5 | Parts card: Customer Success Lead | an office headset, mid-call, one hand open |

## Prompts

1. **part-ai-engineer.jpg**: [preamble] A software engineer holds a laptop open on one forearm and reads from the screen like a script, free hand raised as if explaining a point. The screen glow is faint and cool.
2. **part-product-analyst.jpg**: [preamble] An analyst holds a printed bar chart at chest height and taps one bar with a pen, looking out into the dark as if presenting a finding.
3. **part-product-manager.jpg**: [preamble] A product manager holds a fanned stack of index cards and lifts the top one towards the stalls, mid-sentence.
4. **part-product-designer.jpg**: [preamble] A designer holds a phone out at arm's length, thumb hovering over the screen, head tilted, testing a flow.
5. **part-growth-marketer.jpg**: [preamble] A marketer raises a small rolled-paper megaphone to their mouth, other hand on hip, mid-announcement, smiling.
6. **part-data-scientist.jpg**: [preamble] A data scientist studies a clipboard covered in plotted lines, pen behind one ear, frowning in concentration.
7. **part-frontend-engineer.jpg**: [preamble] A frontend engineer carries a mechanical keyboard under one arm and laughs at something just off stage.
8. **part-content-designer.jpg**: [preamble] A content designer holds a page of marked-up copy and a fountain pen, reading a line aloud under their breath.
9. **part-ops-analyst.jpg**: [preamble] An operations analyst stands beside a tall stool with a brass front-desk bell on it, one finger poised above the bell.
10. **part-customer-success.jpg**: [preamble] A customer success lead wears an office headset, mid-call, one hand open in a reassuring gesture.

No video is used.
