import $api from "../../../http";

export class FilterThunks {
    async findPostsCallback(q: {type: '_query' | '_tag', payload: string}) {
        try {
            const { type, payload } = q;
            const { data } = await $api.get(`/search?${type}=${payload}`);
            return data;
        } catch (e) {
            throw e;
        }
    }

    async getAllTagsCallback() {
        try {
            const { data } = await $api.get(`/tags`);
            return data;
        } catch(e) {
            throw e;
        }
    }
}