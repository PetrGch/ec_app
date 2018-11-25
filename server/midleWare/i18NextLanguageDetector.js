import i18next from "i18next";
import i18nextExpress from "i18next-express-middleware";

const i18nextLanguageDetector = i18next.use(i18nextExpress.LanguageDetector).init({
  preload: ["en", "th"],
  resources: {
    en: {
      common: require('../translations/en/common')
    },
    th: {
      common: require('../translations/th/common')
    }
  }
});

export default i18nextLanguageDetector;