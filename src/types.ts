export interface User {
    id: string,
    fname: string,
    lname: string,
    address: string,
    phone: string,
    pass: string,
    email: string
}

export type UserRegister = Omit<User & {
    confirmPass: string
}, "id">

export type UserLogin = Pick<User, "email" | "pass">;

export enum Role {
    employee = "employee",
    admin = "admin"
}

export type Employee = User & {
    role: Role,
    position: string
}