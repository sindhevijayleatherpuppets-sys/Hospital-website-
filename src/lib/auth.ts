import { jwtVerify, SignJWT } from 'jose';
import { cookies } from 'next/headers';
import crypto from 'crypto';

const JWT_SECRET_STRING = process.env.JWT_SECRET || 'ayurcare-dhanvanthari-hospital-jwt-secret-key-2026';
const SECRET = new TextEncoder().encode(JWT_SECRET_STRING);

/**
 * Hashes a password using scrypt with a unique cryptographically random salt.
 */
export async function hashPassword(password: string): Promise<string> {
  const salt = crypto.randomBytes(16).toString('hex');
  return new Promise((resolve, reject) => {
    crypto.scrypt(password, salt, 64, (err, derivedKey) => {
      if (err) reject(err);
      resolve(`scrypt:${salt}:${derivedKey.toString('hex')}`);
    });
  });
}

/**
 * Verifies a password against a stored hash using constant-time comparison.
 * Gracefully supports legacy plain-text passwords for smooth migration.
 */
export async function verifyPassword(password: string, storedPasswordOrHash: string): Promise<boolean> {
  if (!storedPasswordOrHash || !password) return false;

  if (storedPasswordOrHash.startsWith('scrypt:')) {
    const parts = storedPasswordOrHash.split(':');
    if (parts.length !== 3) return false;
    const salt = parts[1];
    const key = parts[2];
    const keyBuffer = Buffer.from(key, 'hex');

    return new Promise((resolve) => {
      crypto.scrypt(password, salt, 64, (err, derivedKey) => {
        if (err) return resolve(false);
        try {
          resolve(crypto.timingSafeEqual(keyBuffer, derivedKey));
        } catch {
          resolve(false);
        }
      });
    });
  }

  // Fallback constant-time check for legacy plain-text seed entries
  const bufA = Buffer.from(password);
  const bufB = Buffer.from(storedPasswordOrHash);
  if (bufA.length !== bufB.length) return false;
  return crypto.timingSafeEqual(bufA, bufB);
}

export async function createSession(userId: string, role: string) {
  const expires = new Date(Date.now() + 24 * 60 * 60 * 1000); // 1 day
  const token = await new SignJWT({ userId, role })
    .setProtectedHeader({ alg: 'HS256' })
    .setExpirationTime('1d')
    .sign(SECRET);

  const cookieStore = await cookies();
  cookieStore.set('session', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    expires,
    path: '/',
  });
}

export async function getSession() {
  const cookieStore = await cookies();
  const session = cookieStore.get('session')?.value;
  if (!session) return null;

  try {
    const { payload } = await jwtVerify(session, SECRET);
    return payload as { userId: string; role: string };
  } catch {
    return null;
  }
}

export async function clearSession() {
  const cookieStore = await cookies();
  cookieStore.delete('session');
}
