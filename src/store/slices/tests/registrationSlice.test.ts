import { configureStore } from '@reduxjs/toolkit';
import reducer, { sendRegistrationForm } from '../registrationSlice';
import { StatusModel } from '../../../models/StatusModel';
import { RegistrationThunks } from '../thunks/RegistrationThunks';
import { RegistrationFormType } from '../../../models/RegistrationModel';

const form: RegistrationFormType = {
    email: 'jake@gmail.com',
    password: 'zzzxxxccc1212',
    name: 'Jake',
    secret: 'user',
    avatar: 'jakeAvatar.jpg',
}

describe('registrationSlice', () => {
	afterEach(() => {
		jest.restoreAllMocks();
	});

	it('sendRegistrationForm/pending', async () => {
		const mockedSendRegistrationFormCallback = jest.spyOn(
			RegistrationThunks.prototype,
			'sendRegistrationFormCallback'
		);
		const store = configureStore({ reducer });
		store.dispatch(sendRegistrationForm(form));
		expect(mockedSendRegistrationFormCallback).toHaveBeenCalledTimes(1);
		expect(store.getState().status).toBe(StatusModel.LOADING);
	});

    it('sendRegistrationForm/rejected', async () => {
		const mockedSendRegistrationFormCallback = jest.spyOn(
			RegistrationThunks.prototype,
			'sendRegistrationFormCallback'
		);
        mockedSendRegistrationFormCallback.mockRejectedValueOnce({ message: 'Error' });
		const store = configureStore({ reducer });
		await store.dispatch(sendRegistrationForm(form));
		expect(mockedSendRegistrationFormCallback).toHaveBeenCalledTimes(1);
		expect(store.getState().status).toBe(StatusModel.ERROR);
	});

    it('sendRegistrationForm/fulfilled', async () => {
		const mockedSendRegistrationFormCallback = jest.spyOn(
			RegistrationThunks.prototype,
			'sendRegistrationFormCallback'
		);
        mockedSendRegistrationFormCallback.mockResolvedValueOnce(undefined);
		const store = configureStore({ reducer });
		await store.dispatch(sendRegistrationForm(form));
		expect(mockedSendRegistrationFormCallback).toHaveBeenCalledTimes(1);
		expect(store.getState().status).toBe(StatusModel.SUCCESS);
	});
});