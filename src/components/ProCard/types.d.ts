import type { ReactElement } from 'react';

type Element = ReactElement | null | false;

export type ProCardProps = {
  title?: string;
  subTitle?: string;
  extra?: Element;
  hasTitleUnderLine?: boolean;
  children?: Element | Element[];
}