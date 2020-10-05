import {ChatMessage} from './chat-message';

export interface Conversation {
  firstParticipantLinkName: string;
  firstParticipantDisplayName: string;
  firstParticipantProfileImageLink: string;
  secondParticipantLinkName: string;
  secondParticipantDisplayName: string;
  secondParticipantProfileImageLink: string;
  lastMessage: ChatMessage;
}
