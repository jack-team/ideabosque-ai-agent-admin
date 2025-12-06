import { getAiSdkStaticUrl } from '@/utils';

const bubbleName = 'bubbleUiConfigs';
const chatName = 'chatUiConfigs';

const chatLabel = 'Chat agent';
const bubbleLabel = 'Bubble';

const avatarImg = getAiSdkStaticUrl('/avatar-dark.svg');

export const darkTheme = {
  [bubbleName]: {
    avatarImg: avatarImg,
    closeImg: getAiSdkStaticUrl('/close-dark.svg'),
    sendImg: getAiSdkStaticUrl('/send-dark.svg'),
  },
  [chatName]: {
    avatar: avatarImg,
    headerIcon: avatarImg,
    welcomeImg: getAiSdkStaticUrl('/welcome-dark.svg')
  }
}

export const configs = [
  {
    name: [bubbleName, 'avatarImg'],
    label: `${bubbleLabel} Avatar`
  },
  {
    name: [bubbleName, 'sendImg'],
    label: `${bubbleLabel} open window icon`
  },
  {
    name: [bubbleName, 'closeImg'],
    label: `${chatLabel} window close icon`
  },
  {
    name: [chatName, 'avatar'],
    label: `${chatLabel} avatar`
  },
  {
    name: [chatName, 'headerIcon'],
    label: `${chatLabel} header icon`
  },
  {
    name: [chatName, 'welcomeImg'],
    label: `${chatLabel} welcome icon`
  }
];