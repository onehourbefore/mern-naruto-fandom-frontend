import { AuthorizationState } from "../../../../models/AuthorizationModel";
import { StatusModel } from "../../../../models/StatusModel";

export const menuVisionTestState: AuthorizationState = {
    user: {
        id: '',
        email: '',
        name: '',
        role: '',
        avatar: '',
        created: 0,
        liked: []
    },
    status: StatusModel.IDLE,
    deleteProfileStatus: StatusModel.IDLE,
};