export function GlassBackdrop() {
  return (
    <div className="nm-glass-backdrop" aria-hidden="true">
      {/* 1. Luminous glass chromatic orbs and caustic light fields */}
      <div className="nm-glass-blooms">
        <span className="nm-bloom nm-bloom--cyan" />
        <span className="nm-bloom nm-bloom--amber" />
        <span className="nm-bloom nm-bloom--mint" />
        <span className="nm-bloom nm-bloom--lilac" />
        <span className="nm-bloom nm-bloom--warm" />
      </div>

      {/* 2. Prismatic daylight refraction shafts */}
      <div className="nm-glass-caustics">
        <i className="nm-caustic-beam nm-caustic-beam--1" />
        <i className="nm-caustic-beam nm-caustic-beam--2" />
        <i className="nm-caustic-beam nm-caustic-beam--3" />
        <i className="nm-caustic-beam nm-caustic-beam--4" />
      </div>

      {/* 3. Etched architectural glass grid and precision registration marks */}
      <div className="nm-glass-grid">
        <span className="nm-grid-line nm-grid-line--h1" />
        <span className="nm-grid-line nm-grid-line--h2" />
        <span className="nm-grid-line nm-grid-line--h3" />
        <span className="nm-grid-line nm-grid-line--h4" />
        <span className="nm-grid-line nm-grid-line--v1" />
        <span className="nm-grid-line nm-grid-line--v2" />
        <span className="nm-grid-line nm-grid-line--v3" />
        <span className="nm-grid-mark nm-grid-mark--1">+ 01</span>
        <span className="nm-grid-mark nm-grid-mark--2">+ 02</span>
        <span className="nm-grid-mark nm-grid-mark--3">+ 03</span>
        <span className="nm-grid-mark nm-grid-mark--4">+ 04</span>
      </div>

      {/* 4. Layered architectural frosted glass plates, lenses, and floating tablets */}
      <div className="nm-glass-plates">
        {/* Hero frosted optical glass disc behind the card tray */}
        <div className="nm-glass-plate nm-glass-plate--hero">
          <div className="nm-glass-bevel" />
          <div className="nm-glass-ring" />
          <div className="nm-glass-specular" />
          <div className="nm-glass-inner-glint" />
        </div>

        {/* Studios section frosted glass slab */}
        <div className="nm-glass-plate nm-glass-plate--studios">
          <div className="nm-glass-bevel" />
          <div className="nm-glass-specular" />
          <div className="nm-glass-inner-glint" />
        </div>

        {/* Plans section floating frosted lens */}
        <div className="nm-glass-plate nm-glass-plate--plans">
          <div className="nm-glass-bevel" />
          <div className="nm-glass-ring" />
          <div className="nm-glass-specular" />
        </div>

        {/* Demo section floating glass tray backplate */}
        <div className="nm-glass-plate nm-glass-plate--demo">
          <div className="nm-glass-bevel" />
          <div className="nm-glass-specular" />
          <div className="nm-glass-inner-glint" />
        </div>
      </div>
    </div>
  );
}
