import { getAiSdkStaticUrl } from '@/utils';
const whiteAvatar = getAiSdkStaticUrl('/avatar-white.svg');

export const DarkTheme = {
  uiVariables: {
    closeImg: getAiSdkStaticUrl('/close-white.svg')
  },
  chatUiVariables: {
    agentAvatar: whiteAvatar,
    headerIcon: whiteAvatar,
    welcomeImg: whiteAvatar,
    sendBtnDisabledIcon: getAiSdkStaticUrl('/chat-send-disabled.svg')
  },
  chatCssVariables: {
    // common
    primaryColor: '#FFFFFF',
    borderColor: '#0F0E0D',

    // antd text input
    antdInputBgColor: '#34322E',
    antdInputTextColor: '#fff',
    antdSelectArrowColor: '#9DA2AE',
    antdInputClearIconColor: '#9DA2AE',

    //antd button
    defaultButtonBgColor: 'rgba(0,0,0,0)',
    primaryButtonTextColor: '#34322E',

    // container
    agentChatContainerBgColor: '#34322E',
    contentWrpperInnerBgColor: '#1C1B19',
    contentWrpperInnerBorderWidth: 0,

    // 聊天气泡
    userBubbleTextColor: '#000',
    assistantBubbleBgColor: '#34322E',
    chatBubbleCreateAtTextColor: '#707070',

    // input 
    footerInputBgColor: '#34322E',
    footerInputPlaceholderColor: '#707070',
    footerSubmitBtnDisabledBgColor: '#1C1B19',
    footerSubmitBtnActiveBgColor: '#1C1B19'
  },
  chatOverrides: {
    googlePlace: {
      cssVariables: {
        googlePlaceContainerBgColor: '#34322E',
        googlePlaceItemBgColor: '#444',
        googlePlaceItemHoverBgColor: '#484848',
        googlePlaceItemNavIconColor: '#f0f0f0'
      }
    },
    wizardGroup: {
      cssVariables: {
        uiBlockGroupBackground: '#34322E',
        uiBlockGroupFormItemBackground: '#34322E',
        uiBlockGroupMultipleChoiceSelectAllTextColor: '#fff'
      }
    }
  }
}

export const StandardTheme = {
  uiVariables: {
    closeImg: getAiSdkStaticUrl('/close-white.svg')
  },
  chatUiVariables: {
    headerIcon: whiteAvatar
  },
  chatCssVariables: {
    // container
    agentChatContainerBgColor: '#34322E',
    //header 
    headerTitleColor: '#FFFFFF'
  },
  chatOverrides: {}
}