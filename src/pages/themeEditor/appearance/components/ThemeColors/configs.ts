import { getAiSdkStaticUrl } from '@/utils';

const avatarImg = getAiSdkStaticUrl('/avatar-dark.svg');

export const DarkTheme = {
  uiVariables: {
    avatarImg: avatarImg,
    closeImg: getAiSdkStaticUrl('/close-dark.svg'),
    sendImg: getAiSdkStaticUrl('/send-dark.svg'),
  },
  chatUiVariables: {
    avatar: avatarImg,
    headerIcon: avatarImg,
    welcomeImg: getAiSdkStaticUrl('/welcome-dark.svg')
  },
  chatCssVariables: {
    primaryColor: '#fff',
    headerBgColor: '#2E2E3A',
    headerBorderColor: '#444',
    headerTitleTextColor: '#edebe7',
    contentBgColor: '#2E2E3A',

    // welcome
    welcomeTitleTextColor: '#f0f0f0',
    welcomeSubTitleTextColor: '#ccc',

    // bubble
    userBubbleBgColor: '#f0f0f0',
    userBubbleTextColor: '#2E2E3A',
    assistantBubbleBgColor: '#fff',
    assistantBubbleTextColor: '#2E2E3A',
    agentNameColor: '#aaa',

    // sender
    footerBgColor: '#2E2E3A',
    footerBorderColor: '#444',
    footerInputBgColor: '#484848',
    footerInputBorderColor: '#444',
    footerSubmitBtnActiveBgColor: '#fff',
    footerSubmitBtnDisabledBgColor: '#888',
  },
  cssVariables: {
    floatBubbleBackground: '#2E2E3A',
    floatBubbleTitleTextColor: '#f2f2f2',
    floatBubbleSubTitleTextColor: '#ccc',
    floatBubbleBorderColor: '#2E2E3A',
    floatBubbleBoxShadowColor: '#2E2E3A'
  }
}