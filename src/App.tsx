import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useNavigate } from 'react-router-dom';
import { 
  Globe, 
  Cpu, 
  ShieldCheck, 
  Zap, 
  ChevronRight, 
  Menu, 
  X, 
  Flag, 
  MessageSquare, 
  BarChart3, 
  Scale,
  Rocket,
  ArrowRight,
  Smartphone,
  LayoutGrid,
  Wallet,
  Send,
  Bot,
  User,
  Loader2,
  BrainCircuit,
  Languages,
  Search,
  Sparkles,
  Database,
  Twitter,
  Linkedin,
  Github,
  Youtube
} from 'lucide-react';
import { geminiService } from './services/geminiService';
import { useTranslation } from './hooks/useTranslation';

const NavItem = ({ href, children, onClick }: { href: string; children: React.ReactNode; onClick?: () => void }) => (
  <a 
    href={href} 
    onClick={onClick}
    className="text-sm font-medium text-zinc-400 hover:text-cyan-400 transition-colors uppercase tracking-wider"
  >
    {children}
  </a>
);

const FeatureCard = ({ icon: Icon, title, description, features, colorClass }: any) => (
  <motion.div 
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    className={`glass p-8 rounded-3xl group hover:border-${colorClass}/30 transition-all duration-500`}
  >
    <div className={`w-14 h-14 rounded-2xl bg-${colorClass}/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500`}>
      <Icon className={`w-8 h-8 text-${colorClass}`} />
    </div>
    <h3 className="text-2xl font-bold mb-4">{title}</h3>
    <p className="text-zinc-400 mb-6 leading-relaxed">{description}</p>
    <ul className="space-y-3">
      {features.map((f: string, i: number) => (
        <li key={i} className="flex items-center gap-3 text-sm text-zinc-500">
          <div className={`w-1.5 h-1.5 rounded-full bg-${colorClass}`} />
          {f}
        </li>
      ))}
    </ul>
  </motion.div>
);

const RegionCard = ({ icon: Icon, title, subtitle, description, features, accentColor }: any) => (
  <motion.div 
    initial={{ opacity: 0, scale: 0.95 }}
    whileInView={{ opacity: 1, scale: 1 }}
    viewport={{ once: true }}
    className="relative overflow-hidden glass rounded-[2.5rem] p-8 md:p-10 group"
  >
    <div className={`absolute top-0 right-0 w-32 h-32 bg-${accentColor}/10 blur-3xl -mr-10 -mt-10 group-hover:bg-${accentColor}/20 transition-colors`} />
    <div className="relative z-10">
      <div className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-${accentColor}/10 border border-${accentColor}/20 text-${accentColor} text-xs font-bold uppercase tracking-widest mb-6`}>
        <Flag className="w-3 h-3" />
        {subtitle}
      </div>
      <h3 className="text-3xl font-bold mb-4 flex items-center gap-3">
        <Icon className={`w-8 h-8 text-${accentColor}`} />
        {title}
      </h3>
      <p className="text-zinc-400 mb-8 leading-relaxed max-w-sm">
        {description}
      </p>
      <div className="grid grid-cols-1 gap-4">
        {features.map((f: string, i: number) => (
          <div key={i} className="flex items-center gap-3 text-sm font-medium text-zinc-300">
            <ShieldCheck className={`w-4 h-4 text-${accentColor}`} />
            {f}
          </div>
        ))}
      </div>
    </div>
  </motion.div>
);

export default function App() {
  const { t, lang } = useTranslation();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [showAIDetail, setShowAIDetail] = useState(false);
  const [chatMessage, setChatMessage] = useState('');
  const [chatHistory, setChatHistory] = useState<{ role: 'user' | 'ai', text: string }[]>([
    { role: 'ai', text: t.chat.welcome }
  ]);
  const [isTyping, setIsTyping] = useState(false);

  const handleSendMessage = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!chatMessage.trim() || isTyping) return;

    const userMsg = chatMessage;
    setChatMessage('');
    setChatHistory(prev => [...prev, { role: 'user', text: userMsg }]);
    setIsTyping(true);

    try {
      const response = await geminiService.sendMessage(userMsg);
      setChatHistory(prev => [...prev, { role: 'ai', text: response }]);
    } catch (error) {
      setChatHistory(prev => [...prev, { role: 'ai', text: t.chat.error }]);
    } finally {
      setIsTyping(false);
    }
  };

  useEffect(() => {
    if (showAIDetail) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [showAIDetail]);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-black selection:bg-cyan-500/30">
      {/* Navigation */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? 'py-4 glass border-b-white/5' : 'py-8'}`}>
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-cyan-400 to-blue-600 rounded-xl flex items-center justify-center font-black text-sm shadow-lg shadow-cyan-500/20 text-black">
              华商
            </div>
            <div className="hidden sm:block">
              <div className="font-bold text-lg tracking-tight leading-none">{t.footer.brand}</div>
              <div className="text-[10px] text-cyan-400 font-bold tracking-[0.2em] uppercase">Smart Ecosystem</div>
            </div>
          </div>

            <div className="hidden md:flex items-center gap-10">
              <NavItem href="#ecosystem">{t.nav.ecosystem}</NavItem>
              <a href="/life" className="text-sm font-medium text-zinc-400 hover:text-cyan-400 transition-colors uppercase tracking-wider">生活网站</a>
              <div className="flex items-center gap-4">
                <button 
                  onClick={() => setShowAIDetail(true)}
                  className="px-6 py-2.5 bg-white text-black text-sm font-bold rounded-full hover:bg-cyan-400 transition-colors"
                >
                  {t.nav.consult}
                </button>
                <div className="text-[10px] font-black text-cyan-400 border border-cyan-400/30 px-2 py-1 rounded uppercase tracking-tighter">
                  {lang}
                </div>
              </div>
            </div>

          <button 
            className="md:hidden p-2 text-zinc-400"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-40 bg-black pt-24 px-6 md:hidden"
          >
            <div className="flex flex-col gap-8">
              <NavItem href="#ecosystem" onClick={() => setIsMenuOpen(false)}>{t.nav.ecosystem}</NavItem>
              <button 
                onClick={() => {
                  setShowAIDetail(true);
                  setIsMenuOpen(false);
                }}
                className="w-full py-4 bg-cyan-500 text-black font-bold rounded-2xl"
              >
                {t.nav.consult}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hero Section */}
      <section id="home" className="relative pt-40 pb-20 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[600px] bg-mesh opacity-20 blur-3xl -z-10" />
        
        <div className="max-w-7xl mx-auto px-6">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-4xl"
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-bold uppercase tracking-widest mb-8">
              <Zap className="w-3 h-3 fill-cyan-400" />
              {t.hero.badge}
            </div>
            
            <h1 className="text-5xl md:text-8xl font-black leading-[0.9] tracking-tighter mb-8">
              {t.hero.title} <br />
              <span className="text-gradient">{t.hero.subtitle}</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-zinc-400 font-light leading-relaxed mb-12 max-w-2xl">
              {t.hero.desc}
            </p>

            <div className="flex flex-wrap gap-4 mb-16">
              <div className="glass px-6 py-3 rounded-2xl flex items-center gap-3">
                <MessageSquare className="w-5 h-5 text-cyan-400" />
                <span className="text-sm font-medium">{t.hero.features.news}</span>
              </div>
              <div className="glass px-6 py-3 rounded-2xl flex items-center gap-3">
                <User className="w-5 h-5 text-blue-400" />
                <span className="text-sm font-medium">{t.hero.features.jobs}</span>
              </div>
              <div className="glass px-6 py-3 rounded-2xl flex items-center gap-3">
                <Bot className="w-5 h-5 text-purple-400" />
                <span className="text-sm font-medium">{t.hero.features.agent}</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-6">
              <button 
                onClick={() => {
                  const el = document.getElementById('ecosystem');
                  el?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="px-10 py-5 bg-cyan-500 text-black font-black rounded-2xl flex items-center justify-center gap-3 hover:scale-105 transition-transform"
              >
                {t.hero.cta.explore} <ArrowRight className="w-5 h-5" />
              </button>
              <button 
                onClick={() => setShowAIDetail(true)}
                className="px-10 py-5 glass font-bold rounded-2xl flex items-center justify-center gap-3 hover:bg-white/10 transition-colors"
              >
                {t.hero.cta.experience}
              </button>
              <button
                onClick={() => navigate('/life')}
                className="px-10 py-5 glass font-bold rounded-2xl flex items-center justify-center gap-3 hover:bg-white/10 transition-colors border-cyan-500/30"
              >
                🏘️ 生活网站
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Ecosystem Section */}
      <section id="ecosystem" className="py-32">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-6xl font-black mb-6">{t.ecosystem.title}</h2>
            <p className="text-xl text-zinc-400 max-w-3xl mx-auto">
              {t.ecosystem.desc}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <FeatureCard 
              icon={MessageSquare}
              title={t.ecosystem.news.title}
              description={t.ecosystem.news.desc}
              features={t.ecosystem.news.features}
              colorClass="cyan-400"
            />
            <FeatureCard 
              icon={User}
              title={t.ecosystem.jobs.title}
              description={t.ecosystem.jobs.desc}
              features={t.ecosystem.jobs.features}
              colorClass="blue-400"
            />
            <FeatureCard 
              icon={Globe}
              title={t.ecosystem.housing.title}
              description={t.ecosystem.housing.desc}
              features={t.ecosystem.housing.features}
              colorClass="purple-400"
            />
            <FeatureCard 
              icon={BarChart3}
              title={t.ecosystem.business.title}
              description={t.ecosystem.business.desc}
              features={t.ecosystem.business.features}
              colorClass="emerald-400"
            />
            <FeatureCard 
              icon={LayoutGrid}
              title={t.ecosystem.market.title}
              description={t.ecosystem.market.desc}
              features={t.ecosystem.market.features}
              colorClass="orange-400"
            />
            <FeatureCard 
              icon={ShieldCheck}
              title={t.ecosystem.services.title}
              description={t.ecosystem.services.desc}
              features={t.ecosystem.services.features}
              colorClass="rose-400"
            />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-20 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-20">
            <div className="col-span-1 md:col-span-1">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-8 h-8 bg-cyan-500 rounded-lg flex items-center justify-center font-black text-[10px] text-black">华商</div>
                <span className="font-bold text-xl">{t.footer.brand}</span>
              </div>
              <p className="text-zinc-500 text-sm leading-relaxed mb-8">
                {t.footer.slogan}
              </p>
              <div className="flex gap-4">
                {[
                  { icon: Twitter, href: "#" },
                  { icon: Linkedin, href: "#" },
                  { icon: Github, href: "#" },
                  { icon: Youtube, href: "#" }
                ].map((social, i) => (
                  <motion.a
                    key={i}
                    href={social.href}
                    whileHover={{ scale: 1.2, color: "#22d3ee" }}
                    className="w-10 h-10 rounded-xl glass flex items-center justify-center text-zinc-500 transition-colors"
                  >
                    <social.icon className="w-5 h-5" />
                  </motion.a>
                ))}
              </div>
            </div>
            
            <div>
              <h4 className="font-bold mb-6 uppercase text-xs tracking-widest text-zinc-300">{t.nav.ecosystem}</h4>
              <ul className="space-y-4 text-sm text-zinc-500">
                <li><a href="#" className="hover:text-cyan-400 transition-colors">{t.ecosystem.news.title}</a></li>
                <li><a href="#" className="hover:text-cyan-400 transition-colors">{t.ecosystem.jobs.title}</a></li>
                <li><a href="#" className="hover:text-cyan-400 transition-colors">{t.ecosystem.housing.title}</a></li>
                <li><a href="#" className="hover:text-cyan-400 transition-colors">{t.ecosystem.market.title}</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold mb-6 uppercase text-xs tracking-widest text-zinc-300">{t.footer.ecosystem}</h4>
              <ul className="space-y-4 text-sm text-zinc-500">
                <li><a href="#" className="hover:text-cyan-400 transition-colors">{t.footer.links.assistant}</a></li>
                <li><a href="#" className="hover:text-cyan-400 transition-colors">{t.ecosystem.services.title}</a></li>
                <li><a href="#" className="hover:text-cyan-400 transition-colors">{t.ecosystem.business.title}</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold mb-6 uppercase text-xs tracking-widest text-zinc-300">{t.footer.contact}</h4>
              <ul className="space-y-4 text-sm text-zinc-500">
                <motion.li 
                  whileHover={{ x: 5 }}
                  className="flex items-start gap-3 group cursor-pointer"
                >
                  <Globe className="w-4 h-4 text-cyan-400 mt-0.5 group-hover:scale-125 transition-transform" />
                  <span className="group-hover:text-zinc-300 transition-colors">{t.footer.address}</span>
                </motion.li>
                <motion.li 
                  whileHover={{ x: 5 }}
                  className="flex items-center gap-3 group cursor-pointer"
                >
                  <Zap className="w-4 h-4 text-cyan-400 group-hover:scale-125 transition-transform" />
                  <span className="group-hover:text-zinc-300 transition-colors">contact@x2starlink.com</span>
                </motion.li>
              </ul>
            </div>
          </div>

          <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
            <p className="text-zinc-600 text-xs">
              &copy; 2025 华商智能本地生态网. {t.footer.rights}
            </p>
            <div className="flex gap-8 text-zinc-600 text-[10px] font-bold uppercase tracking-widest">
              <span>{t.footer.tags.usa}</span>
              <span>{t.footer.tags.eu}</span>
              <span>{t.footer.tags.mexico}</span>
            </div>
          </div>
        </div>
      </footer>

      {/* AI Command Center Detail View */}
      <AnimatePresence>
        {showAIDetail && (
          <motion.div
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.1 }}
            className="fixed inset-0 z-[100] bg-black flex flex-col"
          >
            {/* Header */}
            <header className="glass py-4 px-6 flex items-center justify-between border-b border-white/10">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-cyan-500 rounded-xl flex items-center justify-center font-black text-[10px] text-black">华商</div>
                <div>
                  <div className="font-bold text-lg">{t.command.title}</div>
                  <div className="text-[10px] text-cyan-400 font-bold uppercase tracking-widest">{t.command.badge}</div>
                </div>
              </div>
              <button 
                onClick={() => setShowAIDetail(false)}
                className="w-10 h-10 rounded-full glass flex items-center justify-center hover:bg-white/10 transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </header>

            <div className="flex-1 flex flex-col lg:flex-row overflow-hidden">
              {/* Left Sidebar: Features & Intro */}
              <div className="w-full lg:w-1/3 p-8 overflow-y-auto border-r border-white/10 bg-zinc-950/50">
                <div className="mb-12">
                  <h2 className="text-3xl font-black mb-4">{t.command.welcome}</h2>
                  <p className="text-zinc-400 leading-relaxed">
                    {t.command.desc}
                  </p>
                </div>

                <div className="space-y-6">
                  {t.command.features.map((f, i) => {
                    const icons = [Database, BrainCircuit, Languages, Search];
                    const colors = ["text-cyan-400", "text-blue-400", "text-purple-400", "text-emerald-400"];
                    const Icon = icons[i];
                    return (
                      <div key={i} className="glass p-6 rounded-2xl flex gap-4 items-start">
                        <div className={`w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center shrink-0`}>
                          <Icon className={`w-5 h-5 ${colors[i]}`} />
                        </div>
                        <div>
                          <h4 className="font-bold text-sm mb-1">{f.title}</h4>
                          <p className="text-xs text-zinc-500 leading-relaxed">{f.desc}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div className="mt-12 p-6 rounded-3xl bg-gradient-to-br from-cyan-500/10 to-blue-500/10 border border-cyan-500/20">
                  <h4 className="font-bold mb-2 flex items-center gap-2">
                    <Zap className="w-4 h-4 text-cyan-400" /> {t.command.recruiting.title}
                  </h4>
                  <p className="text-xs text-zinc-400 leading-relaxed">
                    {t.command.recruiting.desc}
                  </p>
                </div>
              </div>

              {/* Right Side: Interactive Chat */}
              <div className="flex-1 flex flex-col bg-black relative">
                <div className="absolute inset-0 bg-mesh opacity-5 blur-3xl -z-10" />
                
                {/* Chat Messages */}
                <div className="flex-1 overflow-y-auto p-8 space-y-6 scrollbar-hide">
                  {chatHistory.map((msg, i) => (
                    <motion.div 
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      key={i} 
                      className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div className={`flex gap-4 max-w-[85%] ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 shadow-lg ${
                          msg.role === 'user' ? 'bg-zinc-800' : 'bg-cyan-500 text-black'
                        }`}>
                          {msg.role === 'user' ? <User className="w-5 h-5" /> : <Bot className="w-6 h-6" />}
                        </div>
                        <div className={`p-6 rounded-3xl text-sm leading-relaxed shadow-xl ${
                          msg.role === 'user' 
                            ? 'bg-cyan-500 text-black font-medium rounded-tr-none' 
                            : 'glass text-zinc-200 rounded-tl-none'
                        }`}>
                          {msg.text}
                        </div>
                      </div>
                    </motion.div>
                  ))}
                  {isTyping && (
                    <div className="flex justify-start gap-4">
                      <div className="w-10 h-10 rounded-full bg-cyan-500 flex items-center justify-center text-black">
                        <Bot className="w-6 h-6" />
                      </div>
                      <div className="glass p-6 rounded-3xl rounded-tl-none flex items-center gap-3">
                        <div className="flex gap-1">
                          <motion.div animate={{ scale: [1, 1.2, 1] }} transition={{ repeat: Infinity, duration: 1 }} className="w-1.5 h-1.5 bg-cyan-400 rounded-full" />
                          <motion.div animate={{ scale: [1, 1.2, 1] }} transition={{ repeat: Infinity, duration: 1, delay: 0.2 }} className="w-1.5 h-1.5 bg-cyan-400 rounded-full" />
                          <motion.div animate={{ scale: [1, 1.2, 1] }} transition={{ repeat: Infinity, duration: 1, delay: 0.4 }} className="w-1.5 h-1.5 bg-cyan-400 rounded-full" />
                        </div>
                        <span className="text-xs text-zinc-400 font-medium">{t.chat.thinking}</span>
                      </div>
                    </div>
                  )}
                </div>

                {/* Chat Input */}
                <div className="p-8 glass border-t border-white/10">
                  <form onSubmit={handleSendMessage} className="max-w-4xl mx-auto relative">
                    <input
                      type="text"
                      value={chatMessage}
                      onChange={(e) => setChatMessage(e.target.value)}
                      placeholder={t.chat.placeholder}
                      className="w-full bg-white/5 border border-white/10 rounded-2xl px-8 py-5 pr-20 text-lg focus:outline-none focus:border-cyan-500/50 transition-all shadow-2xl"
                    />
                    <button 
                      type="submit"
                      disabled={isTyping}
                      className="absolute right-3 top-1/2 -translate-y-1/2 w-14 h-14 bg-cyan-500 rounded-xl flex items-center justify-center text-black hover:bg-cyan-400 transition-colors disabled:opacity-50 shadow-lg"
                    >
                      <Send className="w-6 h-6" />
                    </button>
                  </form>
                  <div className="mt-4 text-center text-[10px] text-zinc-600 uppercase tracking-widest font-bold">
                    {t.command.footer}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* AI Chatbot Floating Button */}
      <div className="fixed bottom-8 right-8 z-50">
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setIsChatOpen(!isChatOpen)}
          className="w-16 h-16 bg-gradient-to-br from-cyan-400 to-blue-600 rounded-full flex items-center justify-center shadow-2xl shadow-cyan-500/40 text-black"
        >
          {isChatOpen ? <X className="w-8 h-8" /> : <MessageSquare className="w-8 h-8" />}
        </motion.button>

        <AnimatePresence>
          {isChatOpen && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="absolute bottom-20 right-0 w-[350px] sm:w-[400px] h-[500px] glass rounded-[2rem] overflow-hidden flex flex-col shadow-2xl border-white/20"
            >
              {/* Chat Header */}
              <div className="p-6 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 border-b border-white/10">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-cyan-500 rounded-full flex items-center justify-center text-black">
                    <Bot className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="font-bold text-sm">{t.chat.title}</div>
                    <div className="text-[10px] text-cyan-400 font-bold uppercase tracking-wider">{t.chat.status}</div>
                  </div>
                </div>
              </div>

              {/* Chat Messages */}
              <div className="flex-1 overflow-y-auto p-6 space-y-4 scrollbar-hide">
                {chatHistory.map((msg, i) => (
                  <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                    <div className={`max-w-[80%] p-4 rounded-2xl text-sm ${
                      msg.role === 'user' 
                        ? 'bg-cyan-500 text-black font-medium rounded-tr-none' 
                        : 'bg-white/10 text-zinc-200 rounded-tl-none'
                    }`}>
                      {msg.text}
                    </div>
                  </div>
                ))}
                {isTyping && (
                  <div className="flex justify-start">
                    <div className="bg-white/10 p-4 rounded-2xl rounded-tl-none flex items-center gap-2">
                      <Loader2 className="w-4 h-4 animate-spin text-cyan-400" />
                      <span className="text-xs text-zinc-400">{t.chat.thinking}</span>
                    </div>
                  </div>
                )}
              </div>

              {/* Chat Input */}
              <form onSubmit={handleSendMessage} className="p-4 border-t border-white/10 flex gap-2">
                <input
                  type="text"
                  value={chatMessage}
                  onChange={(e) => setChatMessage(e.target.value)}
                  placeholder={t.chat.placeholder}
                  className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-sm focus:outline-none focus:border-cyan-500/50 transition-colors"
                />
                <button 
                  type="submit"
                  disabled={isTyping}
                  className="w-10 h-10 bg-cyan-500 rounded-xl flex items-center justify-center text-black hover:bg-cyan-400 transition-colors disabled:opacity-50"
                >
                  <Send className="w-5 h-5" />
                </button>
              </form>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
