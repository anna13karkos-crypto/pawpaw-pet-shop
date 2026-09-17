import { useRef } from 'react'
import { motion } from 'framer-motion'
import Header from './Header'
import HeroContent from './HeroContent'
import HeroCharacter from './HeroCharacter'
import DecorativeElements from './DecorativeElements'
import { useParallax } from '../hooks/useParallax'
import { useReducedMotion } from '../hooks/useReducedMotion'

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null)
  const reducedMotion = useReducedMotion()
  const parallaxEnabled = !reducedMotion
  const offset = useParallax(sectionRef, parallaxEnabled)

  return (
    <motion.section
      ref={sectionRef}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="relative flex min-h-[100svh] w-full flex-col overflow-hidden bg-gradient-to-b from-sky-light via-sky to-sky-dark md:justify-center"
    >
      <DecorativeElements
        leafOffset={{ x: offset.x * 10, y: offset.y * 8 }}
        bgOffset={{ x: offset.x * 2, y: offset.y * 2 }}
      />

      <Header />

      <div className="relative z-10 flex flex-1 flex-col pb-16 pt-6 md:flex-row md:items-center md:pb-24 md:pt-0">
        <HeroContent />
        <HeroCharacter offset={offset} reducedMotion={reducedMotion} />
      </div>
    </motion.section>
  )
}
