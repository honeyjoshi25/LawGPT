import i18n from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import { initReactI18next } from "react-i18next";
import HttpApi from "i18next-http-backend";

i18n
  .use(HttpApi)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    supportedLngs: ["en", "ar"],
    fallbackLng: "en",
    detection: {
      order: ["querystring", "cookie"],
      caches: ["cookie"],
    },
    backend: {
      // The path to load the translation files
      loadPath: "/locales/{{lng}}/{{ns}}.json",
    },
    ns: [
      "common",
      "home",
      "company",  
      "resources",
      "aboutus",
      "faq",
      "login",
      "signup",
      "forgotpass",
      "privacy_policy",
    ],
    defaultNS: "common",
    react: {
      useSuspense: false,
    },
  });
