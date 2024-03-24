// LocalizationContext.js
import React from 'react';
import * as Localization from 'expo-localization';
import en from './en.json'; // 英语语言包
import zh from './zh.json'; // 中文语言包

const LocalizationContext = React.createContext();
const translations = {
  "en":en,
  "zh-CN":zh
}
export function LocalizationProvider({ children }) {
  const [locale, setLocale] = React.useState(Localization.locale);
  const localizationContextValue = React.useMemo(
    () => ({
      locale,
      translations: translations[locale] || translations.en,
      setLocale,
    }),
    [locale]
  );

  return (
    <LocalizationContext.Provider value={localizationContextValue}>
      {children}
    </LocalizationContext.Provider>
  );
}

export default LocalizationContext;