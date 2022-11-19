import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import * as reduxHooks from "../store";
import { renderWithProviders } from "../utils/test-utils/test-utils";
import * as authActions from "../store/slices/authorizationSlice";
import * as postsActions from "../store/slices/postsSlice";
import { setupStore } from "../utils/test-utils/testStore";
import { useScroll } from "../hooks/useScroll";
import App from "./App";
import { StatusModel } from "../models/StatusModel";

jest.mock("../hooks/useScroll");
const mockedUseAppDispatch = jest.spyOn(reduxHooks, 'useAppDispatch');
const mockedRefresh = jest.spyOn(authActions, 'refresh');
const mockedGetCountOfPosts = jest.spyOn(postsActions, 'getCountOfPosts');

describe('App', () => {
    it('calls actions', () => {
        mockedUseAppDispatch.mockReturnValue(jest.fn());
        renderWithProviders({ elem: <App /> });
        expect(mockedRefresh).toHaveBeenCalledTimes(1);
        expect(mockedGetCountOfPosts).toHaveBeenCalledTimes(1);
    });
});

describe('App, routing (no auth users)', () => {
    it('main-news / news-main', () => {
        mockedUseAppDispatch.mockReturnValue(jest.fn());
        renderWithProviders({ elem: <App /> });

        expect(screen.queryByText(/облако тегов/i)).toBeNull();
        userEvent.click(screen.getByText(/открыть/i));
        expect(screen.getByText(/облако тегов/i)).toBeInTheDocument();

        expect(screen.queryByText(/naruto fandom/i)).toBeNull();
        userEvent.click(screen.getAllByText(/главная/i)[0]);
        expect(screen.getByText(/naruto fandom/i)).toBeInTheDocument();

        expect(screen.queryByText(/облако тегов/i)).toBeNull();
        userEvent.click(screen.getAllByText(/новости/i)[0]);
        expect(screen.getByText(/облако тегов/i)).toBeInTheDocument();

        expect(screen.queryByText(/naruto fandom/i)).toBeNull();
        userEvent.click(screen.getAllByAltText(/логотип/i)[0]);
        expect(screen.getByText(/naruto fandom/i)).toBeInTheDocument();
    });

    it('main-experts / experts-main', () => {
        mockedUseAppDispatch.mockReturnValue(jest.fn());
        renderWithProviders({ elem: <App /> });

        expect(screen.queryByText(/администраторы/i)).toBeNull();
        userEvent.click(screen.getAllByText(/авторы/i)[0]);
        expect(screen.getByText(/администраторы/i)).toBeInTheDocument();

        expect(screen.queryByText(/naruto fandom/i)).toBeNull();
        userEvent.click(screen.getAllByText(/главная/i)[0]);
        expect(screen.getByText(/naruto fandom/i)).toBeInTheDocument();
    });

    it('main-about / about-main', () => {
        mockedUseAppDispatch.mockReturnValue(jest.fn());
        renderWithProviders({ elem: <App /> });

        expect(screen.queryByText(/вселенная наруто/i)).toBeNull();
        userEvent.click(screen.getAllByText(/о нас/i)[0]);
        expect(screen.getByText(/вселенная наруто/i)).toBeInTheDocument();

        expect(screen.queryByText(/naruto fandom/i)).toBeNull();
        userEvent.click(screen.getAllByText(/главная/i)[0]);
        expect(screen.getByText(/naruto fandom/i)).toBeInTheDocument();
    });

    it('main-registration / registration-main', () => {
        mockedUseAppDispatch.mockReturnValue(jest.fn());
        renderWithProviders({ elem: <App /> });

        expect(screen.queryByText(/зарегистрироваться/i)).toBeNull();
        userEvent.click(screen.getAllByText(/регистрация/i)[0]);
        expect(screen.getByText(/зарегистрироваться/i)).toBeInTheDocument();

        expect(screen.queryByText(/naruto fandom/i)).toBeNull();
        userEvent.click(screen.getAllByText(/главная/i)[0]);
        expect(screen.getByText(/naruto fandom/i)).toBeInTheDocument();
    });

    it('main-loginPage / loginPage-main', () => {
        mockedUseAppDispatch.mockReturnValue(jest.fn());
        renderWithProviders({ elem: <App /> });

        expect(screen.queryByText(/авторизация/i)).toBeNull();
        userEvent.click(screen.getAllByText(/войти/i)[0]);
        expect(screen.getByText(/авторизация/i)).toBeInTheDocument();

        expect(screen.queryByText(/naruto fandom/i)).toBeNull();
        userEvent.click(screen.getAllByText(/главная/i)[0]);
        expect(screen.getByText(/naruto fandom/i)).toBeInTheDocument();
    });
});

describe('App, routing (auth users)', () => {
    it('main-profile / profile-main', () => {
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
            },
        }
        mockedUseAppDispatch.mockReturnValue(jest.fn());
        renderWithProviders({ elem: <App /> }, { preloadedState });

        expect(screen.queryByText(/имя профиля/i)).toBeNull();
        userEvent.click(screen.getAllByAltText(/аватар/i)[0]);
        expect(screen.getByText(/имя профиля/i)).toBeInTheDocument();

        expect(screen.queryByText(/naruto fandom/i)).toBeNull();
        userEvent.click(screen.getAllByText(/главная/i)[0]);
        expect(screen.getByText(/naruto fandom/i)).toBeInTheDocument();

        expect(screen.queryByText(/имя профиля/i)).toBeNull();
        userEvent.click(screen.getAllByText(/jake/i)[0]);
        expect(screen.getByText(/имя профиля/i)).toBeInTheDocument();

        expect(screen.queryByText(/naruto fandom/i)).toBeNull();
        userEvent.click(screen.getAllByText(/главная/i)[0]);
        expect(screen.getByText(/naruto fandom/i)).toBeInTheDocument();
    });
});