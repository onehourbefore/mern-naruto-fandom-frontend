import { StatusModel } from "./StatusModel"

export type ExpertType = {
    avatar: string,
    email: string,
    name: string,
    created: number
}


export interface ExpertsState {
    experts: [] | ExpertType [],
    status: StatusModel
}