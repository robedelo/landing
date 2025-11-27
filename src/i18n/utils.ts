import en from './en.json';
import es from './es.json';

export const LANGUAGES = {
    en: 'English',
    es: 'Español',
};

export const DEFAULT_LANG = 'es';

export const ui = {
    en,
    es,
};

export function getLangFromUrl(url: URL) {
    const [, lang] = url.pathname.split('/');
    if (lang in ui) return lang as keyof typeof ui;
    return DEFAULT_LANG;
}

export function useTranslations(lang: keyof typeof ui) {
    return function t(key: string) {
        const keys = key.split('.');
        let value: any = ui[lang];
        for (const k of keys) {
            if (value && value[k]) {
                value = value[k];
            } else {
                return key;
            }
        }
        return value as string;
    }
}
