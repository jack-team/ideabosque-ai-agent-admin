const bubbleName = 'bubbleThemeConfigs';
const chatName = 'chatThemeConfigs';

const chatLabel = 'Chat agent';
const bubbleLabel = 'Bubble';

export const darkTheme = {
  [chatName]: {
    primaryColor: '#fff',
    headerBackground: '#2E2E3A',
    headerBorderColor: '#444',

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
  [bubbleName]: {
    floatBubbleBackground: '#2E2E3A',
    floatBubbleTitleTextColor: '#f2f2f2',
    floatBubbleDescTextColor: '#ccc',
    floatBubbleBorderColor: '#2E2E3A',
    floatBubbleBoxShadowColor: '#2E2E3A'
  }
}

export const configs = [
  {
    name: [bubbleName, 'floatBubbleBackground'],
    label: `${bubbleLabel} background`
  },
  {
    name: [bubbleName, 'floatBubbleBoxShadowColor'],
    label: `${bubbleLabel} shadow color`
  },
  {
    name: [bubbleName, 'floatBubbleBorderColor'],
    label: `${bubbleLabel} border color`
  },
  {
    name: [bubbleName, 'floatBubbleTitleTextColor'],
    label: `${bubbleLabel} title color`
  },
  {
    name: [bubbleName, 'floatBubbleDescTextColor'],
    label: `${bubbleLabel} secondary title color`
  },
  {
    name: [chatName, 'primaryColor'],
    label: `${chatLabel} primary color`
  },
  {
    name: [chatName, 'headerBackground'],
    label: `${chatLabel} header background`
  },
  {
    name: [chatName, 'headerTitleTextColor'],
    label: `${chatLabel} header title text color`
  },
  {
    name: [chatName, 'headerBorderColor'],
    label: `${chatLabel} header border color`
  },
  {
    name: [chatName, 'windowBackground'],
    label: `${chatLabel} window background`
  },
  {
    name: [chatName, 'welcomeTitleTextColor'],
    label: `${chatLabel} welcome title color`
  },
  {
    name: [chatName, 'welcomeSubTitleTextColor'],
    label: `${chatLabel} welcome text color`
  },
  {
    name: [chatName, 'welcomeSubTitleTextColor'],
    label: `${chatLabel} welcome text color`
  },
  {
    name: [chatName, 'bubbleBackground'],
    label: `${chatLabel} bubble background`
  },
  {
    name: [chatName, 'bubbleUserNameTextColor'],
    label: `${chatLabel} bubble user name text color`
  },
  {
    name: [chatName, 'bubbleCreateAtTextColor'],
    label: `${chatLabel} bubble create at text color`
  },
  {
    name: [chatName, 'bubbleInnerBackground'],
    label: `${chatLabel} bubble inner background`
  },
  {
    name: [chatName, 'bubbleContentTextColor'],
    label: `${chatLabel} bubble content text color`
  },
  {
    name: [chatName, 'bubbleUserBackground'],
    label: `${chatLabel} user bubble background color`
  },
  {
    name: [chatName, 'bubbleContentUserTextColor'],
    label: `${chatLabel} user bubble content text color`
  },
  {
    name: [chatName, 'senderBackground'],
    label: `${chatLabel} send background`
  },
  {
    name: [chatName, 'senderBorderColor'],
    label: `${chatLabel} send border color`
  },
  {
    name: [chatName, 'senderInputBackground'],
    label: `${chatLabel} send input background`
  },
  {
    name: [chatName, 'senderInputTextColor'],
    label: `${chatLabel} send input text color`
  },
  {
    name: [chatName, 'senderSubmitBtnBackground'],
    label: `${chatLabel} send button background`
  },
  {
    name: [chatName, 'senderSubmitBtnDisabledBackground'],
    label: `${chatLabel} send button disbaled background`
  },
];