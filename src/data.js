/**
 * data.js — Lumina Archive
 * Single source of truth for all travel & photo data.
 * Swap out `url` and `coverImage` with your own paths
 * (e.g. "/images/italy/hero.jpg") once you add real assets.
 */

export const travelGallery = {
  // ─── Trips (Bento-Grid categories + Map pins) ──────────────────────
  trips: [
    {
      id: 'italy-2025',
      title: 'Amalfiküste',
      date: 'Juni 2025',
      coverImage:
        'https://images.unsplash.com/photo-1534308983496-4fabb1a015ee?w=900&q=80',
      location: { lat: 40.6333, lng: 14.6029 },
      description: 'Zitronenhaine und steile Klippen.',
      emoji: '🇮🇹',
      accentColor: '#d85a30',
    },
    {
      id: 'japan-2024',
      title: 'Tokyo & Kyoto',
      date: 'Oktober 2024',
      coverImage:
        'https://images.unsplash.com/photo-1480796927426-f609979314bd?w=900&q=80',
      location: { lat: 35.6762, lng: 139.6503 },
      description: 'Neonlichter und stille Tempel.',
      emoji: '🇯🇵',
      accentColor: '#378add',
    },
    {
      id: 'greece-2024',
      title: 'Santorini',
      date: 'Juli 2024',
      coverImage:
        'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?w=900&q=80',
      location: { lat: 36.3932, lng: 25.4615 },
      description: 'Weiße Kuppeln, blaues Meer.',
      emoji: '🇬🇷',
      accentColor: '#0f6e56',
    },
  ],

  // ─── Photos (Masonry grid items) ───────────────────────────────────
  photos: [
    {
      id: 'img_001',
      tripId: 'italy-2025',
      url: 'https://images.unsplash.com/photo-1516483638261-f4dbaf036963?w=600&q=80',
      aspectRatio: 'portrait', // portrait | landscape | square
      metadata: {
        location: 'Positano',
        camera: 'iPhone 15 Pro',
        iso: 'ISO 50',
        shutter: '1/500s',
        aperture: 'f/1.78',
        date: '12. Juni 2025',
      },
      tags: ['Strand', 'Architektur'],
    },
    {
      id: 'img_002',
      tripId: 'japan-2024',
      url: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=800&q=80',
      aspectRatio: 'landscape',
      metadata: {
        location: 'Shibuya Crossing',
        camera: 'Fujifilm X-T5',
        iso: 'ISO 3200',
        shutter: '1/30s',
        aperture: 'f/2.0',
        date: '05. Okt 2024',
      },
      tags: ['Stadt', 'Nacht'],
    },
    {
      id: 'img_003',
      tripId: 'italy-2025',
      url: 'https://images.unsplash.com/photo-1523906834658-6e24ef2386f9?w=700&q=80',
      aspectRatio: 'landscape',
      metadata: {
        location: 'Venedig',
        camera: 'iPhone 15 Pro',
        iso: 'ISO 800',
        shutter: '1/60s',
        aperture: 'f/1.78',
        date: '15. Juni 2025',
      },
      tags: ['Kanal', 'Nacht', 'Architektur'],
    },
    {
      id: 'img_004',
      tripId: 'japan-2024',
      url: 'https://images.unsplash.com/photo-1528360983277-13d401cdc186?w=600&q=80',
      aspectRatio: 'portrait',
      metadata: {
        location: 'Arashiyama Bambushain',
        camera: 'Fujifilm X-T5',
        iso: 'ISO 400',
        shutter: '1/125s',
        aperture: 'f/2.8',
        date: '07. Okt 2024',
      },
      tags: ['Natur', 'Bambus'],
    },
    {
      id: 'img_005',
      tripId: 'italy-2025',
      url: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&q=80',
      aspectRatio: 'portrait',
      metadata: {
        location: 'Dolomiten',
        camera: 'iPhone 15 Pro',
        iso: 'ISO 32',
        shutter: '1/2000s',
        aperture: 'f/1.78',
        date: '18. Juni 2025',
      },
      tags: ['Berge', 'Sonnenuntergang', 'Landschaft'],
    },
    {
      id: 'img_006',
      tripId: 'japan-2024',
      url: 'https://images.unsplash.com/photo-1545569341-9eb8b30979d9?w=800&q=80',
      aspectRatio: 'landscape',
      metadata: {
        location: 'Mount Fuji',
        camera: 'Fujifilm X-T5',
        iso: 'ISO 100',
        shutter: '1/500s',
        aperture: 'f/8.0',
        date: '09. Okt 2024',
      },
      tags: ['Landschaft', 'Ikone'],
    },
    {
      id: 'img_007',
      tripId: 'greece-2024',
      url: 'https://images.unsplash.com/photo-1613395877344-13d4a8e0d49e?w=700&q=80',
      aspectRatio: 'square',
      metadata: {
        location: 'Oia, Santorini',
        camera: 'Sony A7R V',
        iso: 'ISO 64',
        shutter: '1/1000s',
        aperture: 'f/8.0',
        date: '22. Juli 2024',
      },
      tags: ['Architektur', 'Meer', 'Blau'],
    },
    {
      id: 'img_008',
      tripId: 'greece-2024',
      url: 'https://images.unsplash.com/photo-1586861203927-800a5acdcc4d?w=600&q=80',
      aspectRatio: 'portrait',
      metadata: {
        location: 'Fira, Santorini',
        camera: 'Sony A7R V',
        iso: 'ISO 100',
        shutter: '1/320s',
        aperture: 'f/5.6',
        date: '23. Juli 2024',
      },
      tags: ['Klippe', 'Caldera'],
    },
  ],
};
