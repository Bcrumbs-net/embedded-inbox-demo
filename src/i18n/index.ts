import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import Backend from 'i18next-http-backend';

export const LOCAL_STORAGE_I18N_STRING = 'I18N_SELECTION';

const systemDefaultLang = 'en';
const init = ({
  version,
  customPath,
}: {
  version?: string;
  customPath?: string;
}) => {
  const currentLng =
    localStorage.getItem(LOCAL_STORAGE_I18N_STRING) || systemDefaultLang;

  i18n
    .use(Backend) // load translation using http
    .use(initReactI18next) // passes i18n down to react-i18next
    .init({
      lng: currentLng,
      fallbackLng: systemDefaultLang,
      ns: ['common', 'inbox'], // define your namespaces
      defaultNS: 'common',
      interpolation: {
        escapeValue: false,
      },
      load: 'languageOnly',
      backend: {
        loadPath: customPath
          ? customPath
          : `/assets/{{lng}}/{{ns}}.json?v=${version ?? ''}`,
      },
    });
};

const changeLang = (lang: Languages) => {
  localStorage.setItem(LOCAL_STORAGE_I18N_STRING, lang);
  i18n.changeLanguage(lang);
};

const getLang = () => {
  return localStorage.getItem(LOCAL_STORAGE_I18N_STRING) ?? systemDefaultLang;
};

export const LangService = {
  init,
  changeLang,
  getLang,
};

export enum Languages {
  EN = 'en',
  AR = 'ar'
}
