
import { DEFAULT_LANGUAGE } from '../constants';
import * as lang from './locales';

export const getTranslatedMessage = (req: any, msgKey: keyof typeof lang.en) => {

  // to make this field type is like language keys
  let langKey = req.lang as keyof typeof lang || DEFAULT_LANGUAGE;

  return lang[langKey][msgKey]
}