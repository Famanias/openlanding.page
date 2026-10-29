export function SectionBackdrop() {
  return (
    <div className="am-world" aria-hidden="true">
      <svg className="am-washi" width="100%" height="100%">
        <filter id="am-fibres">
          <feTurbulence
            type="fractalNoise"
            baseFrequency=".64 .09"
            numOctaves="3"
            seed="48"
          />
          <feColorMatrix type="saturate" values="0" />
        </filter>
        <rect
          width="100%"
          height="100%"
          filter="url(#am-fibres)"
          opacity=".035"
        />
      </svg>
      <div className="am-world__scene am-ridges" data-scene="0">
        <svg viewBox="0 0 1440 1000" preserveAspectRatio="xMidYMid slice">
          <circle cx="1080" cy="290" r="150" fill="#B8923A" opacity=".16" />
          <g className="am-ridge am-ridge--far" fill="#2B3A55" opacity=".07">
            <path d="M-100 760Q90 500 230 610L440 390 680 650 840 530 1120 710 1470 480V1100H-100Z" />
          </g>
          <g className="am-ridge am-ridge--near" fill="#1A1613" opacity=".07">
            <path d="M-100 900Q170 700 310 810Q520 580 710 780L960 660 1230 850 1500 750V1100H-100Z" />
          </g>
          <path
            className="am-mist"
            d="M-100 820Q250 720 600 810T1540 780"
            stroke="#F4ECDD"
            strokeWidth="75"
            fill="none"
            opacity=".7"
          />
        </svg>
      </div>
      <div className="am-world__scene am-drafting" data-scene="1">
        <svg viewBox="0 0 1440 1000" preserveAspectRatio="xMidYMid slice">
          <defs>
            <pattern
              id="am-asanoha"
              width="120"
              height="104"
              patternUnits="userSpaceOnUse"
            >
              <path
                d="M0 0L120 104M120 0L0 104M60 0V104M0 52H120M0 0L120 0 60 104Z"
                fill="none"
                stroke="#B8923A"
                strokeWidth=".5"
              />
            </pattern>
          </defs>
          <rect
            width="1440"
            height="1000"
            fill="url(#am-asanoha)"
            opacity=".12"
          />
          <g
            transform="translate(400 470)"
            fill="none"
            stroke="#B8923A"
            opacity=".35"
          >
            <circle r="290" strokeDasharray="1 43" strokeWidth="10" />
            <circle r="310" strokeWidth=".5" />
            <path d="M-340 0H340M0-340V340" strokeWidth=".5" />
          </g>
        </svg>
      </div>
      <div className="am-world__scene am-night" data-scene="2">
        <svg viewBox="0 0 1440 1000" preserveAspectRatio="xMidYMid slice">
          <circle cx="1110" cy="220" r="95" fill="#F4ECDD" opacity=".1" />
          <g fill="#1A1613" opacity=".17">
            <path
              className="am-mist"
              d="M-100 280Q150 190 450 285T1200 240V310H-100Z"
            />
            <path d="M650 520Q900 400 1540 500V550H650Z" />
          </g>
        </svg>
        <div className="am-rain-veil">
          {Array.from({ length: 28 }, (_, i) => (
            <i
              key={i}
              style={{ left: `${i * 3.8}%`, animationDelay: `${-i * 0.17}s` }}
            />
          ))}
        </div>
      </div>
      <div className="am-world__scene am-blossoms" data-scene="3">
        <div className="am-dye-blot" />
        {Array.from({ length: 13 }, (_, i) => (
          <svg
            className="am-petal"
            key={i}
            viewBox="0 0 24 32"
            style={{
              left: `${(i * 17) % 100}%`,
              top: `${(i * 23) % 90}%`,
              animationDelay: `${-i * 0.9}s`,
            }}
          >
            <path
              d="M12 30C-5 15 2 2 9 2L12 7 15 2C26 5 25 20 12 30Z"
              fill="#D9748F"
              opacity=".26"
            />
          </svg>
        ))}
      </div>
      <div className="am-world__scene am-grove" data-scene="4">
        <svg viewBox="0 0 1440 1000" preserveAspectRatio="xMidYMid slice">
          <g fill="none" stroke="#2B3A55" opacity=".035">
            {Array.from({ length: 8 }, (_, i) => (
              <g
                key={i}
                transform={`translate(${i * 183 - 30} 0) rotate(${i % 2 ? 4 : -3})`}
              >
                <path
                  d="M0 1100Q50 500 20-100"
                  strokeWidth={10 + (i % 3) * 4}
                />
                {Array.from({ length: 5 }, (_, j) => (
                  <g key={j}>
                    <path
                      d={`M-2 ${j * 220}L40 ${j * 220 - 3}`}
                      strokeWidth="4"
                    />
                    <path
                      d={`M25 ${j * 220}Q100 ${j * 220 - 100} 140 ${j * 220 - 65}Q90 ${j * 220 - 40} 25 ${j * 220}M25 ${j * 220}Q-65 ${j * 220 - 130}-95 ${j * 220 - 120}Q-80 ${j * 220 - 45} 25 ${j * 220}`}
                      strokeWidth="2"
                    />
                  </g>
                ))}
              </g>
            ))}
          </g>
        </svg>
      </div>
      <div className="am-world__scene am-dusk" data-scene="5">
        <svg viewBox="0 0 1440 1000" preserveAspectRatio="xMidYMid slice">
          <path
            d="M0 760Q500 680 1440 780V1000H0Z"
            fill="#1A1613"
            opacity=".3"
          />
          <g className="am-puddle" fill="none" stroke="#F4ECDD" opacity=".16">
            <ellipse cx="350" cy="850" rx="200" ry="16" />
            <ellipse cx="350" cy="850" rx="120" ry="9" />
          </g>
        </svg>
      </div>
    </div>
  );
}
