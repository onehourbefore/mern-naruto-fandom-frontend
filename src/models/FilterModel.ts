import { StatusModel } from "./StatusModel"
import { PostType } from "./PostModel"

export interface FilterState {
    list: [] | PostType [],
    tags: [] | string [],
    fetchStatus: StatusModel,
    searchStatus: StatusModel
};