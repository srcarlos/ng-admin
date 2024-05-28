// everything basic about the user
export interface IUser {
  id: string;
  email: string;
  name?: string;

  fullName?: string;
  username?: string;
  status?: string;
  role?: string;
  password?: string;
}
