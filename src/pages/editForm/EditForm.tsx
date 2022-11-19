import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../store/index';

import { createPost, updatePost } from '../../store/slices/postsSlice';
import { setEditForm } from '../../store/slices/editFormSlice';
import { getPosts, getEditForm } from '../../selectors';
import { TasksEnum } from '../../models/EditFormModel';
import { StatusModel } from '../../models/StatusModel';

import Spinner from '../../components/spinner/Spinner';
import BackButton from './components/BackButton';
import FormTitle from './components/FormTitle';
import FormComponent from './components/FormComponent';
import FormButton from './components/FormButton';

import cl from './EditForm.module.scss';


export type NewPostType = {
    title: string,
    content: string,
    tags: string,
    image: Blob | string,
};

const EditForm: React.FC = (): JSX.Element => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const { created, updated } = useAppSelector(getPosts);
    const { postID, task } = useAppSelector(getEditForm);
    const [newPost, setNewPost] = React.useState<NewPostType>({
        title: '',
        content: '',
        tags: '',
        image: '',
    });
    const fieldsOfForm = !!(newPost.title && newPost.content && newPost.tags && newPost.image);

    function sendNewPost(): void {
        if(fieldsOfForm) {
            switch(task) {
                case TasksEnum.CREATE: 
                dispatch(createPost({
                    ...newPost, 
                    title: newPost.title.toUpperCase(),
                }))
                break;

                case TasksEnum.UPDATE:
                if(postID) {
                    dispatch(updatePost({
                        id: postID, 
                        post: {
                            ...newPost, 
                            title: newPost.title.toUpperCase(),
                    }}))
                }
                break;
            }
            setNewPost({title: '', content: '', tags: '', image: ''})
            dispatch(setEditForm({
                postID: '',
                task: TasksEnum.IDLE,
            }))
            return;
        }
        alert('Заполните все поля!');
    }

    function backHandler(): void {
        switch(task) {
            case TasksEnum.CREATE:
                dispatch(setEditForm ({
                    postID: '',
                    task: TasksEnum.IDLE,
                }));
                navigate('/news');
                break;
            case TasksEnum.UPDATE:
                dispatch(setEditForm ({
                    postID: '',
                    task: TasksEnum.IDLE,
                }))
                navigate(`/news/${postID}`);
                break;
            default: break;
        }
    }

    function clearForm(): void {
        setNewPost ({title: '', content: '', tags: '', image: ''});
    }

    React.useEffect(() => {
        if (created.status === StatusModel.SUCCESS || 
                updated.status === StatusModel.SUCCESS) {
            navigate('/news');
        }
    }, [created.status, updated.status]);

    return (
        <div className={cl.root}>
            <BackButton handler={backHandler} />
            <div className={cl.root__content}>
                <FormTitle />
                <FormComponent
                    newPost={newPost}
                    setNewPost={setNewPost} />
                <div className={cl.root__btns}>
                    <FormButton
                        handler={sendNewPost}
                        text='Отправить' />
                    <FormButton
                        handler={clearForm}
                        text='Очистить' />
                </div>

                {(created.status === StatusModel.ERROR || 
                    updated.status === StatusModel.ERROR) &&
                        <h3 className={cl.root__errorMessage}>
                            Произошла ошибка!
                        </h3>}
            </div>

            {(created.status === StatusModel.LOADING || 
                updated.status === StatusModel.LOADING) &&
                    <div className={cl.root__spinner}>
                        <Spinner mt='200px'/>
                    </div>}
        </div>
    )
};

export default EditForm;