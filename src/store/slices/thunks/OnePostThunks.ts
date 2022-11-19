import $api from "../../../http";
import { PostType } from "../../../models/PostModel";

export class OnePostThunks {
    async fetchOnePostCallback(postID: string) {
        try {
            const { data } = await $api.get<PostType>(`/posts/${postID}`);
            return data;
        } catch(e) {
            throw e;
        }
    }

    async addLikeCallback(postID: string) {
        try {
            const { data } = await $api.get(`/posts/${postID}/like`);
            return data.likes;
        } catch(e) {
            throw e;
        }
    }

    async removeLikeCallback(postID: string) {
        try {
            const { data } = await $api.get(`/posts/${postID}/rmlike`);
            return data.likes;
        } catch(e) {
            throw e;
        }
    }

    async addCommentCallback(query: {postID: string, body: string}) {
        try {
            const { data } = await $api.post(
                `/posts/${query.postID}/comment`, { comment: query.body });
            return data.comments;
        } catch(e) {
            throw e;
        }
    }

    async removeCommentCallback(query: { postID: string, commentID: string }) {
        try {
            const { data } = await $api.get(
                `/posts/${query.postID}/rmcomment?_commentID=${query.commentID}`);
            return data;
        } catch(e) {
            throw e;
        }
    }
}