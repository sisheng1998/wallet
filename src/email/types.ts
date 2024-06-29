export type Response<T = Record<string, any>> = {
  success: boolean;
  status: number;
  message: string;
  body?: T;
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
