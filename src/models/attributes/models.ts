import {Optional} from 'sequelize'

export interface UserModel {
    id: string;
	userName: string;
	firstName: string;
	lastName: string;
	email: string;
	password: string;
	confirmPassword: string;
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

export interface UserModelInclude extends UserModel {
	Roles: any;
}

export type UserCreationAttributes = Optional<
	UserModel,
	"id" | "createdAt" | "updatedAt"
> & {
	role?: string;
	firstName?: string;
	lastName?: string;
	gender?: string;
	birthDate?: Date;
	phoneNumber?: string;
	profile?: string;
	address?: string;
	country?: string;
	city?: string;
};