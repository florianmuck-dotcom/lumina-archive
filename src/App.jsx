import { useState, useCallback } from 'react';
import Navbar from './components/Navbar';
import GalleryView from './components/GalleryView';
import BentoView from './components/BentoView';
import MapView from './components/MapView';

export default function App() {
  const [tab, setTab] = useState('galerie');
  const [activeTrip, setActiveTrip] = useState(null);
  const [search, setSearch] = useState('');

  /**
   * handlePinClick — called from MapView when a map pin is clicked.
   * Sets the active trip filter and navigates to the gallery.
   */
  const handlePinClick = useCallback((tripId) => {
    setActiveTrip(tripId);
    if (tripId) {
      // Small delay so the map fly animation is visible before switching tabs
      setTimeout(() => setTab('galerie'), 450);
    }
  }, []);

  /**
   * handleBentoSelect — called from BentoView when a travel tile is clicked.
   * Navigates to gallery filtered by that trip.
   */
  const handleBentoSelect = useCallback((tripId) => {
    setActiveTrip(tripId);
    setTab('galerie');
  }, []);

  const handleTabChange = useCallback((newTab) => {
    setTab(newTab);
    // Clear search when switching tabs for cleaner UX
    if (newTab !== 'galerie') setSearch('');
  }, []);

  return (
    <div className="min-h-screen bg-apple-bg">
      <Navbar
        activeTab={tab}
        onTabChange={handleTabChange}
        search={search}
        onSearch={setSearch}
      />

      <main>
        {tab === 'galerie' && (
          <GalleryView
            activeTrip={activeTrip}
            onFilterChange={setActiveTrip}
            search={search}
          />
        )}

        {tab === 'reisen' && (
          <BentoView onSelectTrip={handleBentoSelect} />
        )}

        {tab === 'karte' && (
          <MapView activeTrip={activeTrip} onPinClick={handlePinClick} />
        )}
      </main>
    </div>
  );
}
