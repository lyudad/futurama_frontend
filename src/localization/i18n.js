import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
<<<<<<< HEAD
import resources from './resourses';
=======
import resources from './resources';
>>>>>>> develop

i18n.use(initReactI18next).init({
    resources,
    lng: 'en',
    interpolation: {
        escapeValue: false,
    },
    react: { useSuspense: false },
});

export default i18n;
