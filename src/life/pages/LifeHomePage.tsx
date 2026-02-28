import React from 'react';
import { Link } from 'react-router-dom';
import { Globe } from 'lucide-react';
import { REGIONS } from '../../lib/supabase';

export const LifeHomePage: React.FC = () => (
  <div className="min-h-screen bg-black text-white flex flex-col">
    {/* header */}
    <header className="border-b border-white/10 px-4 h-14 flex items-center gap-3">
      <Link to="/" className="p-1.5 rounded-lg hover:bg-white/10 transition-colors">
        <Globe className="w-5 h-5 text-cyan-400" />
      </Link>
      <span className="font-bold">
        X²<span className="text-cyan-400 ml-1">生活网站</span>
      </span>
    </header>

    <main className="flex-1 flex flex-col items-center justify-center px-4 py-12 gap-8">
      <div className="text-center max-w-sm">
        <h1 className="text-3xl font-black mb-2">
          X²-<span className="text-cyan-400">星链</span>数字生态
        </h1>
        <p className="text-zinc-400 text-sm leading-relaxed">
          AI智能体助手进万家华企，赋能全球华人企业数字化升级
        </p>
      </div>

      <div className="w-full max-w-sm space-y-4">
        <p className="text-center text-xs text-zinc-500 uppercase tracking-widest">选择您的地区</p>
        {REGIONS.map(r => (
          <Link
            key={r.id}
            to={`/life/${r.id}`}
            className="flex items-center gap-4 glass rounded-2xl p-5 hover:border-cyan-500/40 hover:bg-white/10 transition-all duration-200 group"
          >
            <span className="text-4xl">{r.flag}</span>
            <div className="flex-1">
              <div className="font-bold text-lg">{r.label}</div>
              <div className="text-sm text-zinc-400">{r.labelEn}</div>
            </div>
            <svg className="w-5 h-5 text-zinc-500 group-hover:text-cyan-400 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        ))}
      </div>
    </main>
  </div>
);
