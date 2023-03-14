export interface Role {
    value: string,
    viewValue: string
}

export interface Team {
    value: string,
    viewValue: string
}

export interface User {
    name: string;
    gender: string;
    team: string;
    reading: boolean;
    swimming: boolean;
    cooking: boolean;
    dob: Date;
    createdAt: Date;
    deleted?: boolean;
    description?: string,
    hobbies: string[];
}

export interface UserForm {
    name: string,
    email: string,
    password: string,
    cpassword: string,
    gender: string,
    teamselect: string,
    roleselect: string,
    picker: string,
    description: string,
    reading: boolean,
    swimming: boolean,
    cooking: boolean

}