import bcrypt from "bcrypt";

export const comparePassword = async function (
  providedPassword: string,
  password: string
) {
  const isMatch = await bcrypt.compare(providedPassword, password);
  return isMatch;
};
