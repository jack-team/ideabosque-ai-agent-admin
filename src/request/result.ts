import type { Key } from 'react';

export class ResultError {
  public readonly code: string;
  public readonly message: string;

  constructor(code: Key, message: any) {
    this.code = `${code}`;
    this.message = message;
  }
}