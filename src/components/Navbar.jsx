import { Search } from 'lucide-react';

const TABS = [
  { id: 'galerie', label: 'Galerie' },
  { id: 'reisen', label: 'Reisen' },
  { id: 'karte', label: 'Karte' },
];

export default function Navbar({ activeTab, onTabChange, search, onSearch }) {
  return (
    <nav className="nav-glass sticky top-0 z-50 h-14 flex items-center gap-4 px-6">
      {/* Logo */}
      <div className="flex-1 text-[17px] font-semibold tracking-tighter text-apple-label select-none">
        Lumina{' '}
        <span className="font-normal text-apple-secondary">Archive</span>
      </div>

      {/* Tabs */}
      <div className="flex gap-1">
        {TABS.map((tab) => (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={`px-4 py-1.5 rounded-full text-[13px] font-semibold transition-all duration-150 ${
              activeTab === tab.id
                ? 'bg-apple-label text-white'
                : 'text-apple-secondary hover:bg-apple-fill hover:text-apple-label'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Search */}
      <div className="flex items-center gap-2 bg-apple-fill rounded-[10px] px-3 py-1.5 w-44">
        <Search size={13} className="text-apple-tertiary flex-shrink-0" />
        <input
          type="text"
          placeholder="Suche…"
          value={search}
          onChange={(e) => onSearch(e.target.value)}
          className="bg-transparent text-[13px] text-apple-label placeholder:text-apple-tertiary outline-none w-full font-normal"
        />
      </div>
    </nav>
  );
}
