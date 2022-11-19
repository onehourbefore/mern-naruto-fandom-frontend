import React from 'react';
import { NewPostType } from '../EditForm';
import cl from '../EditForm.module.scss';


type FormComponentProps = {
    newPost: NewPostType,
    setNewPost: (post: NewPostType) => void,
};

const FormComponent: React.FC <FormComponentProps> = (
    {
        newPost,
        setNewPost,
    }
): JSX.Element => {
    return (
        <React.Fragment>
            <input 
                required
                className={cl.root__content_title} 
                type="text" 
                placeholder="Заголовок статьи"
                value={newPost.title}
                onChange={e => setNewPost({
                    ...newPost,
                    title: e.target.value
            })} />
            <textarea
                required 
                className={cl.root__content_body} 
                placeholder="Содержание"
                value={newPost.content}
                onChange={e => setNewPost({
                    ...newPost,
                    content: e.target.value
                })}>
            </textarea>
            <input 
                required
                className={cl.root__content_tags} 
                type="text" 
                placeholder="Теги (напр. #планеты - не более 3-х)"
                value={newPost.tags}
                onChange={e => setNewPost({
                    ...newPost,
                    tags: e.target.value
                })}
            />
            <label
                data-testid="labelForImageInput-test"
                className={cl.root__content_label}
                htmlFor="imgForNewPost">
                    Прикрепить изображение
            </label>
            <input
                accept='image/*'
                className={cl.root__content_addImg} 
                type="file" 
                id="imgForNewPost"
                onChange={(e: any) => setNewPost({
                    ...newPost, 
                    image: e.target.files[0]
                    })}
            />
            <h3 className={cl.root__content_requiredMess}>
                * - Все поля обязательны к заполнению
            </h3>
            
        </React.Fragment>
    );
};

export default FormComponent;