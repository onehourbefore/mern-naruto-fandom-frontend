import $api from "../../../http";
import { RegistrationFormType } from "../../../models/RegistrationModel";

export class RegistrationThunks {
    async sendRegistrationFormCallback(form: RegistrationFormType) {
        try {
            const formData = new FormData ();
            formData.append('email', form.email);
            formData.append('password', form.password);
            formData.append('name', form.name);
            formData.append('secret', form.secret);
            formData.append('avatar', form.avatar);
            await $api.post(`/registration`, formData);
        } catch(e) {
            throw e;
        }
    }
}