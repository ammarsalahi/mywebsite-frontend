import React, { useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { langSelector } from '../states/Selectors';
import { useTranslation } from 'react-i18next';

const LanguageSync: React.FC = () => {
  const [lang, setLang] = useRecoilState(langSelector);
  const { t, i18n } = useTranslation();
  
  useEffect(() => {
    if (lang) {
      i18n.changeLanguage(lang); // Change the language in i18next
    }
  }, [lang]);

  return null; // This component only syncs language
};

export default LanguageSync;