export interface UserResponse {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  activo: boolean;
  email_verified_at: string;
}

export interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  activo: boolean;
  emailVerifiedAt: string;
}
