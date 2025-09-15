import _ from 'lodash';

export function extractDomain(originalUrl: string): string {
  const url = new URL(originalUrl);

  return url.hostname;
}

const chars =
  'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'.split('');

export function generateCode(): string {
  return _.sampleSize(chars, 6).join('');
}
