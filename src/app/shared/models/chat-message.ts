import {Identifiable} from './identifiable';

export interface ChatMessage extends Identifiable<number> {
  content: string;
  senderLinkName: string;
  recipientLinkName: string;
  sentAt: string;
}
