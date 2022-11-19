import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useAppDispatch, useAppSelector } from '../../../store';

import { sendRegistrationForm } from '../../../store/slices/registrationSlice';
import { StatusModel } from '../../../models/StatusModel';
import { EMAIL_REGEXP } from '../../../utils/emailRegExp';
import { getRegistration } from '../../../selectors';
import Spinner from '../../../components/spinner/Spinner';

import cl from './Registration.module.scss';


const Registration: React.FC = (): JSX.Element => {
    const {
        register,
        formState: {
            errors, 
            isValid
        }, 
        handleSubmit, 
        reset
    } = useForm({ mode: "onBlur" });
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const { status: regStatus } = useAppSelector(getRegistration);
    const [avatar, setAvatar] = React.useState('');

    function onSubmit(data: any) {
        if (!avatar) return;
        data.avatar = avatar;
        dispatch(sendRegistrationForm(data));
        reset();
    }

    React.useEffect(() => {
        if(regStatus === StatusModel.SUCCESS) {
            navigate('/login');
        }
    }, [regStatus]);

    return(
        <div className={cl.root}>
            <h2 className={cl.root__title}>ЗАРЕГИСТРИРОВАТЬСЯ*</h2>
            <form 
                className={cl.root__form}
                onSubmit={handleSubmit(onSubmit)}
            >
                <div className={cl.root__item}>
                    <label 
                        className={cl.root__item_label}
                        htmlFor="reg-email">Ваша почта</label>
                    <input 
                        {...register ("email", {
                            required: "Введите реальный email",
                            pattern: {
                                value: EMAIL_REGEXP,
                                message: "Введите корректный email"
                            }
                        })}
                        className={cl.root__item_input}
                        name="email"
                        id="reg-email" 
                        placeholder="Email"
                     />
                    {errors && errors.email && 
                        <div
                            data-testid='alert'
                            className={cl.root__item_validationMessage}
                        >
                            {typeof (errors.email.message) ==='string'
                                && errors.email.message}
                        </div>}
                </div>

                <div className={cl.root__item}>
                    <label 
                        className={cl.root__item_label}
                        htmlFor="reg-password">Пароль</label>
                    <input 
                        {...register ("password", {
                            required: "Пароль от 3-12 символов",
                            minLength: {
                                value: 3,
                                message: "Слишком короткий пароль"
                            },
                            maxLength: {
                                value: 12,
                                message: "Слишком длинный пароль"
                            }
                        })}
                        className={cl.root__item_input}
                        name="password"
                        id="reg-password" 
                        type="password" 
                        placeholder="Пароль"
                    />
                    {errors && errors.password && 
                        <div
                            data-testid='alert'
                            className={cl.root__item_validationMessage}
                        >
                            {typeof (errors.password.message) ==='string'
                                && errors.password.message}
                        </div>}
                </div>

                <div className={cl.root__item}>
                    <label 
                        className={cl.root__item_label}
                        htmlFor="reg-name">Имя профиля</label>
                    <input 
                        {...register ("name", {
                            required: "Имя профиля от 2-12 символов",
                            minLength: {value: 2, message: "Минимум 2 символа"},
                            maxLength: {value: 12, message: "Не больше 12 символов"}
                        })}
                        className={cl.root__item_input}
                        name="name"
                        id="reg-name" 
                        placeholder="Имя"
                     />
                    {errors && errors.name && 
                        <div
                            data-testid='alert'
                            className={cl.root__item_validationMessage}
                        >
                            {typeof (errors.name.message) ==='string'
                                && errors.name.message}
                        </div>}
                </div>

                <div className={cl.root__item}>
                    <label 
                        className={cl.root__item_label}
                        htmlFor="secret">Для получения прав администратора</label>
                    <input  
                        {...register("secret", {required: "Введите секретное слово"})}
                        className={cl.root__item_input}
                        name="secret"
                        id="secret"
                        placeholder="Секретное слово" 
                    />
                    {errors && errors.secret && 
                        <div
                            data-testid='alert'
                            className={cl.root__item_validationMessage}
                        >
                            {typeof (errors.secret.message) ==='string'
                                && errors.secret.message}
                        </div>}
                </div>

                <div className={cl.root__item}>
                    <label 
                        className={cl.root__item_label}
                        htmlFor="avatar-input">
                            Прикрепить фото профиля (.jpg)
                    </label>
                    <input
                        data-testid='avatar-input'
                        required
                        accept='image/*'
                        onChange={(e: any) => setAvatar (e.target.files[0])}
                        type="file" 
                        id="avatar-input"
                        style={{display: 'none'}} />
                    {!avatar && 
                        <div className={cl.root__item_validationMessage}>
                            Прикрепите фото!
                        </div>}
                </div>

                <div className={cl.root__requiredMess}>
                    * - Все поля обязательны к заполнению
                </div>

                {regStatus === StatusModel.ERROR &&
                    <div className={cl.root__authMessage}>
                        Произошла ошибка. Попробуйте еще раз
                    </div>}

                <input
                    data-testid='submitBtn'
                    type="submit"
                    className={isValid 
                        ? [
                            cl.root__submitBtn,
                            cl.root__submitBtn_valid
                        ].join (' ') 
                        : [
                            cl.root__submitBtn,
                            cl.root__submitBtn_disabled
                        ].join (' ')}
                    disabled={!isValid}
                />
            </form>

            {regStatus === StatusModel.LOADING &&
                <div className={cl.root__spinner}>
                    <Spinner mt='200px' />
                </div>}
        </div>
    )
};

export default Registration;