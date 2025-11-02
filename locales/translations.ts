import { fr } from './fr';
import { en } from './en';
import { nl } from './nl';
import { de } from './de';

export const translations = {
  fr,
  en,
  nl,
  de,
};

export type TranslationKey = keyof typeof fr;
