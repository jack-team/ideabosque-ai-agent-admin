export type InputParams = {
  userName: string;
  password: string;

}

export type SignUpParams = InputParams & {
  firstName: string;
  lastName: string;
}

export type ConfirmSignUpParams = {
  code: string;
  userName: string;
}

export type RefreshTokenPrams = {
  userName: string;
  refreshToken: string;
}