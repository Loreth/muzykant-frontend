import {InjectableRxStompConfig} from '@stomp/ng2-stompjs';
import {environment} from '../../environments/environment';

export const rxStompConfig: InjectableRxStompConfig = {
  brokerURL: `${environment.wsProtocol}${environment.apiDomain}/websocket`,

  // Interval in milliseconds, set to 0 to disable
  heartbeatIncoming: 0,
  heartbeatOutgoing: 20000,

  reconnectDelay: 500,
};
