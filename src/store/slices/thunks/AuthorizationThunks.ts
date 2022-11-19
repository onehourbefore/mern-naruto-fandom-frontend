import $api from "../../../http";

export class AuthorizationThunks {
    async sendLoginFormCallback(form: {email: string, password: string}) {
        try {
            const { data } = await $api.post(`/login`, form);
            return data;
        } catch(e) {
            throw e;
        }
    }

    async logoutCallback() {
        try {
            const { data } = await $api.get(`/logout`);
            console. log (data);
            return data;
        } catch(e) {
            throw e;
        }
    }

    async refreshCallback() {
        try {
            const { data } = await $api.get(`/refresh`);
            return data;
        } catch(e) {
            throw e;
        }
    }

    async deleteProfileCallback() {
        try {
            const { data }  = await $api.get(`/deleteProfile`);
            console.log(data);
            return data;
        } catch(e) {
            throw e;
        }
    }
}