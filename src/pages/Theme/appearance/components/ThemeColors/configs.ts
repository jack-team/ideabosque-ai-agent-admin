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
    headerBackground: '#2E2E3A',
    headerBorderColor: '#444',
    headerTitleTextColor: '#edebe7',

    windowBackground: '#2E2E3A',

    // welcome
    welcomeTitleTextColor: '#f0f0f0',
    welcomeSubTitleTextColor: '#ccc',

    // bubble
    bubbleBackground: '#fff',
    bubbleInnerBackground: 'transparent',
    bubbleContentTextColor: '#2E2E3A',
    bubbleUserBackground: '#f0f0f0',
    bubbleContentUserTextColor: '#2E2E3A',

    // sender
    senderBackground: '#2E2E3A',
    senderBorderColor: '#444',
    senderInputBackground: '#484848',
    senderInputTextColor: '#fff',
    senderSubmitBtnBackground: '#fff',
    senderSubmitBtnDisabledBackground: '#888',
  },
  cssVariables: {
    floatBubbleBackground: '#2E2E3A',
    floatBubbleTitleTextColor: '#f2f2f2',
    floatBubbleDescTextColor: '#ccc',
    floatBubbleBorderColor: '#2E2E3A',
    floatBubbleBoxShadowColor: '#2E2E3A'
  }
}