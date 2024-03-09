import bcrypt from "bcrypt";

export const generatePasswordHashSalt = async (salt: number) =>
  await bcrypt.genSalt(salt);

export const generatePasswordHash = async (
  password: string,
  passwordHashSalt: string
) => await bcrypt.hash(password, passwordHashSalt);
