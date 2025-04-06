import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import dotenv from "dotenv";
import {User} from "../models/user";
import {Role} from "../models/role";

dotenv.config();

interface AuthRequest extends Request {
    user?: any;
}

export const isAdmin = async (req: AuthRequest, res: Response, next: NextFunction) => {
    try{
        const token = req.cookies.token;
        // const token = req.header("Authorization")?.split(" ")[1];

        if(!token) {
            res.status(401).json({ message: "No token, authorization denied" });
            return;
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as {id: string};
        const user = await User.findByPk(decoded.id);
    

        if (!user) {
            res.status(403).json({ message: "Access denied"});
            return;
        }

        const userRole = await Role.findByPk(user.role);

        if (userRole?.name !== "Admin") {
            res.status(403).json({ message: "Access denied, FORBIDDEN"});
            return;
        }

        req.user = user;
        next();

    }catch(error) {
        res.status(401).json({message: "something went wrong", error});
        return;
    }
};


export const authenticateUser = async (req: Request, res: Response, next: NextFunction) => {
    const token = req.cookies.token;
    // const token = req.header("Authorization")?.split(" ")[1];
    if (!token) {
      res.status(401).json({ message: "Unauthorized, login" });
      return;
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET as string);

        if (!decoded) {
          res.status(401).json({ message: "Unauthorized, login" });
          return;
        }
        next();
    } catch (error) {
        res.status(405).json({ message: "Something went wrong"});
        return;
    }
};

export const isAuthenticated = async (req: Request, res: Response, next: NextFunction) => {
  const token = req.cookies.token;
  // const token = req.header("Authorization")?.split(" ")[1];
  if (!token) {
    res.status(401).json({ message: "Unauthorized, login" });
    return;
  }

  try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET as string);

      if (!decoded) {
        res.status(401).json({ message: "Unauthorized, login" });
        return;
      }

      res.json({ authenticated: true, user: decoded, token: token });
      return;

  } catch (error) {
      res.status(405).json({ message: "Something went wrong"});
      return;
  }
};

export const checkRole = (allowedRoles: string[]) => {
     return async (req: AuthRequest, res: Response, next: NextFunction) => {
      try {
        const userId = req.user?.id;
        if (!userId) {
          res.status(401).json({ success: false, message: "Unauthorized" });
          return;
        }
  
        const user = await User.findByPk(userId);
        if (!user) {
          res.status(401).json({ success: false, message: "User not found" });
          return;
        }
  
        if (!allowedRoles.includes(user.role)) {
          res.status(403).json({ success: false, message: "Forbidden: Insufficient permissions" });
          return;
        }
  
        next();
      } catch (error) {
        res.status(500).json({ success: false, message: "Server error" });
        return;
      }
    };
  };
  