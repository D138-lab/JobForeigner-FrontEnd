const NUMBER_ONLY_REGEX = /[^0-9]/g;
const PHONE_NUMBER_FORMAT_REGEX =
  /(^02.{0}|^01.{1}|[0-9]{3,4})([0-9]{3,4})([0-9]{4})/;

const formatToHyphenatedNumber = (
  _: string,
  prefix: string,
  middle: string,
  suffix: string,
) => `${prefix}-${middle}-${suffix}`;

export const formatPhoneNumber = (value: string) => {
  return value
    .replace(NUMBER_ONLY_REGEX, '')
    .replace(PHONE_NUMBER_FORMAT_REGEX, formatToHyphenatedNumber);
};

export const formatOnlyNumber = (value: string) => {
  return value.replace(NUMBER_ONLY_REGEX, '');
};
