import type { TFunction } from 'i18next';

const STATUS_KEYS = new Set(['submitted', 'published']);

export const formatPublished = (
  value: string,
  locale: string,
  t: TFunction<'pages'>,
): string => {
  const normalizedValue = value.trim();
  const normalizedKey = normalizedValue.toLowerCase();

  if (!normalizedValue) return '';

  if (STATUS_KEYS.has(normalizedKey)) {
    return t(`jobs.publishedStatus.${normalizedKey}` as const);
  }

  const date = new Date(normalizedValue);

  if (Number.isNaN(date.getTime())) {
    return normalizedValue;
  }

  const diffMs = date.getTime() - Date.now();
  const formatter = new Intl.RelativeTimeFormat(locale, { numeric: 'auto' });

  if (Math.abs(diffMs) < 60 * 1000) {
    return formatter.format(0, 'minute');
  }

  const minutes = Math.round(diffMs / (1000 * 60));
  const hours = Math.round(diffMs / (1000 * 60 * 60));
  const days = Math.round(diffMs / (1000 * 60 * 60 * 24));
  const years = Math.round(diffMs / (1000 * 60 * 60 * 24 * 365));

  if (Math.abs(minutes) < 60) {
    return formatter.format(minutes, 'minute');
  }

  if (Math.abs(hours) < 24) {
    return formatter.format(hours, 'hour');
  }

  if (Math.abs(days) < 365) {
    return formatter.format(days, 'day');
  }

  return formatter.format(years, 'year');
};
