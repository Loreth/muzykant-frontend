import {ChatMessage} from './chat-message';

export interface Conversation {
  firstParticipantLinkName: string;
  firstParticipantProfileImageLink: string;
  secondParticipantLinkName: string;
  secondParticipantProfileImageLink: string;
  lastMessage: ChatMessage;
}
