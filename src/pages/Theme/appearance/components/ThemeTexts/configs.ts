const bubbleName = 'bubbleUiConfigs';
const chatName = 'chatUiConfigs';

const chatLabel = 'Chat agent';
const bubbleLabel = 'Bubble';

export const configs = [
  {
    name: [bubbleName, 'title'],
    label: `${bubbleLabel} title`
  },
  {
    name: [bubbleName, 'desc'],
    label: `${bubbleLabel} subheading`
  },
  {
    name: [chatName, 'welcomeTitle'],
    label: `${chatLabel} welcome title`
  },
  {
    name: [chatName, 'welcomeDesc'],
    label: `${chatLabel} welcome subheading`
  },
  {
    name: [chatName, 'inputPlaceholder'],
    label: `${chatLabel} input placeholder`
  }
];