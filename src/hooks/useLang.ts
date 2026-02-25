import { useTranslation } from "react-i18next";
import { useMemoizedFn } from 'ahooks';

const ns = 'lang';

export const useLang = () => {
  return useTranslation(ns);
}

export const useExists = () => {
  const { i18n } = useLang();

  const exists = useMemoizedFn((key: string) => {
    return i18n.exists(`${ns}:${key}`);
  });

  return [exists];
}