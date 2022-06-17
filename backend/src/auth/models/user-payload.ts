export interface UserPayload {
  sub: string;
  email: string;
  name: string;
  tenantId: string;
  iat?: number;
  exp?: number;
}
