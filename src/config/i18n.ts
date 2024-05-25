import i18n from 'i18n';
import path from 'path';

i18n.configure({
    locales: ['en', 'pt'],
    directory: path.join(__dirname, '../locales'),
    defaultLocale: 'en',
    queryParameter: 'lang',
    api: {
        __: 'translate',
        __n: 'translateN',
    },
});

export default i18n;
