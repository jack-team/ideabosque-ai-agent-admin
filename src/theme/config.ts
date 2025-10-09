import type { ThemeConfig } from 'antd';
import { primaryColor, borderColor } from './colors';

export const themeConfigs: ThemeConfig = {
  token: {
    colorLink: primaryColor,
    colorPrimary: primaryColor,
    colorBgContainer: '#fff',
  },
  components: {
    Input: {
      borderRadius: 8,
      colorBorder: borderColor,
      colorTextDisabled: '#D1D5DB',
      colorBgContainerDisabled: 'transparent'
    },
    Select: {
      borderRadius: 8,
      colorBorder: borderColor,
      multipleItemBg: '#E3E3E3',
      colorTextDisabled: '#D1D5DB',
      multipleSelectorBgDisabled: '#333',
      colorBgContainerDisabled: 'transparent',
      multipleItemColorDisabled: primaryColor,
      optionSelectedColor: '#fff'
    },
    Form: {
      labelFontSize: 13,
      labelColor: '#303030'
    }
  }
};