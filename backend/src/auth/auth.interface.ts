export interface ISignInAnswer {
  accessToken: string;
  refreshToken: string;
}

export interface IGenerateTokensReturn {
  accessToken: string;
  refreshToken: string;
}

export interface IJwtPayload {
  userId: string;
  iat: string;
  exp: string;
}

export interface IExtendedRequest extends Request {
  payload: IJwtPayload;
}
