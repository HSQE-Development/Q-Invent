import { UserResponse, User } from "./user.model";

export interface AuthResponse {
  access_token: string;
  token_type: string;
  expires_in: number;
  user: UserResponse;
}

export interface Auth {
  accesToken: string;
  tokenType: string;
  expiresIn: number;
  user: User;
}
