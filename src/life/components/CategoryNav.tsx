import React from 'react';
import { CATEGORIES } from '../../lib/supabase';

interface CategoryNavProps {
  active: string | null;
  onChange: (id: string | null) => void;
}

export const CategoryNav: React.FC<CategoryNavProps> = ({ active, onChange }) => (
  <nav className="flex gap-2 overflow-x-auto pb-2 scrollbar-none">
    <button
      onClick={() => onChange(null)}
      className={`flex-shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-colors ${
        active === null
          ? 'bg-cyan-500 text-black'
          : 'bg-white/10 text-zinc-300 hover:bg-white/20'
      }`}
    >
      全部
    </button>
    {CATEGORIES.map(cat => (
      <button
        key={cat.id}
        onClick={() => onChange(cat.id)}
        className={`flex-shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-colors ${
          active === cat.id
            ? 'bg-cyan-500 text-black'
            : 'bg-white/10 text-zinc-300 hover:bg-white/20'
        }`}
      >
        {cat.icon} {cat.label}
      </button>
    ))}
  </nav>
);
