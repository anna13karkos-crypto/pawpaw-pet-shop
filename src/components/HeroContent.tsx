import { motion } from 'framer-motion'
import FurryButton from './FurryButton'

function Squiggle({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 40 40" className={className} aria-hidden="true">
      <path
        d="M6 30 Q 14 10, 6 6"
        fill="none"
        stroke="#EE6A86"
        strokeWidth="3"
        strokeLinecap="round"
      />
    </svg>
  )
}

export default function HeroContent() {
  return (
    <div className="relative z-10 flex flex-col items-start px-6 pt-32 sm:px-10 md:max-w-[44%] md:pt-0 md:pl-10 md:pr-4 lg:max-w-[42%] lg:pl-16 xl:max-w-[580px]">
      <motion.div
        initial={{ opacity: 0, x: -40 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.7, delay: 0.15, ease: [0.25, 0.9, 0.3, 1] }}
        className="relative"
      >
        <Squiggle className="absolute -left-8 -top-4 h-8 w-8 -rotate-12 sm:-left-10 sm:-top-6 sm:h-10 sm:w-10" />
        <Squiggle className="absolute -left-2 top-2 h-5 w-5 rotate-45 opacity-70 sm:h-6 sm:w-6" />

        <h1
          className="font-script text-[2.5rem] font-semibold leading-[0.95] text-cream drop-shadow-[0_3px_10px_rgba(0,0,0,0.35)] sm:text-5xl md:text-6xl lg:text-[4.75rem] xl:text-[5.25rem]"
          style={{ textShadow: '0 2px 14px rgba(0,0,0,0.35), 0 1px 2px rgba(0,0,0,0.25)' }}
        >
          Відкриття нового
          <br />
          закладу для ваших
          <br />
          улюбленців <span aria-hidden="true">♡</span>
        </h1>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.85 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.55, ease: [0.34, 1.56, 0.64, 1] }}
        className="mt-8 sm:mt-10 md:mt-12"
      >
        <FurryButton>Новини →</FurryButton>
      </motion.div>
    </div>
  )
}
