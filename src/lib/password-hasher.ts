const encoder = new TextEncoder();

export const hashPassword = async (password: string, salt: string): Promise<string> => {
  const data = encoder.encode(password.normalize() + salt);
  const hash = await crypto.subtle.digest('SHA-256', data);
  return Array.from(new Uint8Array(hash))
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('');
};

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
  return inputHashedPassword === hashedPassword;
};

export const generateSalt = (): string => {
  const array = new Uint8Array(16);
  crypto.getRandomValues(array);
  return Array.from(array)
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('');
};
