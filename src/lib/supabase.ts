import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string;

export const supabaseConfigured = !!(supabaseUrl && supabaseAnonKey);

if (!supabaseConfigured) {
  console.warn(
    'Missing Supabase environment variables.\n' +
    'Set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in .env.local'
  );
}

export const supabase = supabaseConfigured
  ? createClient(supabaseUrl, supabaseAnonKey)
  : (null as unknown as ReturnType<typeof createClient>);

export type Region = 'eu' | 'id';
export type PostStatus = 'pending' | 'approved' | 'rejected' | 'hidden';

export interface Post {
  id: string;
  region: Region;
  category: string;
  title: string;
  content: string;
  contact: string;
  images: string[];
  status: PostStatus;
  pinned: boolean;
  user_id: string | null;
  created_at: string;
  updated_at: string;
}

export const CATEGORIES = [
  { id: 'housing',     label: '租房',    icon: '🏠' },
  { id: 'secondhand',  label: '二手',    icon: '♻️' },
  { id: 'jobs',        label: '招聘',    icon: '💼' },
  { id: 'services',    label: '生活服务', icon: '🛎️' },
  { id: 'social',      label: '交友',    icon: '💬' },
] as const;

export const REGIONS: { id: Region; label: string; labelEn: string; flag: string }[] = [
  { id: 'eu', label: '欧洲区', labelEn: 'Europe',    flag: '🇪🇺' },
  { id: 'id', label: '印尼区', labelEn: 'Indonesia', flag: '🇮🇩' },
];
