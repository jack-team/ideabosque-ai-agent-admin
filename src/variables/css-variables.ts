import { hexToRgba } from '@/utils';

export const primaryColor = '#303030'

export const cssVariables = {
  primaryColor,
  borderColor: '#8A8A8A',
  loadingColor: hexToRgba(primaryColor, .6)
}