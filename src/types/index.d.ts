export {};

declare global {
  namespace Express {
    interface Request {
      userInfo?: {
        userId?: string;
        token?: string;
        username?: string;
      };
    }
  }
}

// declare global {
//   namespace Express {
//     export interface Request {
//       userInfo?: {
//         userId?: string;
//         token?: string;
//         username?: string;
//       };

//       user: {
//         test: string;
//       };
//     }
//   }
// }
