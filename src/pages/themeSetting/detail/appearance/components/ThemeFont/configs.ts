const bubbleName = 'bubbleThemeConfigs';
const chatName = 'chatThemeConfigs';

const chatLabel = 'Chat agent';
const bubbleLabel = 'Bubble';

export const initFormData = {
  [bubbleName]: {
    floatBubbleTitleTextFontSize: 14,
    floatBubbleDescTextFontSize: 16
  },
  [chatName]: {
    headerTitleTextFontSize: 20,
    welcomeTitleTextFontSize: 44,
    welcomeSubTitleTextFontSize: 34,
    bubbleUserNameTextFontSize: 16,
    bubbleContentTextFontSize: 16,
    bubbleCreateAtTextFontSize: 12
  }
}

export const configs = [
  {
    name: [bubbleName, 'floatBubbleTitleTextFontSize'],
    label: `${bubbleLabel} title font size`
  },
  {
    name: [bubbleName, 'floatBubbleDescTextFontSize'],
    label: `${bubbleLabel} subheading font size`
  },
  {
    name: [chatName, 'headerTitleTextFontSize'],
    label: `${chatLabel} header title font size`
  },
  {
    name: [chatName, 'welcomeTitleTextFontSize'],
    label: `${chatLabel} welcome title font size`
  },
  {
    name: [chatName, 'welcomeSubTitleTextFontSize'],
    label: `${chatLabel} welcome subheading font size`
  },
  {
    name: [chatName, 'bubbleUserNameTextFontSize'],
    label: `${chatLabel} assistant name font size `
  },
  {
    name: [chatName, 'bubbleContentTextFontSize'],
    label: `${chatLabel} bubble text font size`
  },
   {
    name: [chatName, 'bubbleCreateAtTextFontSize'],
    label: `${chatLabel} bubble create at font size`
  }
];