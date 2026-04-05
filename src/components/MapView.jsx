import { useEffect, useRef, useCallback } from 'react';
import { MapPin } from 'lucide-react';
import { travelGallery } from '../data';
import FadeIn from './FadeIn';

/**
 * MapView
 * Reads `trip.location.{lat, lng}` directly from travelGallery.trips.
 * Uses Leaflet (vanilla) so it works without a Mapbox token.
 * Pin click → filters gallery by tripId via onPinClick callback.
 */
export default function MapView({ activeTrip, onPinClick }) {
  const mapElRef = useRef(null);
  const mapRef = useRef(null);
  const markersRef = useRef({});

  // ── Build pin icon HTML ────────────────────────────────────────────
  const pinHtml = useCallback((trip, isActive) => {
    const bg = isActive ? trip.accentColor : '#c7c7cc';
    return `
      <div style="
        width:38px;height:38px;
        background:${bg};
        border-radius:50% 50% 50% 0;
        transform:rotate(-45deg);
        display:flex;align-items:center;justify-content:center;
        box-shadow:0 4px 14px rgba(0,0,0,${isActive ? '.28' : '.14'});
        border:2.5px solid #fff;
        cursor:pointer;
        transition:background .25s,box-shadow .25s;
      ">
        <span style="transform:rotate(45deg);font-size:15px;line-height:1">
          ${isActive ? '📸' : '○'}
        </span>
      </div>`;
  }, []);

  // ── Init map once ──────────────────────────────────────────────────
  useEffect(() => {
    if (mapRef.current) return;
    const L = window.L;
    if (!L) return;

    mapRef.current = L.map(mapElRef.current, {
      center: [30, 55],
      zoom: 2,
      scrollWheelZoom: false,
      zoomControl: true,
      attributionControl: false,
    });

    L.tileLayer(
      'https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png',
      { maxZoom: 19 }
    ).addTo(mapRef.current);

    // Place a pin for every trip using its location coords
    travelGallery.trips.forEach((trip) => {
      const { lat, lng } = trip.location; // ← accesses data.js location
      const L = window.L;

      const icon = L.divIcon({
        className: '',
        html: pinHtml(trip, false),
        iconSize: [38, 38],
        iconAnchor: [19, 38],
        popupAnchor: [0, -38],
      });

      const marker = L.marker([lat, lng], { icon })
        .addTo(mapRef.current)
        .bindPopup(
          `<div style="font-family:-apple-system,sans-serif;padding:4px 2px;min-width:160px">
             <p style="font-size:14px;font-weight:700;margin-bottom:4px">${trip.emoji} ${trip.title}</p>
             <p style="font-size:11px;color:#6e6e73;margin-bottom:4px">${trip.date}</p>
             <p style="font-size:10px;color:#8a8a8e;font-family:ui-monospace,monospace">
               ${lat.toFixed(4)}° N, ${lng.toFixed(4)}° E
             </p>
             <p style="font-size:11px;color:#6e6e73;margin-top:4px;font-style:italic">${trip.description}</p>
           </div>`,
          { offset: [0, -8] }
        )
        .on('click', () => {
          onPinClick(activeTrip === trip.id ? null : trip.id);
        });

      markersRef.current[trip.id] = marker;
    });

    return () => {
      mapRef.current?.remove();
      mapRef.current = null;
      markersRef.current = {};
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // ── Update pin styles when activeTrip changes ──────────────────────
  useEffect(() => {
    const L = window.L;
    if (!mapRef.current || !L) return;

    travelGallery.trips.forEach((trip) => {
      const marker = markersRef.current[trip.id];
      if (!marker) return;
      const isActive = !activeTrip || activeTrip === trip.id;
      marker.setIcon(
        L.divIcon({
          className: '',
          html: pinHtml(trip, isActive),
          iconSize: [38, 38],
          iconAnchor: [19, 38],
          popupAnchor: [0, -38],
        })
      );
    });

    if (activeTrip) {
      const trip = travelGallery.trips.find((t) => t.id === activeTrip);
      if (trip) {
        mapRef.current.flyTo(
          [trip.location.lat, trip.location.lng],
          6,
          { duration: 1.4 }
        );
        markersRef.current[activeTrip]?.openPopup();
      }
    } else {
      mapRef.current.flyTo([30, 55], 2, { duration: 1.1 });
    }
  }, [activeTrip, pinHtml]);

  return (
    <div className="px-6 pb-16">
      {/* Hero */}
      <FadeIn>
        <div className="py-12">
          <p className="text-[11px] font-bold tracking-[0.08em] uppercase text-apple-tertiary mb-2">
            Interaktive Karte
          </p>
          <h1 className="text-[44px] font-semibold tracking-tighter leading-[1.08] text-apple-label">
            Wo ich<br />war.
          </h1>
          <p className="text-[16px] text-apple-secondary mt-2">
            Klicke auf einen Pin, um die Galerie zu filtern
          </p>
        </div>
      </FadeIn>

      {/* Leaflet map — reads trip.location.{lat,lng} */}
      <FadeIn delay={0.1}>
        <div
          ref={mapElRef}
          className="rounded-[20px] overflow-hidden border border-black/[0.08]"
          style={{ height: 380 }}
        />
      </FadeIn>

      {/* Legend / quick-filter chips */}
      <div className="flex gap-2 mt-4 flex-wrap">
        {travelGallery.trips.map((trip) => {
          const isActive = activeTrip === trip.id;
          return (
            <button
              key={trip.id}
              onClick={() => onPinClick(isActive ? null : trip.id)}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-full text-[12px] font-semibold border transition-all duration-200 ${
                isActive
                  ? 'text-white border-transparent'
                  : 'bg-white text-apple-secondary border-black/10 hover:border-black/20 hover:text-apple-label'
              }`}
              style={isActive ? { background: trip.accentColor } : {}}
            >
              <span
                className="w-2 h-2 rounded-full flex-shrink-0"
                style={{ background: isActive ? '#fff' : trip.accentColor }}
              />
              {trip.emoji} {trip.title}
              <span className="opacity-60 font-normal text-[10px]">
                {trip.location.lat.toFixed(2)}°N
              </span>
            </button>
          );
        })}

        {activeTrip && (
          <button
            onClick={() => onPinClick(null)}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-full text-[12px] font-semibold text-apple-tertiary border border-black/10 hover:border-black/20 bg-white transition-all duration-150"
          >
            <MapPin size={11} />
            Alle anzeigen
          </button>
        )}
      </div>

      {/* Coordinate table */}
      <FadeIn delay={0.15}>
        <div className="mt-8 bg-white border border-black/[0.08] rounded-2xl overflow-hidden">
          <div className="px-5 py-3.5 border-b border-black/[0.06]">
            <p className="text-[11px] font-bold tracking-[0.07em] uppercase text-apple-tertiary">
              location-Daten aus data.js
            </p>
          </div>
          {travelGallery.trips.map((trip, i) => (
            <div
              key={trip.id}
              className={`flex items-center gap-4 px-5 py-3.5 hover:bg-[#f5f5f7] transition-colors cursor-pointer ${
                i < travelGallery.trips.length - 1
                  ? 'border-b border-black/[0.06]'
                  : ''
              }`}
              onClick={() => onPinClick(activeTrip === trip.id ? null : trip.id)}
            >
              <div
                className="w-3 h-3 rounded-full flex-shrink-0"
                style={{ background: trip.accentColor }}
              />
              <div className="flex-1 min-w-0">
                <p className="text-[14px] font-semibold text-apple-label">
                  {trip.emoji} {trip.title}
                </p>
                <p className="text-[11px] text-apple-tertiary">{trip.date}</p>
              </div>
              <code className="text-[11px] font-mono text-apple-secondary bg-[#f5f5f7] px-2.5 py-1 rounded-lg whitespace-nowrap">
                {trip.location.lat}, {trip.location.lng}
              </code>
              <a
                href={`https://maps.apple.com/?ll=${trip.location.lat},${trip.location.lng}&z=10`}
                target="_blank"
                rel="noreferrer"
                className="text-[11px] font-semibold text-[#0071e3] hover:underline whitespace-nowrap"
                onClick={(e) => e.stopPropagation()}
              >
                Apple Maps ↗
              </a>
            </div>
          ))}
        </div>
      </FadeIn>
    </div>
  );
}
