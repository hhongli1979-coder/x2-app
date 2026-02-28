import React from 'react';
import { Link } from 'react-router-dom';
import { Pin, Clock } from 'lucide-react';
import { Post, CATEGORIES } from '../../lib/supabase';

interface PostCardProps {
  post: Post;
  region: string;
}

export const PostCard: React.FC<PostCardProps> = ({ post, region }) => {
  const cat = CATEGORIES.find(c => c.id === post.category);
  const date = new Date(post.created_at).toLocaleDateString('zh-CN', {
    month: 'short', day: 'numeric'
  });

  return (
    <Link
      to={`/life/${region}/post/${post.id}`}
      className="block glass rounded-2xl p-4 hover:border-cyan-500/30 transition-all duration-200 hover:bg-white/10"
    >
      <div className="flex items-start justify-between gap-2 mb-2">
        <h3 className="font-semibold text-white line-clamp-2 flex-1">{post.title}</h3>
        {post.pinned && <Pin className="w-4 h-4 text-cyan-400 flex-shrink-0 mt-0.5" />}
      </div>
      <p className="text-sm text-zinc-400 line-clamp-2 mb-3">{post.content}</p>
      <div className="flex items-center gap-3 text-xs text-zinc-500">
        {cat && (
          <span className="px-2 py-0.5 rounded-full bg-white/5 border border-white/10">
            {cat.icon} {cat.label}
          </span>
        )}
        <span className="flex items-center gap-1 ml-auto">
          <Clock className="w-3 h-3" />
          {date}
        </span>
      </div>
    </Link>
  );
};
