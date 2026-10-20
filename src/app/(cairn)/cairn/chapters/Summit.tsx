import { Signup } from "../forms/Signup";
import { Lookbook, type LookbookFrame } from "../showcase/Lookbook";
import { Chapter } from "./Chapter";

const FRAMES: LookbookFrame[] = [
  {
    key: "lookbook-1",
    caption: "Night push above Camp 4, headlamps on the fixed line",
    hotspots: [
      { x: 38, y: 46, productId: "8000-down-suit" },
      { x: 62, y: 58, productId: "summit-mitt" },
    ],
  },
  {
    key: "lookbook-2",
    caption: "Dawn on a ledge, the Karakoram below",
    hotspots: [{ x: 50, y: 52, productId: "summit-shell-3l" }],
  },
  {
    key: "lookbook-3",
    caption: "Ascender, mitt and frost at the Bottleneck",
    hotspots: [{ x: 46, y: 44, productId: "summit-mitt" }],
  },
  {
    key: "lookbook-4",
    caption: "Crossing the Godwin-Austen Glacier at blue hour",
    hotspots: [
      { x: 44, y: 50, productId: "summit-shell-3l" },
      { x: 52, y: 80, productId: "alpine-gaiter" },
    ],
  },
];

export function Summit() {
  return (
    <Chapter camp="summit" className="crn-summit">
      <h2 className="crn-h2">8,611 metres. Nothing above but sky.</h2>
      <p className="crn-lead">
        The second-highest summit on Earth, and the hardest to stand on. These are the frames from the climb. Tap
        a marker to see what&apos;s being worn.
      </p>
      <Lookbook frames={FRAMES} />
      <div className="crn-summit__signup">
        <div>
          <h3 className="crn-h3">The expedition list.</h3>
          <p className="crn-muted">
            Field notes from the mountain and first word on new kit. A few emails a year, never more.
          </p>
        </div>
        <Signup />
      </div>
    </Chapter>
  );
}
