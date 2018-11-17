import i18n from 'i18next';
import XHR from 'i18next-xhr-backend';
import LanguageDetector from 'i18next-browser-languagedetector';

const detectionOption = {
  // order and from where user language should be detected
  order: ['localStorage', 'querystring'],

  // keys or params to lookup language from
  lookupQuerystring: 'lng',
  lookupLocalStorage: 'i18nextLng',

  // cache user language on
  caches: ['localStorage'],
  excludeCacheFor: ['cimode'], // languages to not persist (cookie, localStorage)

  // optional htmlTag with lang attribute, the default is:
  htmlTag: document.documentElement
};

const backendOption = {
  loadPath: '/static/translations/{{lng}}/{{ns}}.json',
  crossDomain: false,
  withCredentials: false,
};

i18n
  .use(XHR)
  .use(LanguageDetector)
  .init({
    backend: backendOption,
    detection: detectionOption,
    debug: NODE_ENV === 'development',
    defaultNS: 'common',
    ns: 'common',
    fallbackLng: 'en',
    resources: NODE_ENV === 'development' ? {
      en: {
        common: require('./translations/en/common')
      },
      th: {
        common: require('./translations/th/common')
      }
    } : null,
    react: {
      wait: false,
      bindI18n: 'languageChanged loaded',
      bindStore: 'added removed',
      nsMode: 'default'
    }
  });

export default i18n;