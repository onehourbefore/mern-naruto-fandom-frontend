import { StatusModel } from "./StatusModel"

export type UserDataType = {
    id: string,
    email: string,
    name: string,
    role: string,
    avatar: string,
    created: number,
    liked: string [] | []
}

export type ResponseType = {
    accessToken: string,
    refreshToken: string,
    user: UserDataType
}

export interface AuthorizationState {
    user: UserDataType,
    status: StatusModel,
    deleteProfileStatus: StatusModel
}