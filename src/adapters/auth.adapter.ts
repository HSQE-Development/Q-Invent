import { Auth, AuthResponse } from "@/models";
import { createAdaptedUser } from "./user.adapter";

export const createAdaptedAuthUser = (auth: AuthResponse): Auth => {
  const adaptedAuthUser: Auth = {
    accesToken: auth.access_token,
    tokenType: auth.token_type,
    expiresIn: auth.expires_in,
    user: createAdaptedUser(auth.user),
  };
  return adaptedAuthUser;
};
