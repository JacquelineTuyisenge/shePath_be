import { Optional } from "sequelize";

export interface UserModel {
    id: string;
    userName: string;
    firstName: string;
    lastName: string;
    email: string;
    password?: string;
    role: string;
    active?: boolean;
    createdAt?: Date;
    updatedAt?: Date;
    gender?: string;
    birthDate?: Date;
    phoneNumber?: string;
    profile?: string;
    address?: string;
    country?: string;
    city?: string;
}

// Used when creating a new user (Optional fields for creation)
export type UserCreationAttributes = Optional<
    UserModel,
    "id" | "createdAt" | "updatedAt"
> & {
    confirmPassword?: string; // Only needed during input validation, not stored in DB
};
