import { Request } from "express";
// src/types/express/index.d.ts

import { User } from '../models/User';  // Adjust the path to your User model

declare global {
  namespace Express {
    interface Request {
      user?: User;  // Add the `user` property with the correct type
    }
  }
}
