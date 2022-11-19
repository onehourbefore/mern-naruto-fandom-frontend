import { fireEvent, screen, act } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import * as routerHooks from 'react-router';
import * as reduxHooks from '../../store';
import * as actions from '../../store/slices/authorizationSlice';
import { StatusModel } from "../../models/StatusModel";
import { renderWithProviders } from "../../utils/test-utils/test-utils";
import { setupStore } from "../../utils/test-utils/testStore";
import Login from "./Login";


const mockedSendLoginForm = jest.spyOn(actions, 'sendLoginForm');
const mockedUseNavigate = jest.spyOn(routerHooks, 'useNavigate');
const mockedUseAppDispatch = jest.spyOn(reduxHooks, 'useAppDispatch');
const navigate = jest.fn();

describe('Login, no auth', () => {
    it('all elements', () => {
        renderWithProviders({ elem: <Login /> });
        expect(screen.getByText(/авторизация/i)).toBeInTheDocument();
        expect(screen.getByTestId('form-test')).toBeInTheDocument();
    });

    it('form elements', () => {
        renderWithProviders({ elem: <Login /> });
        expect(screen.getByText(/ваша почта/i)).toBeInTheDocument();
        expect(screen.getByPlaceholderText(/email/i)).toBeInTheDocument();
        expect(screen.getByText(/пароль/i)).toBeInTheDocument();
        expect(screen.getByPlaceholderText(/пароль/i)).toBeInTheDocument();
        expect(screen.getByTestId('submitBtn')).toBeInTheDocument();
    });

    it('invalid email and password', async () => {
        renderWithProviders({ elem: <Login /> });
        fireEvent.submit(screen.getByTestId('submitBtn'));
        expect(await screen.findAllByTestId("alert")).toHaveLength(2);
    });

    it("invalid email (empty)", async () => {
        renderWithProviders({ elem: <Login /> });
        fireEvent.input(screen.getByPlaceholderText(/email/i), {
            target: { value: "" }
        });
        fireEvent.input(screen.getByPlaceholderText(/пароль/i), {
            target: { value: "password" }
        });
        fireEvent.submit(screen.getByTestId("submitBtn"));
        expect(await screen.findAllByTestId("alert")).toHaveLength(1);
        expect(screen.getByPlaceholderText(/email/i)).toHaveDisplayValue("");
        expect(screen.getByPlaceholderText(/пароль/i)).toHaveDisplayValue("password");
        expect(screen.getByText(/введите email/i)).toBeInTheDocument();
    });

    it("invalid email (incorrect)", async () => {
        renderWithProviders({ elem: <Login /> });
        fireEvent.input(screen.getByPlaceholderText(/email/i), {
            target: { value: "test" }
        });
        fireEvent.input(screen.getByPlaceholderText(/пароль/i), {
            target: { value: "password" }
        });
        fireEvent.submit(screen.getByTestId("submitBtn"));
        expect(await screen.findAllByTestId("alert")).toHaveLength(1);
        expect(screen.getByPlaceholderText(/email/i)).toHaveDisplayValue("test");
        expect(screen.getByPlaceholderText(/пароль/i)).toHaveDisplayValue("password");
        expect(screen.getByText(/введите корректный email/i)).toBeInTheDocument();
    });

    it("invalid password (empty)", async () => {
        renderWithProviders({ elem: <Login /> });
        fireEvent.input(screen.getByPlaceholderText(/email/i), {
            target: { value: "test@mail.com" }
        });
        fireEvent.input(screen.getByPlaceholderText(/пароль/i), {
            target: { value: "" }
        });
        fireEvent.submit(screen.getByTestId('submitBtn'));
        expect(await screen.findAllByTestId("alert")).toHaveLength(1);
        expect(screen.getByPlaceholderText(/email/i)).toHaveDisplayValue("test@mail.com");
        expect(screen.getByPlaceholderText(/пароль/i)).toHaveDisplayValue("");
        expect(screen.getByText(/Пароль от 3-12 символов/i)).toBeInTheDocument();
    });

    it("invalid password (too short)", async () => {
        renderWithProviders({ elem: <Login /> });
        fireEvent.input(screen.getByPlaceholderText(/email/i), {
            target: { value: "test@mail.com" }
        });
        fireEvent.input(screen.getByPlaceholderText(/пароль/i), {
            target: { value: "pa" }
        });
        fireEvent.submit(screen.getByTestId('submitBtn'));
        expect(await screen.findAllByTestId("alert")).toHaveLength(1);
        expect(screen.getByPlaceholderText(/email/i)).toHaveDisplayValue("test@mail.com");
        expect(screen.getByPlaceholderText(/пароль/i)).toHaveDisplayValue("pa");
        expect(screen.getByText(/слишком короткий пароль/i)).toBeInTheDocument();
    });

    it("invalid password (too long)", async () => {
        renderWithProviders({ elem: <Login /> });
        fireEvent.input(screen.getByPlaceholderText(/email/i), {
            target: { value: "test@mail.com" }
        });
        fireEvent.input(screen.getByPlaceholderText(/пароль/i), {
            target: { value: "passwordpasswordpassword" }
        });
        fireEvent.submit(screen.getByTestId('submitBtn'));
        expect(await screen.findAllByTestId("alert")).toHaveLength(1);
        expect(screen.getByPlaceholderText(/email/i)).toHaveDisplayValue("test@mail.com");
        expect(screen.getByPlaceholderText(/пароль/i)).toHaveDisplayValue("passwordpasswordpassword");
        expect(screen.getByText(/слишком длинный пароль/i)).toBeInTheDocument();
    });

    it('email and password are valid', async () => {
        mockedUseAppDispatch.mockReturnValue(jest.fn());
        renderWithProviders({ elem: <Login /> });
        await act(async() => {
            fireEvent.input(screen.getByPlaceholderText(/email/i), {
                target: { value: "test@mail.com" }
            });
            fireEvent.input(screen.getByPlaceholderText(/пароль/i), {
                target: { value: "password" }
            });
            fireEvent.submit(screen.getByTestId('submitBtn'));
        });
        expect(screen.queryAllByTestId("alert")).toHaveLength(0);
        expect(mockedSendLoginForm).toHaveBeenCalledTimes(1);
        expect(mockedSendLoginForm).toHaveBeenCalledWith({email: "test@mail.com", password: "password"});
        expect(screen.getByPlaceholderText(/email/i)).toHaveDisplayValue('');
        expect(screen.getByPlaceholderText(/пароль/i)).toHaveDisplayValue('');
    });

    it('authStatus loading', () => {
        const state = setupStore().getState();
        const preloadedState = {
            ...state,
            authorization: {
                user: {
                    id: '',
                    email: '',
                    name: '',
                    role: '',
                    avatar: '',
                    created: 0,
                    liked: [],
                },
                status: StatusModel.LOADING,
                deleteProfileStatus: StatusModel.IDLE,
            }
        }
        renderWithProviders({ elem: <Login /> }, { preloadedState });
        expect(screen.getByTestId('spinner')).toBeInTheDocument();
    });

    it('authStatus success', () => {
        mockedUseNavigate.mockReturnValue(navigate);
        const state = setupStore().getState();
        const preloadedState = {
            ...state,
            authorization: {
                user: {
                    id: 'zzzrzrdrd1r21',
                    email: 'jake@gmail.com',
                    name: 'Jake',
                    role: 'admin',
                    avatar: 'jakeAvatar.jpg',
                    created: 12,
                    liked: [],
                },
                status: StatusModel.SUCCESS,
                deleteProfileStatus: StatusModel.IDLE,
            }
        }
        renderWithProviders({ elem: <Login /> }, { preloadedState });
        expect(screen.queryByTestId('submitBtn')).toBeNull();
        expect(screen.getByText(/вы авторизованы/i)).toBeInTheDocument();
        expect(navigate).toHaveBeenCalledTimes(1);
        expect(navigate).toHaveBeenCalledWith('/news');
    });

    it('authStatus error', () => {
        const state = setupStore().getState();
        const preloadedState = {
            ...state,
            authorization: {
                user: {
                    id: '',
                    email: '',
                    name: '',
                    role: '',
                    avatar: '',
                    created: 0,
                    liked: [],
                },
                status: StatusModel.ERROR,
                deleteProfileStatus: StatusModel.IDLE,
            }
        }
        renderWithProviders({ elem: <Login /> }, { preloadedState });
        expect(screen.getByText(/неверные логин или пароль/i)).toBeInTheDocument();
    });
});

