import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import * as routerHooks from 'react-router';
import * as reduxHooks from '../../store';
import * as actionsEditForm from '../../store/slices/editFormSlice';
import * as actionsPosts from '../../store/slices/postsSlice';
import { TasksEnum } from '../../models/EditFormModel';
import { StatusModel } from '../../models/StatusModel';
import backIcon from '../../assets/png/back.png';
import EditForm from './EditForm';


const mockedUseAppDispatch = jest.spyOn(reduxHooks, 'useAppDispatch');
const mockedUseAppSelector = jest.spyOn(reduxHooks, 'useAppSelector');

const mockedSetEditFormAction = jest.spyOn(actionsEditForm, 'setEditForm');
const mockedCreatePostAction = jest.spyOn(actionsPosts, 'createPost');
const mockedUpdatePostAction = jest.spyOn(actionsPosts, 'updatePost');

const mockedUseNavigate = jest.spyOn(routerHooks, 'useNavigate');


const returnState = {
    created: {
        post: null,
        status: StatusModel.IDLE,
    },
    updated: {
        post: null,
        status: StatusModel.IDLE,
    },
    postID: 'zzzxxxccc1122',
    task: TasksEnum.IDLE,
}

describe('EditForm', () => {
    it('created.status loading', () => {
        mockedUseAppDispatch.mockReturnValue(jest.fn());
        mockedUseAppSelector.mockReturnValue({
            ...returnState,
            created: { status: StatusModel.LOADING },
        });

        render(
            <MemoryRouter>
                <EditForm />
            </MemoryRouter>
        );

        expect(screen.getByTestId('spinner')).toBeInTheDocument();
    });

    it('updated.status loading', () => {
        mockedUseAppDispatch.mockReturnValue(jest.fn());
        mockedUseAppSelector.mockReturnValue({
            ...returnState,
            updated: { status: StatusModel.LOADING },
        });

        render(
            <MemoryRouter>
                <EditForm />
            </MemoryRouter>
        );

        expect(screen.getByTestId('spinner')).toBeInTheDocument();
    });

    it('created.status error', () => {
        mockedUseAppDispatch.mockReturnValue(jest.fn());
        mockedUseAppSelector.mockReturnValue({
            ...returnState,
            created: { status: StatusModel.ERROR },
        });

        render(
            <MemoryRouter>
                <EditForm />
            </MemoryRouter>
        );

        expect(screen.getByText(/произошла ошибка!/i)).toBeInTheDocument();
    });

    it('updated.status error', () => {
        mockedUseAppDispatch.mockReturnValue(jest.fn());
        mockedUseAppSelector.mockReturnValue({
            ...returnState,
            updated: { status: StatusModel.ERROR },
        });

        render(
            <MemoryRouter>
                <EditForm />
            </MemoryRouter>
        );

        expect(screen.getByText(/произошла ошибка!/i)).toBeInTheDocument();
    });

    it('updated.status success', () => {
        mockedUseAppDispatch.mockReturnValue(jest.fn());
        mockedUseAppSelector.mockReturnValue({
            ...returnState,
            created: { status: StatusModel.SUCCESS },
        });

        const navigate = jest.fn();
        mockedUseNavigate.mockReturnValue(navigate);

        render(
            <MemoryRouter>
                <EditForm />
            </MemoryRouter>
        );
        expect(navigate).toHaveBeenCalledTimes(1);
        expect(navigate).toHaveBeenCalledWith(`/news`);
    });

    it('updated.status success', () => {
        mockedUseAppDispatch.mockReturnValue(jest.fn());
        mockedUseAppSelector.mockReturnValue({
            ...returnState,
            updated: { status: StatusModel.SUCCESS },
        });

        const navigate = jest.fn();
        mockedUseNavigate.mockReturnValue(navigate);

        render(
            <MemoryRouter>
                <EditForm />
            </MemoryRouter>
        );
        expect(navigate).toHaveBeenCalledTimes(1);
        expect(navigate).toHaveBeenCalledWith(`/news`);
    });

    it('BackButton, task: create post', () => {
        mockedUseAppDispatch.mockReturnValue(jest.fn());
        mockedUseAppSelector.mockReturnValue({
            ...returnState, task: TasksEnum.CREATE,
        });
        const navigate = jest.fn();
        mockedUseNavigate.mockReturnValue(navigate);

        render(
            <MemoryRouter>
                <EditForm />
            </MemoryRouter>
        );
        const backBtn = screen.getByAltText(/назад/i);
        expect(backBtn).toBeInTheDocument();
        expect(backBtn).toHaveAttribute('src', backIcon);
        expect(mockedSetEditFormAction).toHaveBeenCalledTimes(0);

        userEvent.click(backBtn);
        expect(mockedSetEditFormAction).toHaveBeenCalledTimes(1);
        expect(mockedSetEditFormAction).toHaveBeenCalledWith({
            postID: '',
            task: TasksEnum.IDLE,
        });
        expect(navigate).toHaveBeenCalledTimes(1);
        expect(navigate).toHaveBeenCalledWith('/news');
    });

    it('BackButton, task: update post', () => {
        mockedUseAppDispatch.mockReturnValue(jest.fn());
        mockedUseAppSelector.mockReturnValue({
            ...returnState, task: TasksEnum.UPDATE,
        });
        const navigate = jest.fn();
        mockedUseNavigate.mockReturnValue(navigate);

        render(
            <MemoryRouter>
                <EditForm />
            </MemoryRouter>
        );
        const backBtn = screen.getByAltText(/назад/i);
        expect(backBtn).toBeInTheDocument();
        expect(backBtn).toHaveAttribute('src', backIcon);
        expect(mockedSetEditFormAction).toHaveBeenCalledTimes(0);

        userEvent.click(backBtn);
        expect(mockedSetEditFormAction).toHaveBeenCalledTimes(1);
        expect(mockedSetEditFormAction).toHaveBeenCalledWith({
            postID: '',
            task: TasksEnum.IDLE,
        });
        expect(navigate).toHaveBeenCalledTimes(1);
        expect(navigate).toHaveBeenCalledWith(`/news/${returnState.postID}`);
    });

    it('Form Title (task: create)', () => {
        mockedUseAppDispatch.mockReturnValue(jest.fn());
        mockedUseAppSelector.mockReturnValue({
            ...returnState,
            task: TasksEnum.CREATE,
        });

        render(
            <MemoryRouter>
                <EditForm />
            </MemoryRouter>
        );

        expect(screen.getByText(/новая статья */i)).toBeInTheDocument();
    });

    it('Form Title (task: update)', () => {
        mockedUseAppDispatch.mockReturnValue(jest.fn());
        mockedUseAppSelector.mockReturnValue({
            ...returnState,
            task: TasksEnum.UPDATE,
        });

        render(
            <MemoryRouter>
                <EditForm />
            </MemoryRouter>
        );

        expect(screen.getByText(/редактировать */i)).toBeInTheDocument();
    });

    it('FormButtons', () => {
        mockedUseAppDispatch.mockReturnValue(jest.fn());
        mockedUseAppSelector.mockReturnValue(returnState);

        render(
            <MemoryRouter>
                <EditForm />
            </MemoryRouter>
        );

        expect(screen.getByText(/отправить/i)).toBeInTheDocument();
        expect(screen.getByText(/очистить/i)).toBeInTheDocument();
    });

    it('create post actions', () => {
        const file = new File(['hello'], 'hello.png', {type: 'image/png'});
        mockedUseAppDispatch.mockReturnValue(jest.fn());
        mockedUseAppSelector.mockReturnValue({
            ...returnState,
            task: TasksEnum.CREATE,
        });
        
        render(
            <MemoryRouter>
                <EditForm />
            </MemoryRouter>
        );
        expect(mockedCreatePostAction).toHaveBeenCalledTimes(0);
        expect(mockedSetEditFormAction).toHaveBeenCalledTimes(0);

        const titleInput = screen.getByPlaceholderText(/заголовок статьи/i);
        const contentInput = screen.getByPlaceholderText(/содержание/i);
        const tagsInput = screen.getByPlaceholderText("Теги (напр. #планеты - не более 3-х)");
        const imageInput = screen.getByLabelText(/прикрепить изображение/i);

        userEvent.type(titleInput, 'NARUTO CUN');
        userEvent.type(contentInput, 'Hello world Hello world Hello world');
        userEvent.type(tagsInput, '#chakra #naruto');
        userEvent.upload(imageInput, file);

        const sendBtn = screen.getByText(/отправить/i);
        userEvent.click(sendBtn);
        expect(mockedCreatePostAction).toHaveBeenCalledTimes(1);
        expect(mockedSetEditFormAction).toHaveBeenCalledTimes(1);
        expect(mockedCreatePostAction).toHaveBeenCalledWith({
            title: 'NARUTO CUN',
            content: 'Hello world Hello world Hello world',
            tags: '#chakra #naruto',
            image: file,
        });
        expect(mockedSetEditFormAction).toHaveBeenCalledWith({
            postID: '',
            task: TasksEnum.IDLE,
        });
    });

    it('update post actions', () => {
        const file = new File(['hello'], 'hello.png', {type: 'image/png'});
        mockedUseAppDispatch.mockReturnValue(jest.fn());
        mockedUseAppSelector.mockReturnValue({
            ...returnState,
            task: TasksEnum.UPDATE,
        });
        
        render(
            <MemoryRouter>
                <EditForm />
            </MemoryRouter>
        );
        expect(mockedUpdatePostAction).toHaveBeenCalledTimes(0);
        expect(mockedSetEditFormAction).toHaveBeenCalledTimes(0);

        const titleInput = screen.getByPlaceholderText(/заголовок статьи/i);
        const contentInput = screen.getByPlaceholderText(/содержание/i);
        const tagsInput = screen.getByPlaceholderText("Теги (напр. #планеты - не более 3-х)");
        const imageInput = screen.getByLabelText(/прикрепить изображение/i);

        userEvent.type(titleInput, 'NARUTO CUN');
        userEvent.type(contentInput, 'Hello world Hello world Hello world');
        userEvent.type(tagsInput, '#chakra #naruto');
        userEvent.upload(imageInput, file);

        const sendBtn = screen.getByText(/отправить/i);
        userEvent.click(sendBtn);
        expect(mockedUpdatePostAction).toHaveBeenCalledTimes(1);
        expect(mockedSetEditFormAction).toHaveBeenCalledTimes(1);
        expect(mockedUpdatePostAction).toHaveBeenCalledWith({
            id: returnState.postID,
            post: {
                title: 'NARUTO CUN',
                content: 'Hello world Hello world Hello world',
                tags: '#chakra #naruto',
                image: file,
            },
        });
        expect(mockedSetEditFormAction).toHaveBeenCalledWith({
            postID: '',
            task: TasksEnum.IDLE,
        });
    });
});


describe('FormComponent', () => {
    it('title input', () => {
        mockedUseAppDispatch.mockReturnValue(jest.fn());
        mockedUseAppSelector.mockReturnValue(returnState);

        render(
            <MemoryRouter>
                <EditForm />
            </MemoryRouter>
        );
        const titleInput = screen.getByPlaceholderText(/заголовок статьи/i);
        const clearBtn = screen.getByText(/очистить/i);
        expect(titleInput).toBeInTheDocument();
        userEvent.type(titleInput, 'NARUTO');
        expect(screen.getByDisplayValue('NARUTO')).toBeInTheDocument();
        userEvent.click(clearBtn);
        expect(screen.queryByDisplayValue('NARUTO')).toBeNull();
    });

    it('content textarea', () => {
        mockedUseAppDispatch.mockReturnValue(jest.fn());
        mockedUseAppSelector.mockReturnValue(returnState);

        render(
            <MemoryRouter>
                <EditForm />
            </MemoryRouter>
        );
        const contentArea = screen.getByPlaceholderText(/содержание/i);
        const clearBtn = screen.getByText(/очистить/i);
        expect(contentArea).toBeInTheDocument();
        userEvent.type(contentArea, `Lorem ipsum dolor sit amet consectetur adipisicing elit.`);
        expect(screen.getByDisplayValue(`Lorem ipsum dolor sit amet consectetur adipisicing elit.`)).toBeInTheDocument();
        userEvent.click(clearBtn);
        expect(screen.queryByDisplayValue(`Lorem ipsum dolor sit amet consectetur adipisicing elit.`)).toBeNull();
    });

    it('tags input', () => {
        mockedUseAppDispatch.mockReturnValue(jest.fn());
        mockedUseAppSelector.mockReturnValue(returnState);

        render(
            <MemoryRouter>
                <EditForm />
            </MemoryRouter>
        );
        const tagsInput = screen.getByPlaceholderText('Теги (напр. #планеты - не более 3-х)');
        const clearBtn = screen.getByText(/очистить/i);
        expect(tagsInput).toBeInTheDocument();
        userEvent.type(tagsInput, `#naruto, #uzumaki`);
        expect(screen.getByDisplayValue(`#naruto, #uzumaki`)).toBeInTheDocument();
        userEvent.click(clearBtn);
        expect(screen.queryByDisplayValue(`#naruto, #uzumaki`)).toBeNull();
    });

    it('label for image input', () => {
        mockedUseAppDispatch.mockReturnValue(jest.fn());
        mockedUseAppSelector.mockReturnValue(returnState);

        render(
            <MemoryRouter>
                <EditForm />
            </MemoryRouter>
        );
        const label = screen.getByTestId('labelForImageInput-test');
        expect(label).toBeInTheDocument();
        expect(label).toContainHTML('Прикрепить изображение');
        expect(label).toHaveAttribute('for', 'imgForNewPost');
    });

    it('image input', () => {
        mockedUseAppDispatch.mockReturnValue(jest.fn());
        mockedUseAppSelector.mockReturnValue(returnState);
        const file = new File(['hello'], 'hello.png', {type: 'image/png'});

        render(
            <MemoryRouter>
                <EditForm />
            </MemoryRouter>
        );
        const imageInput: HTMLInputElement = screen.getByLabelText(/прикрепить изображение/i);
        expect(imageInput).toBeInTheDocument();
        expect(imageInput).toHaveAttribute('accept', 'image/*');
        expect(imageInput).toHaveAttribute('type', 'file');
        expect(imageInput).toHaveAttribute('id', "imgForNewPost");

        userEvent.upload(imageInput, file);
        expect(imageInput.files?.[0]).toStrictEqual(file);
        expect(imageInput.files).toHaveLength(1);
    });

    it('required subtitle', () => {
        mockedUseAppDispatch.mockReturnValue(jest.fn());
        mockedUseAppSelector.mockReturnValue(returnState);

        render(
            <MemoryRouter>
                <EditForm />
            </MemoryRouter>
        );
        expect(screen.getByText('* - Все поля обязательны к заполнению')).toBeInTheDocument();
    });
});

