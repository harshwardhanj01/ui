import crypto from 'crypto';

export function generateToken() {
  return crypto.randomBytes(20).toString('hex');
}