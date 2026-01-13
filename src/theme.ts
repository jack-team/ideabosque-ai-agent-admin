import { type ThemeConfig } from 'antd';
import { cssVariables } from '@/variables/css-variables';
import { hexToRgba } from '@/utils';

export const themeConfigs: ThemeConfig = {
  token: {
    colorLink: cssVariables.primaryColor,
    colorPrimary: cssVariables.primaryColor,
    colorBgContainer: '#fff',
    colorBorder: cssVariables.borderColor
  },
  components: {
    Input: {
      borderRadius: 8,
      colorBorder: cssVariables.borderColor,
      colorTextDisabled: '#D1D5DB',
      colorBgContainerDisabled: 'transparent'
    },
    Select: {
      borderRadius: 8,
      colorBorder: cssVariables.borderColor,
      multipleItemBg: '#E3E3E3',
      colorTextDisabled: '#aaa',
      multipleSelectorBgDisabled: '#333',
      colorBgContainerDisabled: 'transparent',
      multipleItemColorDisabled: cssVariables.primaryColor,
      optionSelectedBg: hexToRgba(cssVariables.primaryColor, .2),
    },
    Form: {
      labelFontSize: 13,
      labelColor: '#303030'
    }
  }
}