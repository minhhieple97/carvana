import crypto from 'crypto';

export const hashPassword = (password: string, salt: string): Promise<string> =>
  new Promise((resolve, reject) => {
    crypto.scrypt(password.normalize(), salt, 64, (error, hash) => {
      if (error) reject(error);

      resolve(hash.toString('hex').normalize());
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
}) => {
  const inputHashedPassword = await hashPassword(password, salt);

  return crypto.timingSafeEqual(
    Buffer.from(inputHashedPassword, 'hex'),
    Buffer.from(hashedPassword, 'hex')
  );
};

export const generateSalt = () => crypto.randomBytes(16).toString('hex').normalize();
