import { ExpertType } from "../../../models/ExpertsModel";
import $api from "../../../http";

export class ExpertsThunks {
    async fetchExpertsCallback() {
        try {
            const { data } = await $api.get<ExpertType [] | []>(`/experts`);
            return data;
        } catch (e: any) {
            throw e;
        }
    }
}