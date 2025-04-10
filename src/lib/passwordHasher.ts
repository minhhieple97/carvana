import crypto from 'crypto';

const SCRYPT_KEYLEN = 64;
const SCRYPT_OPTIONS: crypto.ScryptOptions = { cost: 16384, blockSize: 8, parallelization: 1 };
const HASH_ENCODING: crypto.BinaryToTextEncoding = 'hex';
const SALT_LENGTH = 16;

export const hashPassword = (password: string, salt: string): Promise<string> =>
  new Promise((resolve, reject) => {
    crypto.scrypt(password.normalize(), salt, SCRYPT_KEYLEN, SCRYPT_OPTIONS, (error, hash) => {
      if (error) {
        reject(error);
        return;
      }
      resolve(hash.toString(HASH_ENCODING).normalize());
    });
  });

export const comparePasswords = async ({
  password,
  salt,
  hashedPassword,
}: {
  password: string;
  salt: string;
  hashedPassword: string;
}): Promise<boolean> => {
  const inputHashedPassword = await hashPassword(password, salt);
  const inputBuffer = Buffer.from(inputHashedPassword, HASH_ENCODING);
  const storedBuffer = Buffer.from(hashedPassword, HASH_ENCODING);

  return crypto.timingSafeEqual(inputBuffer, storedBuffer);
};

export const generateSalt = (): string =>
  crypto.randomBytes(SALT_LENGTH).toString(HASH_ENCODING).normalize();
