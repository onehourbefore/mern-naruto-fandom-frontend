import React from 'react';
import { useAppSelector } from '../../../store';
import { TasksEnum } from '../../../models/EditFormModel';
import { getEditForm } from '../../../selectors';
import cl from '../EditForm.module.scss';


const FormTitle: React.FC = (): JSX.Element => {
    const { task } = useAppSelector(getEditForm);
    return (
        <h2 className={cl.root__content_formTitle}>
            {task === TasksEnum.CREATE 
                ? 'НОВАЯ СТАТЬЯ *' 
                : 'РЕДАКТИРОВАТЬ *'}
        </h2>
    );
};

export default FormTitle;