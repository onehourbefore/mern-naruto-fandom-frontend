import { StatusModel } from "./StatusModel"

export type CommentType = {
    _id: string,
    postID: string,
    date: string,
    name: string,
    email: string,
    body: string,
    avatar: string,
}

export interface CommentsState {
    comments: [] | CommentType [],
    status: StatusModel,
}

export type CommentProps = {
    data: {
        _id: string,
        name: string,
        email: string,
        body: string,
        avatar: string,
        date: string,
    },
    postID: string | undefined,
    commentIndex: number,
}

export type CommentFormProps = {
    setVisible: (arg: boolean) => void,
}

export type CommentFromSidebarProps = {
    comment: CommentType,
}