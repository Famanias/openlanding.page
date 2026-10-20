import { Picture } from "../assets";

export function Chef() {
  return (
    <section className="kj-slab kj-slab--sumi kj-chef" id="chef" aria-labelledby="kj-chef-title">
      <div className="kj-chef__copy">
        <p className="kj-mono">04 · 料理長 · The chef</p>
        <h2 id="kj-chef-title" className="kj-h2">
          Ren Ishikawa.
        </h2>
        <blockquote className="kj-quote">
          <p>&ldquo;I don&rsquo;t cook so much as wait. Kōji does the work. My job is to know the day it&rsquo;s ready.&rdquo;</p>
        </blockquote>
        <p className="kj-chef__bio">
          Twelve years in Kanazawa miso houses, four at a kaiseki counter in Kyoto. He opened KŌJI on the fourteenth
          floor because the light comes in low across the counter at six.
        </p>
      </div>
      <Picture
        assetKey="chef"
        alt="The chef seen through a rectangular opening in a thick concrete wall, slicing fish"
        className="kj-photo kj-chef__photo"
        sizes="(min-width: 900px) 40vw, 100vw"
      />
    </section>
  );
}
