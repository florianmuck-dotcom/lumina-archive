import { motion } from 'framer-motion';

/**
 * FadeIn — wraps children in a scroll-triggered enter animation.
 * Uses Framer Motion's whileInView so items animate in
 * from y+20/opacity:0 as they enter the viewport.
 */
export default function FadeIn({ children, delay = 0, className = '' }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{
        duration: 0.45,
        delay,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
