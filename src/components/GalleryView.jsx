import { useState } from 'react';
import { motion } from 'framer-motion';
import { travelGallery } from '../data';
import FadeIn from './FadeIn';
import Lightbox from './Lightbox';

const RATIO_CLASS = {
  portrait: 'ratio-portrait',
  landscape: 'ratio-landscape',
  square: 'ratio-square',
};

function PhotoCard({ photo, index, onClick }) {
  const trip = travelGallery.trips.find((t) => t.id === photo.tripId);
  return (
    <FadeIn delay={index * 0.04} className="masonry-item">
      <motion.div
        className="relative overflow-hidden rounded-2xl cursor-pointer bg-[#e8e8ed] group"
        whileHover={{ scale: 1.02 }}
        transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
        onClick={() => onClick(photo)}
      >
        <img
          src={photo.url}
          alt={photo.metadata.location}
          loading="lazy"
          className={`w-full block object-cover ${RATIO_CLASS[photo.aspectRatio] ?? 'ratio-square'}`}
          onError={(e) => {
            e.target.style.display = 'none';
            e.target.parentNode.style.background = trip?.accentColor ?? '#e8e8ed';
          }}
        />
        {/* Hover overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-3.5">
          <div>
            <p className="text-white text-[13px] font-semibold leading-tight">
              {photo.metadata.location}
            </p>
            <p className="text-white/70 text-[11px] mt-0.5">
              {photo.metadata.camera} · {photo.metadata.date}
            </p>
          </div>
        </div>

        {/* Trip accent dot */}
        <div
          className="absolute top-2.5 right-2.5 w-2 h-2 rounded-full opacity-80"
          style={{ background: trip?.accentColor ?? '#888' }}
        />
      </motion.div>
    </FadeIn>
  );
}

export default function GalleryView({ activeTrip, onFilterChange, search }) {
  const [lightboxPhoto, setLightboxPhoto] = useState(null);

  const filtered = travelGallery.photos.filter((p) => {
    const q = search.toLowerCase();
    const matchSearch =
      !q ||
      p.metadata.location.toLowerCase().includes(q) ||
      p.tags.some((t) => t.toLowerCase().includes(q)) ||
      p.metadata.camera.toLowerCase().includes(q);
    const matchTrip = !activeTrip || p.tripId === activeTrip;
    return matchSearch && matchTrip;
  });

  return (
    <div className="px-6 pb-16">
      {/* Hero */}
      <FadeIn>
        <div className="py-12">
          <p className="text-[11px] font-bold tracking-[0.08em] uppercase text-apple-tertiary mb-2">
            Persönliches Archiv
          </p>
          <h1 className="text-[44px] font-semibold tracking-tighter leading-[1.08] text-apple-label">
            Momente,<br />festgehalten.
          </h1>
          <p className="text-[16px] text-apple-secondary mt-2">
            {travelGallery.photos.length} Aufnahmen ·{' '}
            {travelGallery.trips.length} Reisen
          </p>
        </div>
      </FadeIn>

      {/* Filter bar */}
      <div className="flex gap-2 mb-6 flex-wrap">
        <button
          onClick={() => onFilterChange(null)}
          className={`px-4 py-1.5 rounded-full text-[12px] font-semibold border transition-all duration-150 ${
            !activeTrip
              ? 'bg-apple-label text-white border-apple-label'
              : 'bg-white text-apple-label border-black/15 hover:bg-black/4'
          }`}
        >
          Alle ({travelGallery.photos.length})
        </button>
        {travelGallery.trips.map((trip) => {
          const count = travelGallery.photos.filter(
            (p) => p.tripId === trip.id
          ).length;
          return (
            <button
              key={trip.id}
              onClick={() =>
                onFilterChange(activeTrip === trip.id ? null : trip.id)
              }
              className={`px-4 py-1.5 rounded-full text-[12px] font-semibold border transition-all duration-150 ${
                activeTrip === trip.id
                  ? 'text-white border-transparent'
                  : 'bg-white text-apple-label border-black/15 hover:bg-black/4'
              }`}
              style={
                activeTrip === trip.id
                  ? { background: trip.accentColor, borderColor: trip.accentColor }
                  : {}
              }
            >
              {trip.emoji} {trip.title} ({count})
            </button>
          );
        })}
      </div>

      {/* Masonry grid */}
      {filtered.length > 0 ? (
        <div className="masonry-grid">
          {filtered.map((photo, i) => (
            <PhotoCard
              key={photo.id}
              photo={photo}
              index={i}
              onClick={setLightboxPhoto}
            />
          ))}
        </div>
      ) : (
        <div className="py-20 text-center text-apple-tertiary text-[15px]">
          Keine Fotos gefunden für „{search}"
        </div>
      )}

      {/* Lightbox */}
      {lightboxPhoto && (
        <Lightbox
          photo={lightboxPhoto}
          onClose={() => setLightboxPhoto(null)}
        />
      )}
    </div>
  );
}
