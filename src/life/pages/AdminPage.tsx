import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { supabase, Post, PostStatus, CATEGORIES, REGIONS } from '../../lib/supabase';
import { Loader2, CheckCircle, XCircle, EyeOff, Trash2, Pin, LogOut, Globe } from 'lucide-react';

const ADMIN_PASSWORD = import.meta.env.VITE_ADMIN_PASSWORD as string | undefined;

const StatusBadge: React.FC<{ status: PostStatus }> = ({ status }) => {
  const map: Record<PostStatus, { label: string; cls: string }> = {
    pending:  { label: '待审', cls: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/20' },
    approved: { label: '已批',  cls: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/20' },
    rejected: { label: '已拒',  cls: 'bg-red-500/20 text-red-400 border-red-500/20' },
    hidden:   { label: '隐藏',  cls: 'bg-zinc-500/20 text-zinc-400 border-zinc-500/20' },
  };
  const s = map[status] ?? map.pending;
  return (
    <span className={`px-2 py-0.5 rounded-full text-xs border ${s.cls}`}>{s.label}</span>
  );
};

export const AdminPage: React.FC = () => {
  const [authed, setAuthed] = useState(false);
  const [password, setPassword] = useState('');
  const [authError, setAuthError] = useState('');

  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(false);
  const [filter, setFilter] = useState<PostStatus | 'all'>('pending');
  const [updating, setUpdating] = useState<string | null>(null);

  const [opError, setOpError] = useState<string | null>(null);

  const fetchPosts = useCallback(async () => {
    setLoading(true);
    let q = supabase
      .from('posts')
      .select('*')
      .order('created_at', { ascending: false });
    if (filter !== 'all') q = q.eq('status', filter);
    const { data } = await q;
    setPosts((data as Post[]) ?? []);
    setLoading(false);
  }, [filter]);

  useEffect(() => {
    if (authed) fetchPosts();
  }, [authed, fetchPosts]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Simple client-side password gate (Supabase RLS is the real guard)
    if (!ADMIN_PASSWORD || password === ADMIN_PASSWORD) {
      setAuthed(true);
    } else {
      setAuthError('密码错误');
    }
  };

  const updatePost = async (id: string, patch: Partial<Post>) => {
    setUpdating(id);
    setOpError(null);
    const { error: err } = await supabase.from('posts').update(patch).eq('id', id);
    if (err) setOpError(`操作失败: ${err.message}`);
    await fetchPosts();
    setUpdating(null);
  };

  const deletePost = async (id: string) => {
    if (!confirm('确定删除这条帖子？')) return;
    setUpdating(id);
    setOpError(null);
    const { error: err } = await supabase.from('posts').delete().eq('id', id);
    if (err) setOpError(`删除失败: ${err.message}`);
    await fetchPosts();
    setUpdating(null);
  };

  if (!authed) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center p-4">
        <form onSubmit={handleLogin} className="w-full max-w-xs space-y-4">
          <div className="text-center mb-6">
            <h1 className="text-2xl font-black mb-1">管理后台</h1>
            <p className="text-xs text-zinc-500">X² 生活网站</p>
          </div>
          <input
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            placeholder="管理员密码"
            className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/10 text-white placeholder-zinc-500 focus:outline-none focus:border-cyan-500/50"
          />
          {authError && <p className="text-red-400 text-sm text-center">{authError}</p>}
          <button
            type="submit"
            className="w-full py-3 rounded-xl bg-cyan-500 text-black font-bold hover:bg-cyan-400 transition-colors"
          >
            进入
          </button>
          <Link to="/life" className="block text-center text-xs text-zinc-500 hover:text-cyan-400 transition-colors">
            返回生活网站
          </Link>
        </form>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Nav */}
      <header className="sticky top-0 z-30 bg-black/80 backdrop-blur-xl border-b border-white/10">
        <div className="max-w-3xl mx-auto px-4 h-14 flex items-center gap-3">
          <Link to="/" className="p-1.5 rounded-lg hover:bg-white/10 transition-colors">
            <Globe className="w-5 h-5 text-cyan-400" />
          </Link>
          <span className="font-bold flex-1">X² 管理后台</span>
          <button
            onClick={() => setAuthed(false)}
            className="p-1.5 rounded-lg hover:bg-white/10 transition-colors text-zinc-400"
            title="退出"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </header>

      <div className="max-w-3xl mx-auto px-4 py-4 space-y-4">
        {opError && (
          <div className="px-4 py-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
            {opError}
          </div>
        )}
        {/* Filter tabs */}
        <div className="flex gap-2 overflow-x-auto pb-1">
          {(['pending', 'approved', 'rejected', 'hidden', 'all'] as const).map(s => (
            <button
              key={s}
              onClick={() => setFilter(s)}
              className={`flex-shrink-0 px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
                filter === s
                  ? 'bg-cyan-500 text-black'
                  : 'bg-white/10 text-zinc-400 hover:bg-white/20'
              }`}
            >
              {s === 'all' ? '全部' : { pending:'待审', approved:'已批', rejected:'已拒', hidden:'隐藏' }[s]}
            </button>
          ))}
        </div>

        {loading ? (
          <div className="flex justify-center py-12">
            <Loader2 className="w-6 h-6 animate-spin text-cyan-400" />
          </div>
        ) : posts.length === 0 ? (
          <div className="glass rounded-2xl p-8 text-center text-zinc-400 text-sm">暂无帖子</div>
        ) : (
          <div className="space-y-3">
            {posts.map(post => {
              const cat = CATEGORIES.find(c => c.id === post.category);
              const reg = REGIONS.find(r => r.id === post.region);
              const busy = updating === post.id;
              return (
                <div key={post.id} className="glass rounded-2xl p-4 space-y-3">
                  {/* Header row */}
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap mb-1">
                        <StatusBadge status={post.status as PostStatus} />
                        {post.pinned && <Pin className="w-3 h-3 text-cyan-400" />}
                        <span className="text-xs text-zinc-500">{reg?.flag} {reg?.label}</span>
                        <span className="text-xs text-zinc-500">{cat?.icon} {cat?.label}</span>
                      </div>
                      <p className="font-semibold text-sm line-clamp-1">{post.title}</p>
                      <p className="text-xs text-zinc-500 line-clamp-2 mt-0.5">{post.content}</p>
                      {post.contact && (
                        <p className="text-xs text-zinc-400 mt-1">📞 {post.contact}</p>
                      )}
                    </div>
                  </div>

                  {/* Action row */}
                  <div className="flex items-center gap-2 flex-wrap">
                    <button
                      disabled={busy || post.status === 'approved'}
                      onClick={() => updatePost(post.id, { status: 'approved' })}
                      className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-emerald-500/10 text-emerald-400 text-xs hover:bg-emerald-500/20 disabled:opacity-40 transition-colors"
                    >
                      <CheckCircle className="w-3 h-3" /> 批准
                    </button>
                    <button
                      disabled={busy || post.status === 'rejected'}
                      onClick={() => updatePost(post.id, { status: 'rejected' })}
                      className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-red-500/10 text-red-400 text-xs hover:bg-red-500/20 disabled:opacity-40 transition-colors"
                    >
                      <XCircle className="w-3 h-3" /> 拒绝
                    </button>
                    <button
                      disabled={busy || post.status === 'hidden'}
                      onClick={() => updatePost(post.id, { status: 'hidden' })}
                      className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-zinc-500/10 text-zinc-400 text-xs hover:bg-zinc-500/20 disabled:opacity-40 transition-colors"
                    >
                      <EyeOff className="w-3 h-3" /> 隐藏
                    </button>
                    <button
                      disabled={busy}
                      onClick={() => updatePost(post.id, { pinned: !post.pinned })}
                      className={`flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs transition-colors disabled:opacity-40 ${
                        post.pinned ? 'bg-cyan-500/20 text-cyan-400 hover:bg-cyan-500/30' : 'bg-white/5 text-zinc-400 hover:bg-white/10'
                      }`}
                    >
                      <Pin className="w-3 h-3" /> {post.pinned ? '取消置顶' : '置顶'}
                    </button>
                    <button
                      disabled={busy}
                      onClick={() => deletePost(post.id)}
                      className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-red-900/20 text-red-500 text-xs hover:bg-red-900/40 disabled:opacity-40 transition-colors ml-auto"
                    >
                      {busy ? <Loader2 className="w-3 h-3 animate-spin" /> : <Trash2 className="w-3 h-3" />}
                      删除
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};
