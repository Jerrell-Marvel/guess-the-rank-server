export {};
declare global {
  namespace Express {
    export interface Request {
      userInfo?: {
        userId?: string;
        token?: string;
      };
    }
  }
}
