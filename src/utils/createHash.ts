import bcrypt from "bcrypt";
import { createHash } from "crypto";

export const hashString = async (string: string) => {
  const salt = await bcrypt.genSalt(10);
  const password = await bcrypt.hash(string, salt);
  return password;
};
