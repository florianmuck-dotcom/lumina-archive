import { useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { X, Camera, MapPin, Calendar, Tag } from 'lucide-react';
import { travelGallery } from '../data';

function ExifRow({ icon: Icon, label, value }) {
  return (
    <div className="mt-3">
      <p className="text-[10px] font-bold tracking-[0.07em] uppercase text-apple-tertiary mb-0.5 flex items-center gap-1.5">
        <Icon size={10} />
        {label}
      </p>
      <p className="text-[13px] font-semibold text-apple-label leading-snug">
        {value}
      </p>
    </div>
  );
}

export default function Lightbox({ photo, onClose }) {
  const trip = travelGallery.trips.find((t) => t.id === photo.tripId);

  // Close on Escape
  useEffect(() => {
    const handler = (e) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [onClose]);

  // Prevent body scroll
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = ''; };
  }, []);

  return (
    <AnimatePresence>
      <motion.div
        key="lb-bg"
        className="fixed inset-0 z-[200] flex items-center justify-center bg-black/85"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        onClick={(e) => e.target === e.currentTarget && onClose()}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-6 w-9 h-9 rounded-full bg-white/15 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white/25 transition-colors z-[201]"
        >
          <X size={16} />
        </button>

        {/* Content */}
        <motion.div
          key="lb-content"
          className="flex max-w-[90vw] max-h-[88vh] rounded-[20px] overflow-hidden bg-white"
          initial={{ scale: 0.86, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.86, opacity: 0 }}
          transition={{ duration: 0.3, ease: [0.34, 1.56, 0.64, 1] }}
        >
          {/* Image */}
          <div className="flex-1 min-w-0 bg-[#0a0a0a] flex items-center max-w-[65vw]">
            <img
              src={photo.url.replace('w=600', 'w=1400').replace('w=700', 'w=1400').replace('w=800', 'w=1400')}
              alt={photo.metadata.location}
              className="w-full max-h-[88vh] object-contain block"
            />
          </div>

          {/* Sidebar */}
          <aside className="w-60 flex-shrink-0 p-6 overflow-y-auto">
            <h2 className="text-[17px] font-semibold tracking-tight leading-snug">
              {photo.metadata.location}
            </h2>
            <p className="text-[13px] text-apple-secondary mt-1">
              {trip?.emoji} {trip?.title} · {trip?.date}
            </p>

            <hr className="my-4 border-0 h-px bg-black/8" />

            <ExifRow icon={Camera} label="Kamera" value={photo.metadata.camera} />
            <ExifRow
              icon={Camera}
              label="Belichtung"
              value={`${photo.metadata.shutter} · ${photo.metadata.aperture} · ${photo.metadata.iso}`}
            />
            <ExifRow icon={MapPin} label="Ort" value={photo.metadata.location} />
            <ExifRow icon={Calendar} label="Datum" value={photo.metadata.date} />

            <hr className="my-4 border-0 h-px bg-black/8" />

            <p className="text-[10px] font-bold tracking-[0.07em] uppercase text-apple-tertiary mb-2 flex items-center gap-1.5">
              <Tag size={10} />
              Tags
            </p>
            <div className="flex flex-wrap gap-1.5">
              {photo.tags.map((tag) => (
                <span
                  key={tag}
                  className="bg-[#f5f5f7] text-apple-label text-[11px] font-semibold px-2.5 py-1 rounded-md"
                >
                  {tag}
                </span>
              ))}
            </div>

            <hr className="my-4 border-0 h-px bg-black/8" />

            {/* Coordinates from tripId → location */}
            {trip && (
              <div>
                <p className="text-[10px] font-bold tracking-[0.07em] uppercase text-apple-tertiary mb-1.5 flex items-center gap-1.5">
                  <MapPin size={10} />
                  Koordinaten
                </p>
                <code className="block text-[10px] bg-[#f5f5f7] px-2.5 py-1.5 rounded-[7px] text-apple-label font-mono leading-relaxed">
                  {trip.location.lat}° N<br />
                  {trip.location.lng}° E
                </code>
                <a
                  href={`https://maps.apple.com/?ll=${trip.location.lat},${trip.location.lng}&z=12`}
                  target="_blank"
                  rel="noreferrer"
                  className="block text-[12px] font-semibold text-[#0071e3] mt-2 hover:underline"
                >
                  In Apple Maps öffnen ↗
                </a>
              </div>
            )}
          </aside>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
