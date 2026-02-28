export type Language = 'zh' | 'en' | 'es' | 'id';

export const translations = {
  zh: {
    nav: {
      home: '首页',
      ecosystem: '生态板块',
      news: 'AI新闻',
      jobs: 'AI招聘',
      housing: 'AI房产',
      business: '生意转让',
      market: '二手市场',
      services: '便民服务',
      consult: '立即咨询',
    },
    hero: {
      badge: '全球华商 · AI智能本地生态网',
      title: '华商智能',
      subtitle: '本地生态网',
      desc: '超越传统分类信息，打造全方位AI驱动的华商生态。整合新闻、招聘、房产与交易，赋能全球华人商业生活。',
      features: {
        agent: 'AI全能助手',
        news: 'AI智能资讯',
        jobs: 'AI精准匹配',
      },
      cta: {
        explore: '进入生态系统',
        experience: '对话AI助手',
      }
    },
    ecosystem: {
      title: 'AI 赋能核心板块',
      desc: '在传统分类信息基础上，通过AI深度学习提供智能化升级体验。',
      news: {
        title: 'AI 智能新闻',
        desc: '实时抓取全球商业动态，AI自动翻译、摘要并分析对本地华商的具体影响。',
        features: ['多语种实时翻译', '商业价值评估', '政策变动预警', '个性化资讯推送'],
      },
      jobs: {
        title: 'AI 智能招聘',
        desc: '超越简单发布。AI匹配引擎根据技能与文化契合度，连接华商企业与顶尖人才。',
        features: ['简历AI优化', '智能职位匹配', '跨境人才搜寻', '面试AI模拟'],
      },
      housing: {
        title: 'AI 智能房产',
        desc: 'AI自动评估房产价值，分析周边商业环境与治安，提供精准的租售建议。',
        features: ['AI估值模型', '周边环境分析', '虚拟AI看房', '合同法律审核'],
      },
      business: {
        title: 'AI 生意转让',
        desc: '为餐馆、零售等华商生意提供AI估值与尽职调查辅助，确保交易安全透明。',
        features: ['盈利能力预测', '行业风险评估', '买卖双方撮合', '转让流程指导'],
      },
      market: {
        title: 'AI 二手市场',
        desc: '图片识别自动发布，AI评估商品新旧与价值，智能过滤虚假信息。',
        features: ['AI自动估值', '智能描述生成', '信任评分系统', '物流智能推荐'],
      },
      services: {
        title: 'AI 便民服务',
        desc: '集成翻译、法律、税务等AI助手，解决华商在海外生活的方方面面。',
        features: ['AI法律咨询', '税务智能申报', '多语种翻译官', '本地办事指南'],
      }
    },
    footer: {
      brand: '华商智能',
      slogan: 'AI智能体助手进万家华企 · 全球华人企业数字化升级领导者',
      ecosystem: '服务生态',
      contact: '联系我们',
      address: '全球数字化运营中心',
      rights: '保留所有权利',
      links: {
        assistant: 'AI 智能助手',
      },
      tags: {
        usa: '美国合规',
        eu: '欧盟标准',
        mexico: '美洲覆盖',
      }
    },
    command: {
      title: '华商 AI 智能指挥中心',
      badge: 'AI 驱动 · 全球导航',
      welcomeTitle: '欢迎来到未来商业',
      welcomeDesc: '华商智能 AI 助手不仅是一个对话工具，它是您的全球商务大脑。基于谷歌最先进的多模态大模型，我们为您提供全天候、跨语言、深逻辑的商业支持。',
      agentRecruit: '生态合作伙伴招募中',
      agentDesc: '加入华商智能全球生态，共同赋能千万华人企业。点击右侧对话框咨询合作详情。',
      secure: '安全私密的 AI 咨询 · 华商智能生态系统',
    },
    chat: {
      welcome: '您好！我是 华商智能 官方 AI 导航员。请问有什么可以帮您？我可以为您导航到新闻、招聘、房产或生意转让等板块。',
      placeholder: '咨询商业、招聘或房产信息...',
      thinking: '正在思考...',
      error: '抱歉，由于咨询量较大，我的大脑暂时处理不过来。请稍后再试。',
      header: {
        title: '华商智能 AI 导航员',
        status: '在线 · 全球支持',
      }
    }
  },
  en: {
    nav: {
      home: 'Home',
      ecosystem: 'Ecosystem',
      news: 'AI News',
      jobs: 'AI Jobs',
      housing: 'AI Housing',
      business: 'Business',
      market: 'Market',
      services: 'Services',
      consult: 'Consult Now',
    },
    hero: {
      badge: 'Global Chinese · AI Local Ecosystem',
      title: 'Chinese Biz',
      subtitle: 'Intelligence Net',
      desc: 'Beyond traditional classifieds, building a full-scale AI-driven ecosystem. Integrating news, jobs, housing, and trading.',
      features: {
        agent: 'AI All-in-one',
        news: 'AI Smart News',
        jobs: 'AI Precision Match',
      },
      cta: {
        explore: 'Enter Ecosystem',
        experience: 'Chat with AI',
      }
    },
    ecosystem: {
      title: 'AI Powered Core Modules',
      desc: 'Upgrading traditional classifieds with deep learning for a smarter user experience.',
      news: {
        title: 'AI Smart News',
        desc: 'Real-time global business dynamics, AI-translated and analyzed for local impact.',
        features: ['Real-time Translation', 'Value Assessment', 'Policy Alerts', 'Personalized Feed'],
      },
      jobs: {
        title: 'AI Smart Jobs',
        desc: 'AI matching engine based on skills and cultural fit, connecting firms with top talent.',
        features: ['Resume AI Optimization', 'Smart Job Matching', 'Cross-border Search', 'AI Interview Prep'],
      },
      housing: {
        title: 'AI Smart Housing',
        desc: 'AI-driven valuation and neighborhood analysis for precise rental and sales advice.',
        features: ['AI Valuation', 'Environment Analysis', 'Virtual AI Tours', 'Legal Review'],
      },
      business: {
        title: 'AI Biz Transfer',
        desc: 'AI valuation and due diligence for restaurants and retail businesses.',
        features: ['Profit Prediction', 'Risk Assessment', 'Buyer-Seller Match', 'Transfer Guidance'],
      },
      market: {
        title: 'AI Market',
        desc: 'Image-based auto-posting and AI valuation to filter fraud and ensure fair deals.',
        features: ['AI Valuation', 'Smart Description', 'Trust Score', 'Logistics Sync'],
      },
      services: {
        title: 'AI Services',
        desc: 'Integrated AI assistants for legal, tax, and translation needs in daily life.',
        features: ['AI Legal Advice', 'Smart Tax Filing', 'Multilingual Translator', 'Local Guide'],
      }
    },
    footer: {
      brand: 'Huashang AI',
      slogan: 'AI Agents for Global Chinese Enterprises · Leader in Digital Upgrades',
      ecosystem: 'Ecosystem',
      contact: 'Contact Us',
      address: 'Global Digital Ops Center',
      rights: 'All rights reserved',
      links: {
        assistant: 'AI Assistant',
      },
      tags: {
        usa: 'USA Compliant',
        eu: 'EU Standard',
        mexico: 'Americas Coverage',
      }
    },
    command: {
      title: 'AI Command Center',
      badge: 'AI Driven · Global Navigation',
      welcomeTitle: 'Welcome to Future Business',
      welcomeDesc: 'Huashang AI is not just a chat tool; it is your global business brain. Based on Google\'s advanced multimodal models.',
      agentRecruit: 'Partners Wanted',
      agentDesc: 'Join the Huashang AI ecosystem. Click the chat box to inquire about partnership details.',
      secure: 'Secure & Private AI Consultation · Huashang AI Ecosystem',
    },
    chat: {
      welcome: 'Hello! I am the Huashang AI Navigator. How can I help you? I can guide you to News, Jobs, Housing, or Business sections.',
      placeholder: 'Inquire about business, jobs, or housing...',
      thinking: 'Thinking...',
      error: 'Sorry, due to high volume, my brain is overloaded. Please try again later.',
      header: {
        title: 'Huashang AI Navigator',
        status: 'Online · Global Support',
      }
    }
  },
  es: {
    nav: {
      home: 'Inicio',
      ecosystem: 'Ecosistema',
      news: 'Noticias AI',
      jobs: 'Empleos AI',
      housing: 'Vivienda AI',
      business: 'Negocios',
      market: 'Mercado',
      services: 'Servicios',
      consult: 'Consultar Ahora',
    },
    hero: {
      badge: 'Chinos Globales · Ecosistema Local AI',
      title: 'Huashang',
      subtitle: 'Red Inteligente',
      desc: 'Más allá de los clasificados tradicionales, construyendo un ecosistema completo impulsado por IA. Integrando noticias, empleos, vivienda y comercio.',
      features: {
        agent: 'IA Todo-en-uno',
        news: 'Noticias Inteligentes',
        jobs: 'Emparejamiento Preciso',
      },
      cta: {
        explore: 'Entrar al Ecosistema',
        experience: 'Chat con IA',
      }
    },
    ecosystem: {
      title: 'Módulos Principales con IA',
      desc: 'Actualizando los clasificados tradicionales con aprendizaje profundo para una experiencia de usuario más inteligente.',
      news: {
        title: 'Noticias Inteligentes AI',
        desc: 'Dinámica empresarial global en tiempo real, traducida y analizada por IA para impacto local.',
        features: ['Traducción en Tiempo Real', 'Evaluación de Valor', 'Alertas de Política', 'Feed Personalizado'],
      },
      jobs: {
        title: 'Empleos Inteligentes AI',
        desc: 'Motor de emparejamiento de IA basado en habilidades y ajuste cultural, conectando empresas con talento.',
        features: ['Optimización de CV con IA', 'Emparejamiento Inteligente', 'Búsqueda Transfronteriza', 'Simulación de Entrevistas'],
      },
      housing: {
        title: 'Vivienda Inteligente AI',
        desc: 'Valoración impulsada por IA y análisis de vecindario para consejos precisos de alquiler y venta.',
        features: ['Valoración IA', 'Análisis de Entorno', 'Tours Virtuales IA', 'Revisión Legal'],
      },
      business: {
        title: 'Transferencia de Negocios AI',
        desc: 'Valoración de IA y debida diligencia para restaurantes y negocios minoristas.',
        features: ['Predicción de Ganancias', 'Evaluación de Riesgos', 'Emparejamiento Comprador-Vendedor', 'Guía de Transferencia'],
      },
      market: {
        title: 'Mercado AI',
        desc: 'Publicación automática basada en imágenes y valoración de IA para filtrar fraudes.',
        features: ['Valoración IA', 'Descripción Inteligente', 'Puntuación de Confianza', 'Sincronización Logística'],
      },
      services: {
        title: 'Servicios AI',
        desc: 'Asistentes de IA integrados para necesidades legales, fiscales y de traducción en la vida diaria.',
        features: ['Asesoría Legal IA', 'Declaración de Impuestos', 'Traductor Multilingüe', 'Guía Local'],
      }
    },
    footer: {
      brand: 'Huashang AI',
      slogan: 'Agentes de IA para Empresas Chinas Globales · Líder en Actualizaciones Digitales',
      ecosystem: 'Ecosistema',
      contact: 'Contáctenos',
      address: 'Centro Global de Operaciones Digitales',
      rights: 'Todos los derechos reservados',
      links: {
        assistant: 'Asistente AI',
      },
      tags: {
        usa: 'Cumplimiento EEUU',
        eu: 'Estándar UE',
        mexico: 'Cobertura Américas',
      }
    },
    command: {
      title: 'Centro de Comando AI',
      badge: 'Impulsado por IA · Navegación Global',
      welcomeTitle: 'Bienvenido al Negocio del Futuro',
      welcomeDesc: 'Huashang AI no es solo una herramienta de chat; es su cerebro de negocios global.',
      agentRecruit: 'Se Buscan Socios',
      agentDesc: 'Únete al ecosistema Huashang AI. Haz clic en el cuadro de chat para consultar detalles.',
      secure: 'Consulta de IA Segura y Privada · Ecosistema Huashang AI',
    },
    chat: {
      welcome: '¡Hola! Soy el Navegador AI de Huashang. ¿Cómo puedo ayudarte? Puedo guiarte a las secciones de Noticias, Empleos, Vivienda o Negocios.',
      placeholder: 'Consultar sobre negocios, empleos o vivienda...',
      thinking: 'Pensando...',
      error: 'Lo siento, debido al alto volumen, mi cerebro está sobrecargado. Por favor, inténtelo de nuevo más tarde.',
      header: {
        title: 'Navegador AI Huashang',
        status: 'En línea · Soporte Global',
      }
    }
  },
  id: {
    nav: {
      home: 'Beranda',
      ecosystem: 'Ekosistem',
      news: 'Berita AI',
      jobs: 'Lowongan AI',
      housing: 'Properti AI',
      business: 'Bisnis',
      market: 'Pasar',
      services: 'Layanan',
      consult: 'Konsultasi Sekarang',
    },
    hero: {
      badge: 'Tionghoa Global · Ekosistem Lokal AI',
      title: 'Huashang',
      subtitle: 'Jaringan Cerdas',
      desc: 'Melampaui iklan baris tradisional, membangun ekosistem berbasis AI yang lengkap. Mengintegrasikan berita, lowongan, properti, dan perdagangan.',
      features: {
        agent: 'AI Serba Bisa',
        news: 'Berita Cerdas',
        jobs: 'Pencocokan Presisi',
      },
      cta: {
        explore: 'Masuk ke Ekosistem',
        experience: 'Chat dengan AI',
      }
    },
    ecosystem: {
      title: 'Modul Utama Berbasis AI',
      desc: 'Meningkatkan iklan baris tradisional dengan pembelajaran mendalam untuk pengalaman pengguna yang lebih cerdas.',
      news: {
        title: 'Berita Cerdas AI',
        desc: 'Dinamika bisnis global real-time, diterjemahkan dan dianalisis oleh AI untuk dampak lokal.',
        features: ['Terjemahan Real-time', 'Penilaian Nilai', 'Peringatan Kebijakan', 'Feed Personal'],
      },
      jobs: {
        title: 'Lowongan Cerdas AI',
        desc: 'Mesin pencocokan AI berdasarkan keterampilan dan kesesuaian budaya, menghubungkan perusahaan dengan talenta.',
        features: ['Optimasi CV AI', 'Pencocokan Cerdas', 'Pencarian Lintas Batas', 'Simulasi Wawancara'],
      },
      housing: {
        title: 'Properti Cerdas AI',
        desc: 'Valuasi berbasis AI and analisis lingkungan untuk saran sewa dan jual yang presisi.',
        features: ['Valuasi AI', 'Analisis Lingkungan', 'Tur Virtual AI', 'Tinjauan Hukum'],
      },
      business: {
        title: 'Transfer Bisnis AI',
        desc: 'Valuasi AI dan uji tuntas untuk restoran dan bisnis ritel.',
        features: ['Prediksi Laba', 'Penilaian Risiko', 'Pencocokan Pembeli-Penjual', 'Panduan Transfer'],
      },
      market: {
        title: 'Pasar AI',
        desc: 'Posting otomatis berbasis gambar dan valuasi AI untuk menyaring penipuan.',
        features: ['Valuasi AI', 'Deskripsi Cerdas', 'Skor Kepercayaan', 'Sinkronisasi Logistik'],
      },
      services: {
        title: 'Layanan AI',
        desc: 'Asisten AI terintegrasi untuk kebutuhan hukum, pajak, dan terjemahan dalam kehidupan sehari-hari.',
        features: ['Saran Hukum AI', 'Pelaporan Pajak', 'Penerjemah Multibahasa', 'Panduan Lokal'],
      }
    },
    footer: {
      brand: 'Huashang AI',
      slogan: 'Agen AI untuk Perusahaan Tionghoa Global · Pemimpin dalam Peningkatan Digital',
      ecosystem: 'Ekosistem',
      contact: 'Hubungi Kami',
      address: 'Pusat Operasi Digital Global',
      rights: 'Hak cipta dilindungi undang-undang',
      links: {
        assistant: 'Asisten AI',
      },
      tags: {
        usa: 'Kepatuhan AS',
        eu: 'Standar UE',
        mexico: 'Cakupan Amerika',
      }
    },
    command: {
      title: 'Pusat Komando AI',
      badge: 'Berbasis AI · Navigasi Global',
      welcomeTitle: 'Selamat Datang di Bisnis Masa Depan',
      welcomeDesc: 'Huashang AI bukan sekadar alat obrolan; ini adalah otak bisnis global Anda.',
      agentRecruit: 'Dicari Mitra',
      agentDesc: 'Bergabunglah dengan ekosistem Huashang AI. Klik kotak obrolan untuk menanyakan detail kemitraan.',
      secure: 'Konsultasi AI Aman & Pribadi · Ekosistem Huashang AI',
    },
    chat: {
      welcome: 'Halo! Saya Navigator AI Huashang. Ada yang bisa saya bantu? Saya dapat memandu Anda ke bagian Berita, Lowongan, Properti, atau Bisnis.',
      placeholder: 'Tanya tentang bisnis, lowongan, atau properti...',
      thinking: 'Berpikir...',
      error: 'Maaf, karena volume tinggi, otak saya kewalahan. Silakan coba lagi nanti.',
      header: {
        title: 'Navigator AI Huashang',
        status: 'Online · Dukungan Global',
      }
    }
  },
};
