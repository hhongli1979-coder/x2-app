import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Globe } from 'lucide-react';
import { REGIONS } from '../../lib/supabase';

interface LifeNavProps {
  regionId?: string;
  showBack?: boolean;
}

export const LifeNav: React.FC<LifeNavProps> = ({ regionId, showBack }) => {
  const navigate = useNavigate();
  const region = REGIONS.find(r => r.id === regionId);

  return (
    <header className="sticky top-0 z-30 bg-black/80 backdrop-blur-xl border-b border-white/10">
      <div className="max-w-2xl mx-auto px-4 h-14 flex items-center gap-3">
        {showBack ? (
          <button onClick={() => navigate(-1)} className="p-1.5 rounded-lg hover:bg-white/10 transition-colors">
            <ArrowLeft className="w-5 h-5" />
          </button>
        ) : (
          <Link to="/" className="p-1.5 rounded-lg hover:bg-white/10 transition-colors" title="返回主页">
            <Globe className="w-5 h-5 text-cyan-400" />
          </Link>
        )}
        <Link to="/life" className="font-bold text-white">
          X²<span className="text-cyan-400 ml-1">生活网站</span>
        </Link>
        {region && (
          <span className="ml-auto text-sm text-zinc-400 flex items-center gap-1">
            {region.flag} {region.label}
          </span>
        )}
        {regionId && (
          <Link
            to={`/life/${regionId}/publish`}
            className="ml-auto px-3 py-1.5 rounded-full bg-cyan-500 text-black text-xs font-bold hover:bg-cyan-400 transition-colors"
          >
            + 发布
          </Link>
        )}
      </div>
    </header>
  );
};
