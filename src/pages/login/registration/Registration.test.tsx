import { act, fireEvent, screen } from '@testing-library/react';
import * as routerHooks from 'react-router';
import * as reduxHooks from '../../../store';
import { renderWithProviders } from '../../../utils/test-utils/test-utils';
import Registration from './Registration';
import { StatusModel } from '../../../models/StatusModel';
import { setupStore } from '../../../utils/test-utils/testStore';


const mockedUseNavigate = jest.spyOn(routerHooks, 'useNavigate');
const navigate = jest.fn();
const file = new File(['hello'], 'hello.png', {type: 'image/png'});

describe('Registration', () => {
    it('all elements, no auth', () => {
        renderWithProviders({ elem: <Registration /> });
        expect(screen.getByText(/зарегистрироваться/i)).toBeInTheDocument();
        expect(screen.getByText(/ваша почта/i)).toBeInTheDocument();
        expect(screen.getByPlaceholderText(/email/i)).toBeInTheDocument();
        expect(screen.getByText(/пароль/i)).toBeInTheDocument();
        expect(screen.getByPlaceholderText(/пароль/i)).toBeInTheDocument();
        expect(screen.getByText(/имя профиля/i)).toBeInTheDocument();
        expect(screen.getByPlaceholderText(/имя/i)).toBeInTheDocument();
        expect(screen.getByText(/для получения прав администратора/i)).toBeInTheDocument();
        expect(screen.getByPlaceholderText(/секретное слово/i)).toBeInTheDocument();
        expect(screen.getByText(/прикрепить фото профиля/i)).toBeInTheDocument();
        expect(screen.getByTestId('avatar-input')).toBeInTheDocument();
        expect(screen.getByText(/все поля обязательны к заполнению/i)).toBeInTheDocument();
        expect(screen.getByTestId('submitBtn')).toBeInTheDocument();
    });

    it("invalid input values", async () => {
        renderWithProviders({ elem: <Registration /> });
        const avatarInput: HTMLInputElement = screen.getByTestId('avatar-input');
        fireEvent.submit(screen.getByTestId('submitBtn'));
        expect(await screen.findAllByTestId("alert")).toHaveLength(4);
        expect(avatarInput.files).toHaveLength(0);
    });

    it("email is invalid (empty)", async () => {
        renderWithProviders({ elem: <Registration /> });
        const avatarInput: HTMLInputElement = screen.getByTestId('avatar-input');
        fireEvent.input(screen.getByPlaceholderText(/email/i), {
            target: { value: "" }
        });
        fireEvent.input(screen.getByPlaceholderText(/пароль/i), {
            target: { value: "password" }
        });
        fireEvent.input(screen.getByPlaceholderText(/имя/i), {
            target: { value: "Jake" }
        });
        fireEvent.input(screen.getByPlaceholderText(/секретное слово/i), {
            target: { value: "user" }
        });
        fireEvent.input(avatarInput, {
            target: { files: [file] }
        });
        fireEvent.submit(screen.getByTestId('submitBtn'));
        expect(await screen.findAllByTestId("alert")).toHaveLength(1);
        expect(screen.getByPlaceholderText(/email/i)).toHaveDisplayValue("");
        expect(screen.getByPlaceholderText(/пароль/i)).toHaveDisplayValue("password");
        expect(screen.getByPlaceholderText(/имя/i)).toHaveDisplayValue("Jake");
        expect(screen.getByPlaceholderText(/секретное слово/i)).toHaveDisplayValue("user");
        expect(avatarInput.files).toHaveLength(1);
        expect(screen.getByText(/введите реальный email/i)).toBeInTheDocument();
    });

    it("email is invalid (incorrect)", async () => {
        renderWithProviders({ elem: <Registration /> });
        const avatarInput: HTMLInputElement = screen.getByTestId('avatar-input');
        fireEvent.input(screen.getByPlaceholderText(/email/i), {
            target: { value: "test" }
        });
        fireEvent.input(screen.getByPlaceholderText(/пароль/i), {
            target: { value: "password" }
        });
        fireEvent.input(screen.getByPlaceholderText(/имя/i), {
            target: { value: "Jake" }
        });
        fireEvent.input(screen.getByPlaceholderText(/секретное слово/i), {
            target: { value: "user" }
        });
        fireEvent.input(avatarInput, {
            target: { files: [file] }
        });
        fireEvent.submit(screen.getByTestId('submitBtn'));
        expect(await screen.findAllByTestId("alert")).toHaveLength(1);
        expect(screen.getByPlaceholderText(/email/i)).toHaveDisplayValue("test");
        expect(screen.getByPlaceholderText(/пароль/i)).toHaveDisplayValue("password");
        expect(screen.getByPlaceholderText(/имя/i)).toHaveDisplayValue("Jake");
        expect(screen.getByPlaceholderText(/секретное слово/i)).toHaveDisplayValue("user");
        expect(avatarInput.files).toHaveLength(1);
        expect(screen.getByText(/введите корректный email/i)).toBeInTheDocument();
    });

    it("password is invalid (empty)", async () => {
        renderWithProviders({ elem: <Registration /> });
        const avatarInput: HTMLInputElement = screen.getByTestId('avatar-input');
        fireEvent.input(screen.getByPlaceholderText(/email/i), {
            target: { value: "test@gmail.com" }
        });
        fireEvent.input(screen.getByPlaceholderText(/пароль/i), {
            target: { value: "" }
        });
        fireEvent.input(screen.getByPlaceholderText(/имя/i), {
            target: { value: "Jake" }
        });
        fireEvent.input(screen.getByPlaceholderText(/секретное слово/i), {
            target: { value: "user" }
        });
        fireEvent.input(avatarInput, {
            target: { files: [file] }
        });
        fireEvent.submit(screen.getByTestId('submitBtn'));
        expect(await screen.findAllByTestId("alert")).toHaveLength(1);
        expect(screen.getByPlaceholderText(/email/i)).toHaveDisplayValue("test@gmail.com");
        expect(screen.getByPlaceholderText(/пароль/i)).toHaveDisplayValue("");
        expect(screen.getByPlaceholderText(/имя/i)).toHaveDisplayValue("Jake");
        expect(screen.getByPlaceholderText(/секретное слово/i)).toHaveDisplayValue("user");
        expect(avatarInput.files).toHaveLength(1);
        expect(screen.getByText(/пароль от 3-12 символов/i)).toBeInTheDocument();
    });

    it("password is invalid (too short)", async () => {
        renderWithProviders({ elem: <Registration /> });
        const avatarInput: HTMLInputElement = screen.getByTestId('avatar-input');
        fireEvent.input(screen.getByPlaceholderText(/email/i), {
            target: { value: "test@gmail.com" }
        });
        fireEvent.input(screen.getByPlaceholderText(/пароль/i), {
            target: { value: "pa" }
        });
        fireEvent.input(screen.getByPlaceholderText(/имя/i), {
            target: { value: "Jake" }
        });
        fireEvent.input(screen.getByPlaceholderText(/секретное слово/i), {
            target: { value: "user" }
        });
        fireEvent.input(avatarInput, {
            target: { files: [file] }
        });
        fireEvent.submit(screen.getByTestId('submitBtn'));
        expect(await screen.findAllByTestId("alert")).toHaveLength(1);
        expect(screen.getByPlaceholderText(/email/i)).toHaveDisplayValue("test@gmail.com");
        expect(screen.getByPlaceholderText(/пароль/i)).toHaveDisplayValue("pa");
        expect(screen.getByPlaceholderText(/имя/i)).toHaveDisplayValue("Jake");
        expect(screen.getByPlaceholderText(/секретное слово/i)).toHaveDisplayValue("user");
        expect(avatarInput.files).toHaveLength(1);
        expect(screen.getByText(/слишком короткий пароль/i)).toBeInTheDocument();
    });

    it("password is invalid (too long)", async () => {
        renderWithProviders({ elem: <Registration /> });
        const avatarInput: HTMLInputElement = screen.getByTestId('avatar-input');
        fireEvent.input(screen.getByPlaceholderText(/email/i), {
            target: { value: "test@gmail.com" }
        });
        fireEvent.input(screen.getByPlaceholderText(/пароль/i), {
            target: { value: "passwordpasswordpassword" }
        });
        fireEvent.input(screen.getByPlaceholderText(/имя/i), {
            target: { value: "Jake" }
        });
        fireEvent.input(screen.getByPlaceholderText(/секретное слово/i), {
            target: { value: "user" }
        });
        fireEvent.input(avatarInput, {
            target: { files: [file] }
        });
        fireEvent.submit(screen.getByTestId('submitBtn'));
        expect(await screen.findAllByTestId("alert")).toHaveLength(1);
        expect(screen.getByPlaceholderText(/email/i)).toHaveDisplayValue("test@gmail.com");
        expect(screen.getByPlaceholderText(/пароль/i)).toHaveDisplayValue("passwordpasswordpassword");
        expect(screen.getByPlaceholderText(/имя/i)).toHaveDisplayValue("Jake");
        expect(screen.getByPlaceholderText(/секретное слово/i)).toHaveDisplayValue("user");
        expect(avatarInput.files).toHaveLength(1);
        expect(screen.getByText(/слишком длинный пароль/i)).toBeInTheDocument();
    });

    it("name is invalid (empty)", async () => {
        renderWithProviders({ elem: <Registration /> });
        const avatarInput: HTMLInputElement = screen.getByTestId('avatar-input');
        fireEvent.input(screen.getByPlaceholderText(/email/i), {
            target: { value: "test@gmail.com" }
        });
        fireEvent.input(screen.getByPlaceholderText(/пароль/i), {
            target: { value: "password" }
        });
        fireEvent.input(screen.getByPlaceholderText(/имя/i), {
            target: { value: "" }
        });
        fireEvent.input(screen.getByPlaceholderText(/секретное слово/i), {
            target: { value: "user" }
        });
        fireEvent.input(avatarInput, {
            target: { files: [file] }
        });
        fireEvent.submit(screen.getByTestId('submitBtn'));
        expect(await screen.findAllByTestId("alert")).toHaveLength(1);
        expect(screen.getByPlaceholderText(/email/i)).toHaveDisplayValue("test@gmail.com");
        expect(screen.getByPlaceholderText(/пароль/i)).toHaveDisplayValue("password");
        expect(screen.getByPlaceholderText(/имя/i)).toHaveDisplayValue("");
        expect(screen.getByPlaceholderText(/секретное слово/i)).toHaveDisplayValue("user");
        expect(avatarInput.files).toHaveLength(1);
        expect(screen.getByText(/имя профиля от 2-12 символов/i)).toBeInTheDocument();
    });

    it("name is invalid (to short)", async () => {
        renderWithProviders({ elem: <Registration /> });
        const avatarInput: HTMLInputElement = screen.getByTestId('avatar-input');
        fireEvent.input(screen.getByPlaceholderText(/email/i), {
            target: { value: "test@gmail.com" }
        });
        fireEvent.input(screen.getByPlaceholderText(/пароль/i), {
            target: { value: "password" }
        });
        fireEvent.input(screen.getByPlaceholderText(/имя/i), {
            target: { value: "s" }
        });
        fireEvent.input(screen.getByPlaceholderText(/секретное слово/i), {
            target: { value: "user" }
        });
        fireEvent.input(avatarInput, {
            target: { files: [file] }
        });
        fireEvent.submit(screen.getByTestId('submitBtn'));
        expect(await screen.findAllByTestId("alert")).toHaveLength(1);
        expect(screen.getByPlaceholderText(/email/i)).toHaveDisplayValue("test@gmail.com");
        expect(screen.getByPlaceholderText(/пароль/i)).toHaveDisplayValue("password");
        expect(screen.getByPlaceholderText(/имя/i)).toHaveDisplayValue("s");
        expect(screen.getByPlaceholderText(/секретное слово/i)).toHaveDisplayValue("user");
        expect(avatarInput.files).toHaveLength(1);
        expect(screen.getByText(/минимум 2 символа/i)).toBeInTheDocument();
    });

    it("name is invalid (too long)", async () => {
        renderWithProviders({ elem: <Registration /> });
        const avatarInput: HTMLInputElement = screen.getByTestId('avatar-input');
        fireEvent.input(screen.getByPlaceholderText(/email/i), {
            target: { value: "test@gmail.com" }
        });
        fireEvent.input(screen.getByPlaceholderText(/пароль/i), {
            target: { value: "password" }
        });
        fireEvent.input(screen.getByPlaceholderText(/имя/i), {
            target: { value: "jakejakejakejake" }
        });
        fireEvent.input(screen.getByPlaceholderText(/секретное слово/i), {
            target: { value: "user" }
        });
        fireEvent.input(avatarInput, {
            target: { files: [file] }
        });
        fireEvent.submit(screen.getByTestId('submitBtn'));
        expect(await screen.findAllByTestId("alert")).toHaveLength(1);
        expect(screen.getByPlaceholderText(/email/i)).toHaveDisplayValue("test@gmail.com");
        expect(screen.getByPlaceholderText(/пароль/i)).toHaveDisplayValue("password");
        expect(screen.getByPlaceholderText(/имя/i)).toHaveDisplayValue("jakejakejakejake");
        expect(screen.getByPlaceholderText(/секретное слово/i)).toHaveDisplayValue("user");
        expect(avatarInput.files).toHaveLength(1);
        expect(screen.getByText(/не больше 12 символов/i)).toBeInTheDocument();
    });

    it("secret is invalid (empty)", async () => {
        renderWithProviders({ elem: <Registration /> });
        const avatarInput: HTMLInputElement = screen.getByTestId('avatar-input');
        fireEvent.input(screen.getByPlaceholderText(/email/i), {
            target: { value: "test@gmail.com" }
        });
        fireEvent.input(screen.getByPlaceholderText(/пароль/i), {
            target: { value: "password" }
        });
        fireEvent.input(screen.getByPlaceholderText(/имя/i), {
            target: { value: "Jake" }
        });
        fireEvent.input(screen.getByPlaceholderText(/секретное слово/i), {
            target: { value: "" }
        });
        fireEvent.input(avatarInput, {
            target: { files: [file] }
        });
        fireEvent.submit(screen.getByTestId('submitBtn'));
        expect(await screen.findAllByTestId("alert")).toHaveLength(1);
        expect(screen.getByPlaceholderText(/email/i)).toHaveDisplayValue("test@gmail.com");
        expect(screen.getByPlaceholderText(/пароль/i)).toHaveDisplayValue("password");
        expect(screen.getByPlaceholderText(/имя/i)).toHaveDisplayValue("Jake");
        expect(screen.getByPlaceholderText(/секретное слово/i)).toHaveDisplayValue("");
        expect(avatarInput.files).toHaveLength(1);
        expect(screen.getByText(/введите секретное слово/i)).toBeInTheDocument();
    });

    it("avatar is invalid (empty)", async () => {
        renderWithProviders({ elem: <Registration /> });
        const avatarInput: HTMLInputElement = screen.getByTestId('avatar-input');
        await act(async() => {
            fireEvent.input(screen.getByPlaceholderText(/email/i), {
                target: { value: "test@gmail.com" }
            });
            fireEvent.input(screen.getByPlaceholderText(/пароль/i), {
                target: { value: "password" }
            });
            fireEvent.input(screen.getByPlaceholderText(/имя/i), {
                target: { value: "Jake" }
            });
            fireEvent.input(screen.getByPlaceholderText(/секретное слово/i), {
                target: { value: "user" }
            });
            fireEvent.input(avatarInput, {
                target: { files: [] }
            });
            fireEvent.submit(screen.getByTestId('submitBtn'));
        })
        expect(screen.queryAllByTestId("alert")).toHaveLength(0);
        expect(screen.getByPlaceholderText(/email/i)).toHaveDisplayValue("test@gmail.com");
        expect(screen.getByPlaceholderText(/пароль/i)).toHaveDisplayValue("password");
        expect(screen.getByPlaceholderText(/имя/i)).toHaveDisplayValue("Jake");
        expect(screen.getByPlaceholderText(/секретное слово/i)).toHaveDisplayValue("user");
        expect(avatarInput.files).toHaveLength(0);
    });

    it("all values are valid", async () => {
        renderWithProviders({ elem: <Registration /> });
        const avatarInput: HTMLInputElement = screen.getByTestId('avatar-input');
        await act(async() => {
            fireEvent.input(screen.getByPlaceholderText(/email/i), {
                target: { value: "test@gmail.com" }
            });
            fireEvent.input(screen.getByPlaceholderText(/пароль/i), {
                target: { value: "password" }
            });
            fireEvent.input(screen.getByPlaceholderText(/имя/i), {
                target: { value: "Jake" }
            });
            fireEvent.input(screen.getByPlaceholderText(/секретное слово/i), {
                target: { value: "user" }
            });
            fireEvent.input(avatarInput, {
                target: { files: [file] }
            });
            fireEvent.submit(screen.getByTestId('submitBtn'));
        });
        expect(screen.queryAllByTestId("alert")).toHaveLength(0);
        expect(screen.getByPlaceholderText(/email/i)).toHaveDisplayValue("test@gmail.com");
        expect(screen.getByPlaceholderText(/пароль/i)).toHaveDisplayValue("password");
        expect(screen.getByPlaceholderText(/имя/i)).toHaveDisplayValue("Jake");
        expect(screen.getByPlaceholderText(/секретное слово/i)).toHaveDisplayValue("user");
        expect(avatarInput.files).toHaveLength(1);
    });

    it('regStatus loading', () => {
        const state = setupStore().getState();
        const preloadedState = {
            ...state,
            registration: { status: StatusModel.LOADING }
        }
        renderWithProviders({ elem: <Registration /> }, { preloadedState });
        expect(screen.getByTestId('spinner')).toBeInTheDocument();
    });

    it('regStatus error', () => {
        const state = setupStore().getState();
        const preloadedState = {
            ...state,
            registration: { status: StatusModel.ERROR }
        }
        renderWithProviders({ elem: <Registration /> }, { preloadedState });
        expect(screen.getByText(/произошла ошибка. попробуйте еще раз/i)).toBeInTheDocument();
    });

    it('regStatus success', () => {
        mockedUseNavigate.mockReturnValue(navigate);
        const state = setupStore().getState();
        const preloadedState = {
            ...state,
            registration: { status: StatusModel.SUCCESS }
        }
        renderWithProviders({ elem: <Registration /> }, { preloadedState });
        expect(navigate).toHaveBeenCalledTimes(1);
        expect(navigate).toHaveBeenCalledWith('/login');
    });
});