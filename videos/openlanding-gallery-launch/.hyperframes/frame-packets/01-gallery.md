# Frame packet: 01-gallery

Title: Gallery display
Canvas: 1920x1080
Duration: see STORYBOARD.md
Assets: capture/assets/gallery-home.png, assets/templates/wowflutter.webp

Shared palette: graphite #0D0F0E, warm white #F2F0E8, acid lime #D8F7A2, muted rule #343936.
Fonts: Inter/Arial for display; Space Mono/monospace for labels.
Contract: use <template>, scene root id="root" styled with #root, register window.__timelines["01-gallery"] at script end, every timed visual must have class="clip" + data-start + data-duration, use fromTo and animate children rather than the timed clip.
Direction: Use captured gallery-home screenshot full bleed. Add a large cursor that glides from header toward the WOWFLUTTER card, clicks at 3.4s, and a lime focus rectangle.
Do not invent product UI, claims, or assets. Keep the named template readable and the hero image inside the title-safe area.
