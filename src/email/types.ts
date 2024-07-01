export type Response<T = Record<string, any>> = {
  success: boolean;
  status: number;
  message: string;
  body?: T;
};

export type EmailSentInfo = {
  accepted: string[];
  rejected: string[];
  ehlo: string[];
  envelopeTime: number;
  messageTime: number;
  messageSize: number;
  response: string;
  envelope: { from: string; to: string[] };
  messageId: string;
  previewUrl?: string;
};

export type EmailVerificationResult = {
  email: string;
  isEmailValid: boolean;
  isDisposable: boolean;
  isMxRecordFound: boolean;
  isSMTPConnected: boolean;
  isEmailExist: boolean;
  isCatchAll: boolean;
};
