/// <reference types="vite/client" />
/// <reference types="vite-plugin-svgr/client" />

type AiChatSdkType = {
  createChat(options: Record<string, any>): Record<string, any>;
}

declare const AiChatSdk: AiChatSdkType;
