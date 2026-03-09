import CryptoJS from 'crypto-js';

export function generateHash(acnt: string, clientId: string) {
  const secret = import.meta.env.ENV_AWS_CLIENT_SECRET;
  const hmac = CryptoJS.HmacSHA256(acnt + clientId, secret);
  return CryptoJS.enc.Base64.stringify(hmac);
}