export interface User {
    id: string,
    name: string,
    phone: string,
    address: string
}

export type Client = User & {
    password: string;
}

export type ClientRegister = Omit<Client, "id"> & {
    password2: string
}