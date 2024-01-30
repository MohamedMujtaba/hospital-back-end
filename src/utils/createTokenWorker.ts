export const createTokenUser = (user: {
  name: string;
  phoneNumber: string;
  id: string;
  role: string;
}) => {
  return {
    name: user.name,
    phoneNumber: user.phoneNumber,
    userId: user.id,
    role: user.role,
  };
};
