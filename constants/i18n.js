// i18n.js
import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';
import * as Localization from 'expo-localization';

i18next.use(initReactI18next)
  .init({
    compatibilityJSON: 'v3',
    lng: Localization.locale.startsWith('ar') ? 'ar' : 'en', // Set initial language
    fallbackLng: 'en',
    resources: {
      en: {
        translation: {
          welcome: "Welcome",
        },
      },
      ar: {
        translation: {
          welcome: "أهلا وسهلا",
        },
      },
    },
    interpolation: {
      escapeValue: false, // React handles escaping
  },
  });

export default i18next;
