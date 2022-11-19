import { StatusModel } from "./StatusModel"
import { CommentType } from "./CommentsModel"

export type PostType = {
    _id: string,
    author: string,
    title: string,
    content: string,
    tags: string [],
    likes: number,
    comments: [] | CommentType [],
    views: number,
    image: string
}

export interface PostsState {
    all: { posts: PostType [] | [], status: StatusModel },
    created: { post: PostType | null, status: StatusModel },
    updated: { post: PostType | null, status: StatusModel },
    deleted: { post: PostType | null, status: StatusModel },
    count: { count: number, status: StatusModel }
}

export interface OnePostState {
    active: { post: PostType | null, status: StatusModel },
    likeStatus: StatusModel,
    commentStatus: StatusModel
}

export type FeedbackPanelProps = {
    activePost: PostType,
    id: string | undefined
}

export type PostProps = {
    post: PostType
}

export type PostInfoProps = {
    data: {
        likes: number,
        comments: [] | CommentType [],
        views: number
    }
}

export type PostContentProps = {
    data: {
        author: string,
        title: string,
        content: string,
        tags: string []
    }
}

export type PostDataProps = {
    activePost: PostType
}

export type PostTypeForCreate = {
    title: string,
    content: string,
    tags: string,
    image: Blob | string,
}


