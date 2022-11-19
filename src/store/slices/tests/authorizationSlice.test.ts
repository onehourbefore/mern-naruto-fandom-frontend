import reducer, { sendLoginForm, logout, refresh, deleteProfile } from '../authorizationSlice';
import { StatusModel } from '../../../models/StatusModel';
import { configureStore } from '@reduxjs/toolkit';
import { AuthorizationThunks } from '../thunks/AuthorizationThunks';


const emptyUser = {
	id: '',
	email: '',
	name: '',
	role: '',
	avatar: '',
	created: 0,
	liked: []
}

const response = {
	accessToken: 'jsjcsijcpasoijdcs8j91c18993m4ur83r',
	refreshToken: 'i903i4m39i4923imc9imeormc945ic94ri',
	user: {
		id: '0reofe0rofer',
		email: 'jake@gmail.com',
		name: 'Jake',
		role: 'user',
		avatar: 'jakeAvatar.jpg',
		created: 0,
		liked: [],
	}
}

describe('authorizationSlice', () => {
	afterEach(() => {
		jest.restoreAllMocks();
	});

	it('sendLoginForm/pending', async () => {
		const mockedSendLoginFormCallback = jest.spyOn(
			AuthorizationThunks.prototype,
			'sendLoginFormCallback'
		);
		const store = configureStore({ reducer });
		store.dispatch(sendLoginForm({email: 'jake@gmail.com', password: 'zzzxxxcccqwe123'}));
		expect(mockedSendLoginFormCallback).toHaveBeenCalledTimes(1);
		expect(store.getState().status).toBe(StatusModel.LOADING);
	});

    it('sendLoginForm/rejected', async () => {
		const mockedSendLoginFormCallback = jest.spyOn(
			AuthorizationThunks.prototype,
			'sendLoginFormCallback'
		);
		mockedSendLoginFormCallback.mockRejectedValueOnce({ message: 'Error' });
		const store = configureStore({ reducer });
		await store.dispatch(sendLoginForm({email: 'jake@gmail.com', password: 'zzzxxxcccqwe123'}));
		expect(mockedSendLoginFormCallback).toHaveBeenCalledTimes(1);
		expect(store.getState().status).toBe(StatusModel.ERROR);
	});

    it('sendLoginForm/fulfilled', async () => {
		const mockedSendLoginFormCallback = jest.spyOn(
			AuthorizationThunks.prototype,
			'sendLoginFormCallback'
		);
		const mockedSetAccessToken = jest.spyOn(
			Object.getPrototypeOf(localStorage),
			'setItem'
		);
		const { user, accessToken } = response;
        mockedSendLoginFormCallback.mockResolvedValueOnce(response);

		const store = configureStore({ reducer });
		await store.dispatch(sendLoginForm({email: 'jake@gmail.com', password: 'zzzxxxcccqwe123'}));
		expect(mockedSendLoginFormCallback).toHaveBeenCalledTimes(1);
		expect(mockedSetAccessToken).toHaveBeenCalledTimes(1);
		expect(mockedSetAccessToken).toHaveBeenCalledWith('accessToken', accessToken);
		expect(store.getState().user).toEqual(user);
		expect(store.getState().status).toBe(StatusModel.SUCCESS);
	});



    it('logout/pending', async () => {
		const mockedLogoutCallback = jest.spyOn(
			AuthorizationThunks.prototype,
			'logoutCallback'
		);
		const store = configureStore({ reducer });
		store.dispatch(logout());
		expect(mockedLogoutCallback).toHaveBeenCalledTimes(1);
		expect(store.getState().status).toBe(StatusModel.LOADING);
	});

    it('logout/rejected', async () => {
		const mockedLogoutCallback = jest.spyOn(
			AuthorizationThunks.prototype,
			'logoutCallback'
		);
		mockedLogoutCallback.mockRejectedValueOnce({ message: 'Error' });
		const store = configureStore({ reducer });
		await store.dispatch(logout());
		expect(mockedLogoutCallback).toHaveBeenCalledTimes(1);
		expect(store.getState().status).toBe(StatusModel.ERROR);
	});

    it('logout/fulfilled', async () => {
		const mockedLogoutCallback = jest.spyOn(
			AuthorizationThunks.prototype,
			'logoutCallback'
		);
		const mockedRemoveToken = jest.spyOn(
			Object.getPrototypeOf(localStorage),
			'removeItem'
		)
        mockedLogoutCallback.mockResolvedValueOnce({ message: 'Вы вышли из аккаунта' });
		const store = configureStore({ reducer });
		await store.dispatch(logout());
		expect(mockedLogoutCallback).toHaveBeenCalledTimes(1);
		expect(mockedRemoveToken).toHaveBeenCalledTimes(1);
		expect(mockedRemoveToken).toHaveBeenCalledWith('accessToken');
        expect(store.getState().user).toEqual(emptyUser);
		expect(store.getState().status).toBe(StatusModel.IDLE);
	});


	it('refresh/pending', async () => {
		const mockedRefreshCallback = jest.spyOn(
			AuthorizationThunks.prototype,
			'refreshCallback'
		);
		const store = configureStore({ reducer });
		store.dispatch(refresh());
		expect(mockedRefreshCallback).toHaveBeenCalledTimes(1);
		expect(store.getState().status).toBe(StatusModel.LOADING);
	});

	it('refresh/rejected', async () => {
		const mockedRefreshCallback = jest.spyOn(
			AuthorizationThunks.prototype,
			'refreshCallback'
		);
		mockedRefreshCallback.mockRejectedValueOnce({ message: 'Error' });
		const store = configureStore({ reducer });
		await store.dispatch(refresh());
		expect(mockedRefreshCallback).toHaveBeenCalledTimes(1);
		expect(store.getState().status).toBe(StatusModel.IDLE);
	});

	it('refresh/fulfilled', async () => {
		const mockedRefreshCallback = jest.spyOn(
			AuthorizationThunks.prototype,
			'refreshCallback'
		);
		const mockedSetAccessToken = jest.spyOn(
			Object.getPrototypeOf(localStorage),
			'setItem'
		);
		const { user, accessToken } = response;
        mockedRefreshCallback.mockResolvedValueOnce(response);

		const store = configureStore({ reducer });
		await store.dispatch(refresh());
		expect(mockedRefreshCallback).toHaveBeenCalledTimes(1);
		expect(mockedSetAccessToken).toHaveBeenCalledTimes(1);
		expect(mockedSetAccessToken).toHaveBeenCalledWith('accessToken', accessToken);
		expect(store.getState().user).toEqual(user);
		expect(store.getState().status).toBe(StatusModel.SUCCESS);
	});


	it('deleteProfile/pending', async () => {
		const mockedDeleteProfileCallback = jest.spyOn(
			AuthorizationThunks.prototype,
			'deleteProfileCallback'
		);
		const store = configureStore({ reducer });
		store.dispatch(deleteProfile());
		expect(mockedDeleteProfileCallback).toHaveBeenCalledTimes(1);
		expect(store.getState().deleteProfileStatus).toBe(StatusModel.LOADING);
	});

	it('deleteProfile/rejected', async () => {
		const mockedDeleteProfileCallback = jest.spyOn(
			AuthorizationThunks.prototype,
			'deleteProfileCallback'
		);
		mockedDeleteProfileCallback.mockRejectedValueOnce({ message: 'Error' });
		const store = configureStore({ reducer });
		await store.dispatch(deleteProfile());
		expect(mockedDeleteProfileCallback).toHaveBeenCalledTimes(1);
		expect(store.getState().deleteProfileStatus).toBe(StatusModel.ERROR);
	});

	it('deleteProfile/fulfilled', async () => {
		const mockedDeleteProfileCallback = jest.spyOn(
			AuthorizationThunks.prototype,
			'deleteProfileCallback'
		);
		const mockedRemoveToken = jest.spyOn(Object.getPrototypeOf(localStorage), 'removeItem');
		mockedDeleteProfileCallback.mockResolvedValueOnce({ message: 'Вы удалили свой аккаунт' });

		const store = configureStore({ reducer });
		await store.dispatch(deleteProfile());
		expect(mockedDeleteProfileCallback).toHaveBeenCalledTimes(1);
		expect(mockedRemoveToken).toHaveBeenCalledTimes(1);
		expect(mockedRemoveToken).toHaveBeenCalledWith('accessToken');
		expect(store.getState().deleteProfileStatus).toBe(StatusModel.SUCCESS);
		expect(store.getState().user).toEqual(emptyUser);
	});
});