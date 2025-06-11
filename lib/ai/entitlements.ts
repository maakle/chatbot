import type { ChatModel } from './models';

interface Entitlements {
  maxMessagesPerDay: number;
  availableChatModelIds: Array<ChatModel['id']>;
}

export const entitlements: Entitlements = {
  /*
   * For users with an account
   */
  maxMessagesPerDay: 100,
  availableChatModelIds: ['chat-model', 'chat-model-reasoning'],
  /*
   * TODO: For users with an account and a paid membership
   */
};
