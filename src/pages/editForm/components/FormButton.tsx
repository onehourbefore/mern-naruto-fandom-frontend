import React from 'react';
import cl from '../EditForm.module.scss';


type FormButtonProps = {
    handler: () => void,
    text: 'Отправить' | 'Очистить',
}

const FormButton: React.FC <FormButtonProps> = (
    {
        handler,
        text,
    }
): JSX.Element => {
    return (
        <button 
            className={cl.root__btns_btn}
            onClick={handler}>
                {text}
        </button>
    );
};

export default FormButton;