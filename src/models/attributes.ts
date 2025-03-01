import { Optional } from "sequelize";

export interface roleModelAttributes {
	id: string;
	name: string;
}
export type roleCreationAttributes = Optional<roleModelAttributes, "id">;

export interface UserModelAttributes {
    id: string;
    userName: string;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    role: string;
    active: boolean;
    gender: string;
    birthDate: Date;
    phoneNumber: string;
    profile: string;
    address: string;
    country: string;
    city: string;
}

export interface UserModelInclude extends UserModelAttributes {
    Roles: any;
}

export type UserCreationAttributes = Optional<UserModelAttributes, "id"> & {
    role?: string;
};

export interface courseCategoryAttributes {
    id: string;
    name: string;
    description?: string;
}

export interface courseCategoryCreationAttributes extends Partial<courseCategoryAttributes> {}

export interface courseAttributes {
    id: string;
    title: string;
    description?: string;
    content: string;
    categoryId: string;
}

export interface courseCreationAttributes extends Partial<courseAttributes> {}
