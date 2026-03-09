import {
  AuthFlowType,
  SignUpCommand,
  InitiateAuthCommand,
  ConfirmSignUpCommand,
  CognitoIdentityProviderClient,
  ResendConfirmationCodeCommand
} from '@aws-sdk/client-cognito-identity-provider';
import { fromCognitoIdentityPool } from '@aws-sdk/credential-providers';

import { generateHash } from './helper';
import { region, clientId, identityPoolId } from './config';
import type { InputParams, ConfirmSignUpParams, RefreshTokenPrams, SignUpParams } from './types';

const client = new CognitoIdentityProviderClient({
  region: region,
  credentials: fromCognitoIdentityPool({
    clientConfig: { region: region },
    identityPoolId: identityPoolId
  })
});

// 注册
export const signUp = async (params: SignUpParams) => {
  const { userName, password } = params;

  const command = new SignUpCommand({
    ClientId: clientId,
    Username: userName,
    Password: password,
    SecretHash: generateHash(userName, clientId),
    UserAttributes: [
      {
        Name: "email",
        Value: userName
      },
      {
        Name: "given_name",
        Value: params.firstName
      },
      {
        Name: "family_name",
        Value: params.lastName
      }
    ]
  });

  return client.send(command);
}

// 注册确认
export const confirmSignUp = (params: ConfirmSignUpParams) => {
  const { userName, code } = params;

  const command = new ConfirmSignUpCommand({
    ClientId: clientId,
    Username: userName,
    ConfirmationCode: code,
    SecretHash: generateHash(userName, clientId)
  });

  return client.send(command);
};

// 登录
export const signIn = async (params: InputParams) => {
  const { userName, password } = params;

  const command = new InitiateAuthCommand({
    AuthFlow: AuthFlowType.USER_PASSWORD_AUTH,
    AuthParameters: {
      USERNAME: userName,
      PASSWORD: password,
      SECRET_HASH: generateHash(userName, clientId)
    },
    ClientId: clientId,
  });

  const result = await client.send(command);
  const auth = result.AuthenticationResult!;
  const expiresIn = auth.ExpiresIn!;
  const expiresAt = expiresIn * 1000 + Date.now();

  return {
    expiresAt,
    userName,
    accessToken: auth.IdToken!,
    refreshToken: auth.RefreshToken!
  }
}

// 刷新token
export const refreshToken = async (params: RefreshTokenPrams) => {
  const { userName, refreshToken } = params;
  const command = new InitiateAuthCommand({
    AuthFlow: AuthFlowType.REFRESH_TOKEN,
    AuthParameters: {
      REFRESH_TOKEN: refreshToken,
      SECRET_HASH: generateHash(userName, clientId)
    },
    ClientId: clientId,
  });

  const result = await client.send(command);
  const auth = result.AuthenticationResult!;
  const expiresIn = auth.ExpiresIn!;
  const expiresAt = expiresIn * 1000 + Date.now();

  return {
    expiresAt,
    userName,
    accessToken: auth.IdToken!,
    refreshToken: auth.RefreshToken!
  }
}

// 重发验证码
export const resendConfirmationCode = (username: string) => {
  const command = new ResendConfirmationCodeCommand({
    ClientId: clientId,
    Username: username,
    SecretHash: generateHash(username, clientId)
  });

  return client.send(command);
};
