import $api from "../../../http";
import { PostType, PostTypeForCreate } from "../../../models/PostModel";

export class PostsThunks {
    async getCountOfPostsCallback() {
        try {
            const { data } = await $api.get (`/posts?_count=count`);
            return data;
        } catch(e) {
            throw e;
        }
    }

    async fetchPostsCallback(query: {limit: number, page: number}) {
        try {
            const { data } = await $api.get<PostType []>(`/posts`, {
                params: {
                    _limit: query.limit, 
                    _page: query.page,
                }
            })
            return data;
        } catch(e) {
            throw e;
        }
    }

    async createPostCallback(post: PostTypeForCreate) {
        try {
            const formData = new FormData();
            formData.append('title', post.title);
            formData.append('content', post.content);
            formData.append('tags', post.tags);
            formData.append('image', post.image);
            const { data } = await $api.post(`/posts`, formData);
            return data;
        } catch(e) {
            throw e;
        }
    }

    async updatePostCallback(query: {id: string, post: PostTypeForCreate}) {
        try {
            const formData = new FormData();
            formData.append('_id', query.id);
            formData.append('title', query.post.title);
            formData.append('content', query.post.content);
            formData.append('tags', query.post.tags);
            formData.append('image', query.post.image);
            const { data } = await $api.put(`/posts/${query.id}`, formData);
            return data;
        } catch(e) {
            throw e;
        }
    }

    async deletePostCallback(id: string) {
        try {
            const { data } = await $api.delete(`/posts/${id}`);
            return data;
        } catch(e) {
            throw e;
        }
    }
}