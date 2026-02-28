import React, { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { supabase, supabaseConfigured, CATEGORIES, REGIONS } from '../../lib/supabase';
import { LifeNav } from '../components/LifeNav';
import { Loader2, CheckCircle } from 'lucide-react';

export const PublishPage: React.FC = () => {
  const { region } = useParams<{ region: string }>();
  const navigate = useNavigate();
  const regionData = REGIONS.find(r => r.id === region);

  const [category, setCategory] = useState<string>(CATEGORIES[0].id);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [contact, setContact] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) {
      setError('请填写标题和内容');
      return;
    }
    setSubmitting(true);
    setError(null);
    try {
      if (!supabaseConfigured) throw new Error('数据库未配置，请联系管理员');
      const { error: err } = await supabase.from('posts').insert({
        region,
        category,
        title: title.trim(),
        content: content.trim(),
        contact: contact.trim(),
      });
      if (err) {
        const msg = err.message?.includes('violates')
          ? '提交失败，请检查填写内容是否完整'
          : `提交失败: ${err.message}`;
        setError(msg);
      } else {
        setDone(true);
      }
    } catch (e: any) {
      setError(e.message ?? '提交失败');
    } finally {
      setSubmitting(false);
    }
  };

  if (!regionData) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <p className="text-zinc-400">未找到该地区。<Link to="/life" className="text-cyan-400 underline ml-1">返回</Link></p>
      </div>
    );
  }

  if (done) {
    return (
      <div className="min-h-screen bg-black text-white">
        <LifeNav regionId={region} showBack />
        <div className="max-w-2xl mx-auto px-4 py-16 flex flex-col items-center gap-6 text-center">
          <CheckCircle className="w-16 h-16 text-emerald-400" />
          <h2 className="text-2xl font-bold">提交成功！</h2>
          <p className="text-zinc-400 text-sm leading-relaxed">
            您的帖子已提交，审核通过后将公开显示。<br />
            感谢您的参与！
          </p>
          <button
            onClick={() => navigate(`/life/${region}`)}
            className="px-6 py-3 rounded-full bg-cyan-500 text-black font-bold hover:bg-cyan-400 transition-colors"
          >
            返回列表
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <LifeNav regionId={region} showBack />
      <div className="max-w-2xl mx-auto px-4 py-6">
        <h1 className="text-xl font-bold mb-6">
          发布帖子 · {regionData.flag} {regionData.label}
        </h1>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Category */}
          <div>
            <label className="block text-sm text-zinc-400 mb-2">分类</label>
            <div className="flex flex-wrap gap-2">
              {CATEGORIES.map(cat => (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => setCategory(cat.id)}
                  className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
                    category === cat.id
                      ? 'bg-cyan-500 text-black'
                      : 'bg-white/10 text-zinc-300 hover:bg-white/20'
                  }`}
                >
                  {cat.icon} {cat.label}
                </button>
              ))}
            </div>
          </div>

          {/* Title */}
          <div>
            <label className="block text-sm text-zinc-400 mb-2">标题 *</label>
            <input
              type="text"
              value={title}
              onChange={e => setTitle(e.target.value)}
              maxLength={100}
              placeholder="请输入标题（最多100字）"
              className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/10 text-white placeholder-zinc-500 focus:outline-none focus:border-cyan-500/50 transition-colors"
            />
          </div>

          {/* Content */}
          <div>
            <label className="block text-sm text-zinc-400 mb-2">内容 *</label>
            <textarea
              value={content}
              onChange={e => setContent(e.target.value)}
              rows={6}
              placeholder="详细描述…"
              className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/10 text-white placeholder-zinc-500 focus:outline-none focus:border-cyan-500/50 transition-colors resize-none"
            />
          </div>

          {/* Contact */}
          <div>
            <label className="block text-sm text-zinc-400 mb-2">联系方式</label>
            <input
              type="text"
              value={contact}
              onChange={e => setContact(e.target.value)}
              placeholder="微信 / WhatsApp / 电话…"
              className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/10 text-white placeholder-zinc-500 focus:outline-none focus:border-cyan-500/50 transition-colors"
            />
          </div>

          {error && (
            <div className="px-4 py-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={submitting}
            className="w-full py-3.5 rounded-xl bg-cyan-500 text-black font-bold hover:bg-cyan-400 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {submitting && <Loader2 className="w-4 h-4 animate-spin" />}
            {submitting ? '提交中…' : '发布帖子'}
          </button>

          <p className="text-center text-xs text-zinc-500">
            提交后需经人工审核，审核通过方可公开显示
          </p>
        </form>
      </div>
    </div>
  );
};
