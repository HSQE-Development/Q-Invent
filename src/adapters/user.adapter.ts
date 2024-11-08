import { User, UserResponse } from "@/models";

export const createAdaptedUser = (user: UserResponse): User => {
  const adaptedUser: User = {
    id: user.id,
    firstName: user.first_name,
    lastName: user.last_name,
    email: user.email,
    activo: user.activo,
    emailVerifiedAt: user.email_verified_at,
  };

  return adaptedUser;
};
