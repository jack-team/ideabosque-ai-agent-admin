import { getAiSdkStaticUrl } from '@/utils';

export const BubbleName = 'uiVariables';
export const ChatName = 'chatUiVariables';

const avatarImg = getAiSdkStaticUrl('/avatar-dark.svg');

export const DarkTheme = {
  [BubbleName]: {
    avatarImg: avatarImg,
    closeImg: getAiSdkStaticUrl('/close-dark.svg'),
    sendImg: getAiSdkStaticUrl('/send-dark.svg'),
  },
  [ChatName]: {
    avatar: avatarImg,
    headerIcon: avatarImg,
    welcomeImg: getAiSdkStaticUrl('/welcome-dark.svg')
  }
}