import { motion } from 'framer-motion'

interface HeroCharacterProps {
  offset: { x: number; y: number }
  reducedMotion: boolean
}

/**
 * The reference photo (goose in sunglasses + pink towel) was not supplied as
 * an asset file, so per spec we render an explicit placeholder instead of
 * redrawing the character in CSS/SVG. Swap the <img> below in for the real
 * WebP/AVIF asset when it is available — object-fit/object-position and the
 * sizing wrapper are already set up for a drop-in replacement.
 */
export default function HeroCharacter({ offset, reducedMotion }: HeroCharacterProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 40 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.7, delay: 0.5, ease: [0.25, 0.9, 0.3, 1] }}
      className="relative z-10 mx-auto mt-8 w-[78%] max-w-[420px] md:absolute md:right-[2%] md:top-[8%] md:mt-0 md:w-[46%] md:max-w-[620px] lg:right-[4%]"
      style={{
        transform: reducedMotion ? undefined : `translate3d(${offset.x * 5}px, ${offset.y * 5}px, 0)`,
        transition: 'transform 150ms linear',
      }}
    >
      <div
        className="flex aspect-[4/5] w-full items-center justify-center rounded-[2rem] border-4 border-dashed border-cream/70 bg-wall/40 text-center shadow-xl"
        role="img"
        aria-label="Гуска в сонцезахисних окулярах та рожевому рушнику — головний візуальний елемент Hero"
      >
        <div className="px-6 font-script text-2xl text-cream md:text-3xl">
          [GOOSE_ASSET]
          <div className="mt-2 text-sm font-sans text-cream/80">
            Замініть на WebP/AVIF-асет гуски з прозорим фоном
          </div>
        </div>
      </div>
      {/*
        Drop-in replacement once the asset is provided:
        <picture>
          <source srcSet="/goose.avif" type="image/avif" />
          <source srcSet="/goose.webp" type="image/webp" />
          <img
            src="/goose.png"
            alt="Гуска в сонцезахисних окулярах та рожевому рушнику"
            loading="eager"
            className="h-full w-full object-contain object-bottom"
          />
        </picture>
      */}
    </motion.div>
  )
}
