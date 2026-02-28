import React, { useState, useEffect, useCallback } from 'react';
import { useParams, Link } from 'react-router-dom';
import { supabase, REGIONS, Post } from '../../lib/supabase';
import { LifeNav } from '../components/LifeNav';
import { CategoryNav } from '../components/CategoryNav';
import { SearchBar } from '../components/SearchBar';
import { PostCard } from '../components/PostCard';
import { Loader2 } from 'lucide-react';

export const RegionPage: React.FC = () => {
  const { region } = useParams<{ region: string }>();
  const regionData = REGIONS.find(r => r.id === region);

  const [posts, setPosts] = useState<Post[]>([]);
  const [category, setCategory] = useState<string | null>(null);
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchPosts = useCallback(async () => {
    if (!region) return;
    setLoading(true);
    setError(null);
    try {
      let q = supabase
        .from('posts')
        .select('*')
        .eq('region', region)
        .eq('status', 'approved')
        .order('pinned', { ascending: false })
        .order('created_at', { ascending: false });

      if (category) q = q.eq('category', category);
      if (query.trim()) {
        // Escape backslash first, then PostgREST ilike special chars
        const safe = query.trim()
          .replace(/\\/g, '\\\\')
          .replace(/[%_]/g, '\\$&');
        q = q.or(`title.ilike.%${safe}%,content.ilike.%${safe}%`);
      }

      const { data, error: err } = await q;
      if (err) throw err;
      setPosts(data as Post[]);
    } catch (e: any) {
      setError(e.message ?? '加载失败');
    } finally {
      setLoading(false);
    }
  }, [region, category, query]);

  useEffect(() => { fetchPosts(); }, [fetchPosts]);

  if (!regionData) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <p className="text-zinc-400">未找到该地区。<Link to="/life" className="text-cyan-400 underline ml-1">返回</Link></p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <LifeNav regionId={region} />
      <div className="max-w-2xl mx-auto px-4 py-4 space-y-4">
        {/* Region badge */}
        <div className="flex items-center gap-2">
          <span className="text-2xl">{regionData.flag}</span>
          <h1 className="text-xl font-bold">{regionData.label}</h1>
          <span className="text-sm text-zinc-500 ml-1">· {regionData.labelEn}</span>
        </div>

        {/* Search */}
        <SearchBar value={query} onChange={v => { setQuery(v); }} placeholder="搜索帖子…" />

        {/* Category filter */}
        <CategoryNav active={category} onChange={setCategory} />

        {/* Post list */}
        {loading ? (
          <div className="flex justify-center py-12">
            <Loader2 className="w-6 h-6 animate-spin text-cyan-400" />
          </div>
        ) : error ? (
          <div className="glass rounded-2xl p-6 text-center">
            <p className="text-zinc-400 text-sm mb-3">{error}</p>
            <button onClick={fetchPosts} className="text-cyan-400 text-sm underline">重试</button>
          </div>
        ) : posts.length === 0 ? (
          <div className="glass rounded-2xl p-8 text-center">
            <p className="text-zinc-400 text-sm mb-4">暂无帖子</p>
            <Link
              to={`/life/${region}/publish`}
              className="inline-block px-4 py-2 rounded-full bg-cyan-500 text-black text-sm font-bold hover:bg-cyan-400 transition-colors"
            >
              发布第一条
            </Link>
          </div>
        ) : (
          <div className="space-y-3">
            {posts.map(post => (
              <PostCard key={post.id} post={post} region={region!} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
