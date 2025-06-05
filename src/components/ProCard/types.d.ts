import type { ReactElement } from 'react';

type Element = ReactElement | null | false;

export type ProCardProps = {
  title?: string;
  subTitle?: string;
  ext?: Element;
  children?: Element | Element[];
}