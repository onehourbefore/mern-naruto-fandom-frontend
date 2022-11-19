import { configureStore } from '@reduxjs/toolkit';
import { expertSlice, fetchExperts } from '../expertSlice';
import { ExpertsThunks } from '../thunks/ExpertsThunks';
import { ExpertType } from '../../../models/ExpertsModel';
import { StatusModel } from '../../../models/StatusModel';

const experts: ExpertType[] = [
	{
		avatar: 'jakeAvatar.jpg',
		email: 'jake@gmail.com',
		name: 'Jake',
		created: 21,
	},
	{
		avatar: 'robAvatar.jpg',
		email: 'rob@gmail.com',
		name: 'Rob',
		created: 13,
	},
]

	

describe('expertsSlice', () => {
	afterEach(() => {
		jest.restoreAllMocks();
	});

	it('fetchExperts/pending', async () => {
		const mockedFetchExpertsCallback = jest.spyOn(
			ExpertsThunks.prototype,
			'fetchExpertsCallback'
		);
		const store = configureStore({ reducer: expertSlice.reducer });
		store.dispatch(fetchExperts());
		expect(mockedFetchExpertsCallback).toHaveBeenCalledTimes(1);
		expect(store.getState().experts).toEqual([]);
		expect(store.getState().status).toBe(StatusModel.LOADING);
	});

	it('fetchExperts/rejected', async () => {
		const mockedFetchExpertsCallback = jest.spyOn(
			ExpertsThunks.prototype,
			'fetchExpertsCallback'
		);
		mockedFetchExpertsCallback.mockRejectedValueOnce({ message: 'Error' });
		const store = configureStore({ reducer: expertSlice.reducer });
		await store.dispatch(fetchExperts());
		expect(mockedFetchExpertsCallback).toHaveBeenCalledTimes(1);
		expect(store.getState().experts).toEqual([]);
		expect(store.getState().status).toBe(StatusModel.ERROR);
	});

	it('fetchExperts/fulfilled', async () => {
		const mockedFetchExpertsCallback = jest.spyOn(
			ExpertsThunks.prototype,
			'fetchExpertsCallback'
		);
		mockedFetchExpertsCallback.mockResolvedValue(experts);
		const store = configureStore({ reducer: expertSlice.reducer });
		await store.dispatch(fetchExperts());
		expect(mockedFetchExpertsCallback).toHaveBeenCalledTimes(1);
		expect(store.getState().experts).toEqual(experts);
		expect(store.getState().status).toBe(StatusModel.SUCCESS);
	});
});