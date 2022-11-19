import $api from "../../../http";

export class CommentsThunks {
    async fetchCommentsCallback() {
        try {
            const { data } = await $api.get(`/comments`);
            return data;
        } catch(e: any) {
            throw e;
        }
    }
}