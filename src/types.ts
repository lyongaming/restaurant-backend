export interface User {
    id: string,
    fname: string,
    lname: string,
    address: string,
    phone: string,
    password: string,
    email: string
}

export type UserRegister = Omit<User & {
    confirmPass: string
}, "id">

export type UserLogin = Pick<User, "email" | "password">;

export enum Role {
    employee = "employee",
    admin = "admin"
}

export type Employee = User & {
    role: Role,
    position: string
}