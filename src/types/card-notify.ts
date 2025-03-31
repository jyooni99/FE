export type RequestMessage = {
  requesterUser: {
    id: number;
    username: string;
    password?: string;
    chatRoom: null;
    authorities: [{ authority: 'ROLE_USER' }];
    enabled: boolean;
    accountNonExpired: boolean;
    credentialsNonExpired: boolean;
    accountNonLocked: boolean;
  };
  requesterId: number;
  receiverId: number;
  messageType: 'request';
  message: string;
  subMessage?: string;
  timeStamp?: number;
  className?: string;
};

export type AcceptMessage = {
  messageType: 'accept';
  message: string;
  subMessage?: string;
  chatRoomId: number;
  timeStamp?: number;
};

export type RejectMessage = {
  messageType: 'reject';
  message: string;
  subMessage?: string;
  timeStamp?: number;
};

export type ChatMessage = RequestMessage | AcceptMessage | RejectMessage;
