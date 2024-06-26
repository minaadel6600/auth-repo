
import IRequest from '../../interfaces/i-request';
import { DEFAULT_LANGUAGE } from '../constants';
import * as lang from './locales';

export const getTranslatedMessage = (req: IRequest, msgKey: keyof typeof lang.en) => {

  req.lang = req.headers.lang as keyof typeof lang || DEFAULT_LANGUAGE;
  
  // to make this field type is like language keys
  let langKey = req.lang as keyof typeof lang ;

  return lang[langKey][msgKey]
}