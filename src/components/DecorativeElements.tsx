interface DecorativeElementsProps {
  leafOffset: { x: number; y: number }
  bgOffset: { x: number; y: number }
}

function PalmLeaf({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 200 260" className={className} aria-hidden="true">
      <path
        d="M100 260 C 95 180 60 140 10 110 C 60 120 95 150 105 190 C 100 130 70 90 20 60 C 75 65 110 100 120 150 C 115 95 100 55 60 10 C 115 25 140 80 135 150 C 145 100 150 60 180 20 C 175 80 160 130 140 170 C 150 150 165 135 190 125 C 175 155 155 175 130 190 C 120 210 112 235 108 260 Z"
        fill="#2f6b4f"
        opacity="0.85"
      />
    </svg>
  )
}

export default function DecorativeElements({ leafOffset, bgOffset }: DecorativeElementsProps) {
  return (
    <>
      {/* Pink architectural wall / column, right side background */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute right-0 top-0 hidden h-full w-[22%] bg-wall md:block"
        style={{
          transform: `translate3d(${bgOffset.x * 2}px, ${bgOffset.y * 2}px, 0)`,
          transition: 'transform 120ms linear',
        }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute right-[22%] top-0 hidden h-full w-1 bg-wall-dark/50 md:block"
        style={{
          transform: `translate3d(${bgOffset.x * 1.5}px, ${bgOffset.y * 1.5}px, 0)`,
          transition: 'transform 120ms linear',
        }}
      />

      {/* Ground texture */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-0 left-0 h-24 w-full bg-gradient-to-t from-cream/50 to-transparent md:h-32"
      />

      {/* Palm leaves, foreground corners, partially bleeding out of viewport */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-6 -left-10 w-40 md:-bottom-10 md:-left-14 md:w-64"
        style={{
          transform: `translate3d(${leafOffset.x * -3}px, ${leafOffset.y * -3}px, 0)`,
          transition: 'transform 120ms linear',
        }}
      >
        <PalmLeaf className="w-full drop-shadow-lg" />
      </div>
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-8 left-16 hidden w-32 rotate-12 md:block md:w-48"
        style={{
          transform: `translate3d(${leafOffset.x * -2}px, ${leafOffset.y * -2}px, 0) rotate(12deg)`,
          transition: 'transform 120ms linear',
        }}
      >
        <PalmLeaf className="w-full drop-shadow-lg" />
      </div>
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-8 top-1/3 hidden w-28 -scale-x-100 opacity-90 lg:block"
        style={{
          transform: `translate3d(${leafOffset.x * -2}px, ${leafOffset.y * -2}px, 0) scaleX(-1)`,
          transition: 'transform 120ms linear',
        }}
      >
        <PalmLeaf className="w-full drop-shadow-lg" />
      </div>
    </>
  )
}
