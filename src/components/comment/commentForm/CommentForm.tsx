import React from 'react';
import { useAppDispatch, useAppSelector } from '../../../store';
import { getOnepostActivePostID } from '../../../selectors'

import { addComment } from '../../../store/slices/onePostSlice';
import { CommentFormProps } from '../../../models/CommentsModel';

import cl from './CommentForm.module.scss';


const CommentForm: React.FC <CommentFormProps> = (
    { setVisible }
): JSX.Element => {
    const dispatch = useAppDispatch();
    const postID = useAppSelector(getOnepostActivePostID);
    const [areaValue, setAreaValue] = React.useState('');

    function changeAreaHandler(e: React.ChangeEvent <HTMLTextAreaElement>) {
        setAreaValue(e.target.value);
    }

    function сlearArea() {
        setAreaValue('');
    }

    function sendArea() {
        if(!areaValue) {
            alert('Нельзя отправить пустой комментарий');
            return;
        };
        if(postID) {
            dispatch(addComment({postID, body: areaValue}));
        };
        setAreaValue('');
        setVisible(false);
        window.scrollTo(0, document.body.scrollHeight);
    }

    return (
        <div
            data-testid='commentForm'
            className={cl.root}
        >
            <textarea 
                className={cl.root__area} 
                placeholder="Введите текст..."
                value={areaValue}
                onChange={changeAreaHandler}></textarea>
            <div className={cl.root__btns}>
                <button 
                    className={cl.root__btns_btn} 
                    onClick={sendArea}>Отправить</button>
                <button 
                    className={cl.root__btns_btn}
                    onClick={сlearArea}>Очистить</button>
            </div>
        </div>
    )
};

export default CommentForm;