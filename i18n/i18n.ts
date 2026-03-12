import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import enCommon from '../locales/en/common.json';
import enMainPage from '../locales/en/mainPage.json';
import enPages from '../locales/en/pages.json';
import idCommon from '../locales/id/common.json';
import idMainPage from '../locales/id/mainPage.json';
import idPages from '../locales/id/pages.json';
import koCommon from '../locales/ko/common.json';
import koMainPage from '../locales/ko/mainPage.json';
import koPages from '../locales/ko/pages.json';
import neCommon from '../locales/ne/common.json';
import neMainPage from '../locales/ne/mainPage.json';
import nePages from '../locales/ne/pages.json';
import thCommon from '../locales/th/common.json';
import thMainPage from '../locales/th/mainPage.json';
import thPages from '../locales/th/pages.json';
import uzCommon from '../locales/uz/common.json';
import uzMainPage from '../locales/uz/mainPage.json';
import uzPages from '../locales/uz/pages.json';
import viCommon from '../locales/vi/common.json';
import viMainPage from '../locales/vi/mainPage.json';
import viPages from '../locales/vi/pages.json';
import zhCommon from '../locales/zh/common.json';
import zhMainPage from '../locales/zh/mainPage.json';
import zhPages from '../locales/zh/pages.json';

const resources = {
  en: {
    common: enCommon,
    mainPage: enMainPage,
    pages: enPages,
  },
  ko: {
    common: koCommon,
    mainPage: koMainPage,
    pages: koPages,
  },
  vi: {
    common: viCommon,
    mainPage: viMainPage,
    pages: viPages,
  },
  zh: {
    common: zhCommon,
    mainPage: zhMainPage,
    pages: zhPages,
  },
  th: {
    common: thCommon,
    mainPage: thMainPage,
    pages: thPages,
  },
  uz: {
    common: uzCommon,
    mainPage: uzMainPage,
    pages: uzPages,
  },
  id: {
    common: idCommon,
    mainPage: idMainPage,
    pages: idPages,
  },
  ne: {
    common: neCommon,
    mainPage: neMainPage,
    pages: nePages,
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: 'ko',
  fallbackLng: 'en',
  ns: ['common', 'mainPage', 'pages'],
  defaultNS: 'common',
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
