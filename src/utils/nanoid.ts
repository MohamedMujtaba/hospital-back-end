import { customAlphabet } from "nanoid";

export const createNanoid = async () => {
  const alphabet =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  const nanoid = customAlphabet(alphabet, 4);

  const id = nanoid();
  return id;
};
