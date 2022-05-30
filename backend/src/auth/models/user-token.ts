export interface UserToken {
  access_token: string;
  userData: {
    id: string;
    name: string;
    email: string;
    role: string;
  };
}
