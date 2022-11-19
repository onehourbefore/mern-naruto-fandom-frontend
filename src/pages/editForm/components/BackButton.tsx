import React from 'react';
import backIcon from '../../../assets/png/back.png';
import cl from '../EditForm.module.scss';


type BackButtonProps = {
    handler: () => void,
}

const BackButton: React.FC <BackButtonProps> = (
    { handler }
): JSX.Element => {
    return (
        <div className={cl.root__back}>
            <img
                onClick={handler} 
                className={cl.root__back_img}
                src={backIcon}
                alt="Назад" />
        </div>
    );
};

export default BackButton;