import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Wallet, 
  Play, 
  Newspaper, 
  MapPin, 
  ShoppingBag, 
  Briefcase, 
  Store, 
  Bot, 
  ArrowLeft,
  Plus,
  Search,
  Send,
  TrendingUp,
  Clock,
  ChevronRight,
  Filter,
  CreditCard,
  QrCode,
  History,
  Video,
  Radio,
  Share2,
  Heart,
  MessageCircle,
  Bookmark,
  Building2,
  DollarSign,
  UserPlus,
  Star
} from 'lucide-react';

interface EcosystemProps {
  t: any;
  onBack: () => void;
  chatHistory: any[];
  onSendMessage: (msg: string) => void;
  isTyping: boolean;
}

type ModuleType = 'payment' | 'entertainment' | 'news' | 'local' | 'secondhand' | 'jobs' | 'store' | 'ai';

export const Ecosystem: React.FC<EcosystemProps> = ({ t, onBack, chatHistory, onSendMessage, isTyping }) => {
  const [activeModule, setActiveModule] = useState<ModuleType | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const modules = [
    { id: 'payment', icon: Wallet, color: 'cyan', key: 'payment' },
    { id: 'entertainment', icon: Play, color: 'purple', key: 'entertainment' },
    { id: 'news', icon: Newspaper, color: 'blue', key: 'news' },
    { id: 'local', icon: MapPin, color: 'emerald', key: 'local' },
    { id: 'secondhand', icon: ShoppingBag, color: 'orange', key: 'secondhand' },
    { id: 'jobs', icon: Briefcase, color: 'indigo', key: 'jobs' },
    { id: 'store', icon: Store, color: 'rose', key: 'store' },
    { id: 'ai', icon: Bot, color: 'yellow', key: 'ai' },
  ];

  const renderModuleContent = () => {
    switch (activeModule) {
      case 'payment':
        return (
          <div className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="glass p-8 rounded-[2.5rem] bg-gradient-to-br from-cyan-500/20 to-blue-500/20 border-cyan-500/30">
                <div className="flex justify-between items-start mb-8">
                  <div>
                    <p className="text-zinc-400 text-sm font-bold uppercase tracking-widest mb-2">{t.ecosystem.wallet.balance}</p>
                    <h3 className="text-4xl font-black tracking-tighter">$12,840.50</h3>
                  </div>
                  <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center">
                    <CreditCard className="text-cyan-400" />
                  </div>
                </div>
                <div className="flex gap-4">
                  <button className="flex-1 py-4 bg-white text-black font-bold rounded-2xl flex items-center justify-center gap-2 hover:bg-cyan-400 transition-colors">
                    <Send className="w-4 h-4" /> {t.ecosystem.wallet.send}
                  </button>
                  <button className="flex-1 py-4 glass font-bold rounded-2xl flex items-center justify-center gap-2 hover:bg-white/10 transition-colors">
                    <QrCode className="w-4 h-4" /> {t.ecosystem.wallet.receive}
                  </button>
                </div>
              </div>
              <div className="glass p-8 rounded-[2.5rem]">
                <h4 className="font-bold mb-6 flex items-center gap-2">
                  <TrendingUp className="w-4 h-4 text-emerald-400" /> {t.ecosystem.wallet.assets}
                </h4>
                <div className="space-y-4">
                  {[
                    { name: 'X² Token', amount: '45,000', value: '$4,500', change: '+12.5%' },
                    { name: 'USDT', amount: '8,340', value: '$8,340', change: '0.0%' },
                  ].map((asset, i) => (
                    <div key={i} className="flex justify-between items-center p-4 rounded-2xl bg-white/5">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center font-black text-xs">X²</div>
                        <div>
                          <div className="font-bold text-sm">{asset.name}</div>
                          <div className="text-xs text-zinc-500">{asset.amount}</div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-bold text-sm">{asset.value}</div>
                        <div className={`text-[10px] font-bold ${asset.change.startsWith('+') ? 'text-emerald-400' : 'text-zinc-500'}`}>{asset.change}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="glass p-8 rounded-[2.5rem]">
              <h4 className="font-bold mb-6 flex items-center gap-2">
                <History className="w-4 h-4 text-zinc-400" /> {t.ecosystem.wallet.history}
              </h4>
              <div className="space-y-4">
                {[
                  { type: 'Receive', from: 'Global Logistics Inc.', amount: '+$2,400.00', date: '2024-03-20', status: 'Completed' },
                  { type: 'Send', to: 'Cloud Server Hosting', amount: '-$150.00', date: '2024-03-19', status: 'Completed' },
                  { type: 'Receive', from: 'Marketplace Sale', amount: '+$45.00', date: '2024-03-18', status: 'Completed' },
                ].map((tx, i) => (
                  <div key={i} className="flex justify-between items-center p-4 border-b border-white/5 last:border-0">
                    <div className="flex items-center gap-4">
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${tx.type === 'Receive' ? 'bg-emerald-500/10 text-emerald-400' : 'bg-rose-500/10 text-rose-400'}`}>
                        {tx.type === 'Receive' ? <Plus className="w-4 h-4" /> : <Send className="w-4 h-4" />}
                      </div>
                      <div>
                        <div className="font-bold text-sm">{tx.from || tx.to}</div>
                        <div className="text-xs text-zinc-500">{tx.date}</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className={`font-bold text-sm ${tx.type === 'Receive' ? 'text-emerald-400' : 'text-white'}`}>{tx.amount}</div>
                      <div className="text-[10px] text-zinc-600 font-bold uppercase">{tx.status}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );
      case 'entertainment':
        return (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-6">
              {[1, 2].map((v) => (
                <div key={v} className="glass rounded-[2.5rem] overflow-hidden group">
                  <div className="aspect-video bg-zinc-900 relative">
                    <img 
                      src={`https://picsum.photos/seed/video${v}/1280/720`} 
                      alt="Video thumbnail" 
                      className="w-full h-full object-cover opacity-60"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <button className="w-20 h-20 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center group-hover:scale-110 transition-transform">
                        <Play className="w-8 h-8 fill-white" />
                      </button>
                    </div>
                    <div className="absolute top-6 left-6 flex gap-2">
                      <div className="px-3 py-1 bg-rose-600 text-[10px] font-black uppercase rounded-full flex items-center gap-1">
                        <Radio className="w-3 h-3" /> LIVE
                      </div>
                      <div className="px-3 py-1 bg-black/50 backdrop-blur-md text-[10px] font-black uppercase rounded-full">
                        1.2k Watching
                      </div>
                    </div>
                  </div>
                  <div className="p-8">
                    <div className="flex justify-between items-start mb-4">
                      <h3 className="text-2xl font-bold">X²-Starlink Global Summit 2024: The Future of AI in Business</h3>
                      <div className="flex gap-4">
                        <button className="text-zinc-400 hover:text-rose-500 transition-colors"><Heart className="w-6 h-6" /></button>
                        <button className="text-zinc-400 hover:text-cyan-500 transition-colors"><Share2 className="w-6 h-6" /></button>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-cyan-500" />
                      <div>
                        <div className="font-bold text-sm">X² Official Channel</div>
                        <div className="text-xs text-zinc-500">2.4M Subscribers</div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="space-y-6">
              <div className="glass p-6 rounded-[2rem]">
                <h4 className="font-bold mb-6 flex items-center gap-2">
                  <Video className="w-4 h-4 text-purple-400" /> Trending Shorts
                </h4>
                <div className="grid grid-cols-2 gap-4">
                  {[1, 2, 3, 4].map((s) => (
                    <div key={s} className="aspect-[9/16] rounded-2xl bg-zinc-900 overflow-hidden relative group cursor-pointer">
                      <img 
                        src={`https://picsum.photos/seed/short${s}/400/700`} 
                        alt="Short" 
                        className="w-full h-full object-cover opacity-50 group-hover:scale-110 transition-transform duration-500"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute bottom-4 left-4 right-4">
                        <div className="text-[10px] font-bold text-white line-clamp-2">Amazing AI workflow in Mexico City...</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        );
      case 'news':
        return (
          <div className="max-w-4xl mx-auto space-y-8">
            <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide">
              {['All', 'Business', 'Tech', 'Local', 'Policy'].map((cat) => (
                <button key={cat} className={`px-6 py-2 rounded-full text-sm font-bold whitespace-nowrap transition-colors ${cat === 'All' ? 'bg-cyan-500 text-black' : 'glass text-zinc-400 hover:bg-white/10'}`}>
                  {cat}
                </button>
              ))}
            </div>
            <div className="space-y-6">
              {[
                { title: 'X²-Starlink Expands to Mexico: 3 New Economic Zones Launched', date: '2 hours ago', category: 'Business', img: 'mexico' },
                { title: 'New AI Regulations in EU: What Chinese Enterprises Need to Know', date: '5 hours ago', category: 'Policy', img: 'law' },
                { title: 'Indonesia Tech Hub: Jakarta Welcomes X² Innovation Center', date: '1 day ago', category: 'Tech', img: 'jakarta' },
              ].map((news, i) => (
                <div key={i} className="glass p-6 rounded-[2.5rem] flex flex-col md:flex-row gap-8 group cursor-pointer hover:bg-white/5 transition-colors">
                  <div className="w-full md:w-48 h-32 rounded-2xl overflow-hidden shrink-0">
                    <img 
                      src={`https://picsum.photos/seed/${news.img}/400/300`} 
                      alt="News" 
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <span className="text-[10px] font-black uppercase text-cyan-400 tracking-widest">{news.category}</span>
                      <span className="text-[10px] text-zinc-600 font-bold">•</span>
                      <span className="text-[10px] text-zinc-500 font-bold">{news.date}</span>
                    </div>
                    <h3 className="text-xl font-bold mb-4 group-hover:text-cyan-400 transition-colors">{news.title}</h3>
                    <div className="flex items-center gap-4">
                      <button className="text-zinc-500 hover:text-white transition-colors"><Bookmark className="w-4 h-4" /></button>
                      <button className="text-zinc-500 hover:text-white transition-colors"><Share2 className="w-4 h-4" /></button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      case 'secondhand':
      case 'store':
        const isStore = activeModule === 'store';
        return (
          <div className="space-y-8">
            <div className="flex flex-col md:flex-row gap-4 justify-between items-center">
              <div className="relative w-full md:w-96">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
                <input 
                  type="text" 
                  placeholder={t.ecosystem.market.search}
                  className="w-full bg-white/5 border border-white/10 rounded-2xl py-3 pl-12 pr-4 text-sm focus:outline-none focus:border-cyan-500/50"
                />
              </div>
              <div className="flex gap-3 w-full md:w-auto">
                <button className="flex-1 md:flex-none px-6 py-3 glass rounded-2xl text-sm font-bold flex items-center justify-center gap-2">
                  <Filter className="w-4 h-4" /> {t.ecosystem.market.categories[0]}
                </button>
                <button className="flex-1 md:flex-none px-6 py-3 bg-cyan-500 text-black rounded-2xl text-sm font-bold flex items-center justify-center gap-2">
                  <Plus className="w-4 h-4" /> {t.ecosystem.market.sell}
                </button>
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[1, 2, 3, 4, 5, 6, 7, 8].map((item) => (
                <div key={item} className="glass rounded-3xl overflow-hidden group cursor-pointer">
                  <div className="aspect-square bg-zinc-900 relative overflow-hidden">
                    <img 
                      src={`https://picsum.photos/seed/${isStore ? 'shop' : 'item'}${item}/500/500`} 
                      alt="Market item" 
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute top-4 right-4">
                      <button className="w-8 h-8 rounded-full bg-black/50 backdrop-blur-md flex items-center justify-center text-white hover:text-rose-500 transition-colors">
                        <Heart className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                  <div className="p-6">
                    <h4 className="font-bold mb-2 line-clamp-1">{isStore ? `X²-Store #${item}: Premium Retail Space` : `High-end Office Equipment Set #${item}`}</h4>
                    <div className="flex justify-between items-center">
                      <div className="text-cyan-400 font-black">{isStore ? '$2,500/mo' : '$450.00'}</div>
                      <div className="text-[10px] text-zinc-500 font-bold uppercase flex items-center gap-1">
                        <MapPin className="w-3 h-3" /> Mexico City
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      case 'local':
        return (
          <div className="space-y-8">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
              <input
                type="text"
                placeholder={t.ecosystem.local.searchPlaceholder}
                className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-sm focus:outline-none focus:border-emerald-500/50"
              />
            </div>
            <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
              {t.ecosystem.local.categories.map((cat: string, i: number) => (
                <button
                  key={i}
                  className={`px-5 py-2 rounded-full text-sm font-bold whitespace-nowrap transition-colors ${i === 0 ? 'bg-emerald-500 text-black' : 'glass text-zinc-400 hover:bg-white/10'}`}
                >
                  {cat}
                </button>
              ))}
            </div>
            <div>
              <h4 className="font-bold mb-6 flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-emerald-400" /> {t.ecosystem.local.popular}
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[
                  { name: '华记川菜馆', type: '川菜 · 中餐', rating: '4.9', distance: '0.3km', deliveryTime: '25min', minOrder: '$15', img: 'restaurant1', tag: t.ecosystem.local.delivery },
                  { name: 'Dragon Palace', type: '粤菜 · 中餐', rating: '4.8', distance: '0.6km', deliveryTime: '30min', minOrder: '$20', img: 'restaurant2', tag: t.ecosystem.local.delivery },
                  { name: '越南河粉专卖', type: '越南菜', rating: '4.7', distance: '1.2km', deliveryTime: '35min', minOrder: '$12', img: 'restaurant3', tag: t.ecosystem.local.delivery },
                  { name: 'Mexican Fusion', type: '墨西哥菜', rating: '4.6', distance: '0.8km', deliveryTime: '20min', minOrder: '$18', img: 'restaurant4', tag: t.ecosystem.local.orderNow },
                  { name: '华人超市生鲜', type: '超市 · 生鲜', rating: '4.8', distance: '0.4km', deliveryTime: '40min', minOrder: '$30', img: 'grocery1', tag: t.ecosystem.local.delivery },
                  { name: '到家保洁服务', type: '家政服务', rating: '4.9', distance: t.ecosystem.local.notApplicable, deliveryTime: t.ecosystem.local.byAppointment, minOrder: '$40', img: 'service1', tag: t.ecosystem.local.orderNow },
                ].map((merchant, i) => (
                  <motion.div
                    key={i}
                    whileHover={{ y: -4 }}
                    className="glass rounded-[2rem] overflow-hidden group cursor-pointer"
                  >
                    <div className="aspect-video bg-zinc-900 relative overflow-hidden">
                      <img
                        src={`https://picsum.photos/seed/${merchant.img}/600/400`}
                        alt={merchant.name}
                        className="w-full h-full object-cover opacity-70 group-hover:scale-105 transition-transform duration-500"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute top-4 left-4">
                        <span className="px-3 py-1 bg-emerald-500 text-black text-[10px] font-black rounded-full uppercase tracking-wider">
                          {merchant.tag}
                        </span>
                      </div>
                      <div className="absolute top-4 right-4 flex items-center gap-1 bg-black/60 backdrop-blur-md px-2 py-1 rounded-full">
                        <Star className="w-3 h-3 text-yellow-400 fill-yellow-400" />
                        <span className="text-xs font-bold text-white">{merchant.rating}</span>
                      </div>
                    </div>
                    <div className="p-5">
                      <h3 className="font-bold text-base mb-1 group-hover:text-emerald-400 transition-colors">{merchant.name}</h3>
                      <p className="text-xs text-zinc-500 mb-3">{merchant.type}</p>
                      <div className="flex items-center justify-between text-xs text-zinc-500">
                        <div className="flex items-center gap-3">
                          <span className="flex items-center gap-1">
                            <MapPin className="w-3 h-3 text-emerald-400" /> {merchant.distance}
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock className="w-3 h-3 text-cyan-400" /> {merchant.deliveryTime}
                          </span>
                        </div>
                        <span className="text-emerald-400 font-bold">{t.ecosystem.local.minPrice} {merchant.minOrder}</span>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        );
      case 'jobs':
        return (
          <div className="max-w-4xl mx-auto space-y-8">
            <div className="glass p-8 rounded-[2.5rem] flex flex-col md:flex-row gap-6 items-center">
              <div className="relative flex-1 w-full">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
                <input 
                  type="text" 
                  placeholder={t.ecosystem.jobs.search}
                  className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-sm focus:outline-none focus:border-cyan-500/50"
                />
              </div>
              <button className="w-full md:w-auto px-8 py-4 bg-white text-black font-black rounded-2xl hover:bg-cyan-400 transition-colors">
                {t.ecosystem.jobs.post}
              </button>
            </div>
            <div className="space-y-4">
              <h4 className="font-bold flex items-center gap-2 px-2">
                <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" /> {t.ecosystem.jobs.hot}
              </h4>
              {[
                { title: 'Senior AI Engineer', company: 'X²-Starlink Tech', salary: '$8k - $12k', location: 'Remote / Europe', tags: ['Full-time', 'AI', 'Node.js'] },
                { title: 'Global Operations Manager', company: 'Huashang Logistics', salary: '$6k - $9k', location: 'Mexico City', tags: ['Full-time', 'Logistics', 'Bilingual'] },
                { title: 'Digital Marketing Specialist', company: 'Indo-China Trade', salary: '$3k - $5k', location: 'Jakarta', tags: ['Contract', 'Marketing', 'Social Media'] },
              ].map((job, i) => (
                <div key={i} className="glass p-8 rounded-[2.5rem] group hover:border-cyan-500/30 transition-all cursor-pointer">
                  <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                    <div className="flex gap-6 items-center">
                      <div className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center">
                        <Building2 className="w-8 h-8 text-zinc-400" />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold mb-1 group-hover:text-cyan-400 transition-colors">{job.title}</h3>
                        <div className="flex items-center gap-3 text-sm text-zinc-500">
                          <span className="font-medium">{job.company}</span>
                          <span className="text-zinc-700">•</span>
                          <span className="flex items-center gap-1"><MapPin className="w-3 h-3" /> {job.location}</span>
                        </div>
                      </div>
                    </div>
                    <div className="text-right w-full md:w-auto">
                      <div className="text-xl font-black text-cyan-400 mb-3">{job.salary}</div>
                      <div className="flex gap-2 justify-end">
                        {job.tags.map((tag, j) => (
                          <span key={j} className="px-3 py-1 bg-white/5 rounded-full text-[10px] font-bold text-zinc-400 uppercase tracking-wider">{tag}</span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      case 'ai':
        return (
          <div className="h-[600px] flex flex-col glass rounded-[2.5rem] overflow-hidden">
            <div className="flex-1 overflow-y-auto p-8 space-y-6">
              {chatHistory.map((msg, i) => (
                <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[80%] p-6 rounded-3xl text-sm leading-relaxed ${
                    msg.role === 'user' 
                      ? 'bg-cyan-500 text-black font-medium rounded-tr-none' 
                      : 'bg-white/5 border border-white/10 text-zinc-200 rounded-tl-none'
                  }`}>
                    {msg.text}
                  </div>
                </div>
              ))}
              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-white/5 p-6 rounded-3xl rounded-tl-none flex items-center gap-3">
                    <div className="flex gap-1">
                      <motion.div animate={{ scale: [1, 1.2, 1] }} transition={{ repeat: Infinity, duration: 1 }} className="w-1.5 h-1.5 bg-cyan-400 rounded-full" />
                      <motion.div animate={{ scale: [1, 1.2, 1] }} transition={{ repeat: Infinity, duration: 1, delay: 0.2 }} className="w-1.5 h-1.5 bg-cyan-400 rounded-full" />
                      <motion.div animate={{ scale: [1, 1.2, 1] }} transition={{ repeat: Infinity, duration: 1, delay: 0.4 }} className="w-1.5 h-1.5 bg-cyan-400 rounded-full" />
                    </div>
                  </div>
                </div>
              )}
            </div>
            <div className="p-6 border-t border-white/10">
              <form 
                onSubmit={(e) => {
                  e.preventDefault();
                  const input = (e.target as any).message;
                  if (input.value.trim()) {
                    onSendMessage(input.value);
                    input.value = '';
                  }
                }} 
                className="relative"
              >
                <input
                  name="message"
                  type="text"
                  placeholder={t.chat.placeholder}
                  className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 pr-16 text-sm focus:outline-none focus:border-cyan-500/50"
                />
                <button type="submit" className="absolute right-2 top-1/2 -translate-y-1/2 w-12 h-12 bg-cyan-500 rounded-xl flex items-center justify-center text-black">
                  <Send className="w-5 h-5" />
                </button>
              </form>
            </div>
          </div>
        );
      default:
        return (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {modules.map((mod) => (
              <motion.button
                key={mod.id}
                whileHover={{ scale: 1.02, y: -5 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setActiveModule(mod.id as ModuleType)}
                className="glass p-8 rounded-[2.5rem] text-left group relative overflow-hidden"
              >
                <div className={`absolute top-0 right-0 w-32 h-32 bg-${mod.color}-500/10 blur-3xl -mr-10 -mt-10 group-hover:bg-${mod.color}-500/20 transition-colors`} />
                <div className={`w-16 h-16 rounded-2xl bg-${mod.color}-500/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500`}>
                  <mod.icon className={`w-8 h-8 text-${mod.color}-400`} />
                </div>
                <h3 className="text-2xl font-bold mb-2">{t.ecosystem.modules[mod.key].title}</h3>
                <p className="text-sm text-zinc-500 leading-relaxed">{t.ecosystem.modules[mod.key].desc}</p>
                <div className="mt-8 flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-zinc-600 group-hover:text-white transition-colors">
                  Explore Module <ChevronRight className="w-3 h-3" />
                </div>
              </motion.button>
            ))}
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-black pt-32 pb-20 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-8">
          <div>
            <button 
              onClick={activeModule ? () => setActiveModule(null) : onBack}
              className="flex items-center gap-2 text-zinc-500 hover:text-white transition-colors mb-6 group"
            >
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              {activeModule ? t.ecosystem.back : t.ecosystem.back}
            </button>
            <h1 className="text-4xl md:text-6xl font-black mb-4">
              {activeModule ? t.ecosystem.modules[activeModule].title : t.ecosystem.title}
            </h1>
            <p className="text-xl text-zinc-400 font-light">
              {activeModule ? t.ecosystem.modules[activeModule].desc : t.ecosystem.subtitle}
            </p>
          </div>
          {!activeModule && (
            <div className="glass px-6 py-3 rounded-2xl flex items-center gap-4">
              <div className="flex -space-x-3">
                {[1, 2, 3].map(i => (
                  <div key={i} className="w-8 h-8 rounded-full border-2 border-black bg-zinc-800 flex items-center justify-center text-[10px] font-bold">
                    {String.fromCharCode(64 + i)}
                  </div>
                ))}
              </div>
              <div className="text-xs font-bold text-zinc-400">
                <span className="text-cyan-400">2.4k</span> Users Online
              </div>
            </div>
          )}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeModule || 'grid'}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            {renderModuleContent()}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};
