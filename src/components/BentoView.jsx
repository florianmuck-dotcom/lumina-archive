import { motion } from 'framer-motion';
import { travelGallery } from '../data';
import FadeIn from './FadeIn';

function BentoTile({ trip, index, onSelect }) {
  const photoCount = travelGallery.photos.filter(
    (p) => p.tripId === trip.id
  ).length;
  const isFeatured = index === 0;

  return (
    <FadeIn delay={index * 0.07} className={isFeatured ? 'bento-featured' : ''}>
      <motion.div
        className="relative overflow-hidden rounded-bento cursor-pointer bg-[#e8e8ed] group"
        style={{ aspectRatio: isFeatured ? '16/9' : '4/3' }}
        whileHover={{ scale: 1.015 }}
        transition={{ duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
        onClick={() => onSelect(trip.id)}
      >
        <img
          src={trip.coverImage}
          alt={trip.title}
          loading="lazy"
          className="w-full h-full object-cover block transition-transform duration-700 group-hover:scale-[1.04]"
          onError={(e) => {
            e.target.style.display = 'none';
            e.target.parentNode.style.background = trip.accentColor;
          }}
        />

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-black/60" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/10 to-transparent" />

        {/* Content — bottom-left per spec */}
        <div className="absolute bottom-0 left-0 right-0 p-6">
          <h3
            className={`font-bold tracking-tight text-white leading-tight ${
              isFeatured ? 'text-[24px]' : 'text-[18px]'
            }`}
          >
            {trip.emoji} {trip.title}
          </h3>
          <div className="flex items-center gap-2 mt-1.5 text-white/75 text-[12px] font-medium">
            <span>📍 {trip.description}</span>
            <span>·</span>
            <span>🗓 {trip.date}</span>
            <span>·</span>
            <span>
              {photoCount} Foto{photoCount !== 1 ? 's' : ''}
            </span>
          </div>
        </div>

        {/* Accent border on hover */}
        <div
          className="absolute inset-0 rounded-bento ring-0 group-hover:ring-2 transition-all duration-300 pointer-events-none"
          style={{ '--tw-ring-color': trip.accentColor }}
        />
      </motion.div>
    </FadeIn>
  );
}

export default function BentoView({ onSelectTrip }) {
  return (
    <div className="px-6 pb-16">
      {/* Hero */}
      <FadeIn>
        <div className="py-12">
          <p className="text-[11px] font-bold tracking-[0.08em] uppercase text-apple-tertiary mb-2">
            Reise-Archiv
          </p>
          <h1 className="text-[44px] font-semibold tracking-tighter leading-[1.08] text-apple-label">
            Die Welt<br />im Bild.
          </h1>
          <p className="text-[16px] text-apple-secondary mt-2">
            {travelGallery.trips.length} Reisen · Klicke zum Filtern
          </p>
        </div>
      </FadeIn>

      <div className="bento-grid">
        {travelGallery.trips.map((trip, i) => (
          <BentoTile key={trip.id} trip={trip} index={i} onSelect={onSelectTrip} />
        ))}
      </div>
    </div>
  );
}
