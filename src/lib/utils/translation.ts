const SUPPORTED_TRANSLATION_LANGUAGES = new Set([
  'en',
  'vi',
  'zh',
  'th',
  'id',
  'mn',
  'uz',
  'ne',
  'ru',
  'tl',
]);

export const resolveTranslationLanguage = (language?: string) => {
  const normalizedLanguage = language?.toLowerCase().split('-')[0];

  if (
    normalizedLanguage &&
    SUPPORTED_TRANSLATION_LANGUAGES.has(normalizedLanguage)
  ) {
    return normalizedLanguage;
  }

  return undefined;
};
