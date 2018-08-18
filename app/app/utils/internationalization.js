import I18n, { getLanguages } from 'react-native-i18n';

I18n.fallbacks = true;
I18n.locale = 'en'; // TODO: on language input setting, set into realm and get value on init

I18n.translations = {
    en: {
        locale: `Default Locale: ${I18n.currentLocale()}`,
    },
    zn: {
        locale: `初始语言: ${I18n.currentLocale()}`,
    },
};

// get user preferred locales
// getLanguages().then((languages) => {
//     console.log(languages); // ['en-US', 'en']
// });

export default I18n;
