import { useMemo } from 'react'

const STRAND_COUNT = 44

interface Strand {
  angleDeg: number
  length: number
  duration: number
  delay: number
  rotA: number
  rotB: number
}

// Deterministic pseudo-random so the fuzzy edge stays stable across re-renders.
function seededRandom(seed: number) {
  const x = Math.sin(seed * 999.7) * 10000
  return x - Math.floor(x)
}

function useStrands(count: number): Strand[] {
  return useMemo(() => {
    return Array.from({ length: count }, (_, i) => {
      const angleDeg = (i / count) * 360
      const r1 = seededRandom(i)
      const r2 = seededRandom(i + 0.5)
      const r3 = seededRandom(i + 0.25)
      return {
        angleDeg,
        length: 8 + r1 * 7,
        duration: 700 + r2 * 500,
        delay: r3 * 300,
        rotA: -8 - r1 * 6,
        rotB: 6 + r2 * 8,
      }
    })
  }, [count])
}

function PawIcon() {
  return (
    <svg className="paw-icon" width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <circle cx="6" cy="10" r="2.4" />
      <circle cx="11.5" cy="6.5" r="2.4" />
      <circle cx="17" cy="10" r="2.4" />
      <path d="M11.5 12c-3.5 0-6 2.3-6 5.1 0 1.6 1.3 2.9 3 2.9.9 0 1.6-.4 3-.4s2.1.4 3 .4c1.7 0 3-1.3 3-2.9 0-2.8-2.5-5.1-6-5.1z" />
    </svg>
  )
}

interface FurryButtonProps {
  children: React.ReactNode
}

export default function FurryButton({ children }: FurryButtonProps) {
  const strands = useStrands(STRAND_COUNT)

  return (
    <div className="relative inline-flex items-center">
      {/* decorative side dashes, echoing the reference's hand-drawn accents */}
      <span aria-hidden="true" className="absolute -left-7 top-1/2 hidden h-6 w-1.5 -translate-y-1/2 -rotate-12 rounded-full bg-coral/70 sm:block" />
      <span aria-hidden="true" className="absolute -right-7 top-1/2 hidden h-6 w-1.5 -translate-y-1/2 rotate-12 rounded-full bg-coral/70 sm:block" />

      <button type="button" className="fur-btn rounded-full bg-gradient-to-b from-coral-light to-coral px-9 py-4 shadow-[0_10px_20px_-6px_rgba(214,81,109,0.5)]">
        <span
          className="fur-layer"
          style={{ '--fur-duration': '900ms' } as React.CSSProperties}
        >
          {strands.map((s, i) => (
            <span
              key={i}
              className="fur-strand"
              style={
                {
                  height: `${s.length}px`,
                  left: `${50 + 50 * Math.cos((s.angleDeg * Math.PI) / 180)}%`,
                  top: `${50 + 50 * Math.sin((s.angleDeg * Math.PI) / 180)}%`,
                  transform: `translate(-50%, -50%) rotate(${s.angleDeg + 90}deg)`,
                  '--fur-duration': `${s.duration}ms`,
                  '--fur-delay': `${s.delay}ms`,
                  '--fur-rot-a': `${s.rotA}deg`,
                  '--fur-rot-b': `${s.rotB}deg`,
                } as React.CSSProperties
              }
            />
          ))}
        </span>
        <span className="relative z-10 flex items-center gap-2 font-script text-2xl font-semibold text-cream md:text-3xl">
          {children}
          <PawIcon />
        </span>
      </button>
    </div>
  )
}
