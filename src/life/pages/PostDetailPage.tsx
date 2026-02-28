import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { supabase, supabaseConfigured, Post, CATEGORIES, REGIONS } from '../../lib/supabase';
import { LifeNav } from '../components/LifeNav';
import { Loader2, Phone, Clock, Tag, MapPin } from 'lucide-react';

export const PostDetailPage: React.FC = () => {
  const { region, id } = useParams<{ region: string; id: string }>();
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;
    (async () => {
      setLoading(true);
      try {
        if (!supabaseConfigured) throw new Error('数据库未配置，请联系管理员');
        const { data, error: err } = await supabase
          .from('posts')
          .select('*')
          .eq('id', id)
          .eq('status', 'approved')
          .single();
        if (err) setError(err.message);
        else setPost(data as Post);
      } catch (e: any) {
        setError(e.message ?? '加载失败');
      } finally {
        setLoading(false);
      }
    })();
  }, [id]);

  const cat = post ? CATEGORIES.find(c => c.id === post.category) : null;
  const regionData = REGIONS.find(r => r.id === region);

  return (
    <div className="min-h-screen bg-black text-white">
      <LifeNav regionId={region} showBack />
      <div className="max-w-2xl mx-auto px-4 py-6">
        {loading ? (
          <div className="flex justify-center py-16"><Loader2 className="w-6 h-6 animate-spin text-cyan-400" /></div>
        ) : error || !post ? (
          <div className="glass rounded-2xl p-8 text-center">
            <p className="text-zinc-400 mb-4">{error ?? '帖子不存在或已被删除'}</p>
            <Link to={`/life/${region}`} className="text-cyan-400 underline text-sm">返回列表</Link>
          </div>
        ) : (
          <article className="space-y-6">
            {/* Header */}
            <div className="glass rounded-2xl p-5 space-y-3">
              <div className="flex flex-wrap gap-2 text-xs text-zinc-500">
                {cat && (
                  <span className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-white/5 border border-white/10">
                    <Tag className="w-3 h-3" />{cat.icon} {cat.label}
                  </span>
                )}
                {regionData && (
                  <span className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-white/5 border border-white/10">
                    <MapPin className="w-3 h-3" />{regionData.flag} {regionData.label}
                  </span>
                )}
                <span className="flex items-center gap-1 ml-auto">
                  <Clock className="w-3 h-3" />
                  {new Date(post.created_at).toLocaleString('zh-CN')}
                </span>
              </div>
              <h1 className="text-xl font-bold">{post.title}</h1>
            </div>

            {/* Images */}
            {post.images && post.images.length > 0 && (
              <div className="grid grid-cols-2 gap-2">
                {post.images.map((url, i) => (
                  <img
                    key={i}
                    src={url}
                    alt=""
                    className="w-full aspect-square object-cover rounded-xl"
                  />
                ))}
              </div>
            )}

            {/* Content */}
            <div className="glass rounded-2xl p-5">
              <p className="text-zinc-300 leading-relaxed whitespace-pre-wrap">{post.content}</p>
            </div>

            {/* Contact */}
            {post.contact && (
              <div className="glass rounded-2xl p-5 flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-cyan-500/20 flex items-center justify-center">
                  <Phone className="w-5 h-5 text-cyan-400" />
                </div>
                <div>
                  <div className="text-xs text-zinc-500 mb-0.5">联系方式</div>
                  <div className="font-medium">{post.contact}</div>
                </div>
              </div>
            )}

            <Link
              to={`/life/${region}`}
              className="block text-center text-sm text-cyan-400 hover:underline"
            >
              ← 返回列表
            </Link>
          </article>
        )}
      </div>
    </div>
  );
};
