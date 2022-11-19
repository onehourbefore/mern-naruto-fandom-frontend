import { StatusModel } from "./StatusModel"

export type RegistrationFormType = {
    email: string,
    password: string,
    name: string,
    secret: string,
    avatar: string | Blob
}

export interface RegistrationState {
    status: StatusModel
}