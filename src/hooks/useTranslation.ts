import { useState, useEffect } from 'react';
import { translations, Language } from '../i18n/translations';

export function useTranslation() {
  const [lang, setLang] = useState<Language>('zh');

  useEffect(() => {
    const browserLang = navigator.language.split('-')[0];
    if (['zh', 'en', 'es', 'id'].includes(browserLang)) {
      setLang(browserLang as Language);
    } else {
      setLang('en'); // Default to English for other languages
    }
  }, []);

  const t = translations[lang];

  return { t, lang };
}
