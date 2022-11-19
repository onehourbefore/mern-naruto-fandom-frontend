import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useAppDispatch, useAppSelector } from '../../store';

import { getAuthorization } from '../../selectors';
import { sendLoginForm } from '../../store/slices/authorizationSlice';
import { StatusModel } from '../../models/StatusModel';
import { EMAIL_REGEXP } from '../../utils/emailRegExp';
import Spinner from '../../components/spinner/Spinner';

import cl from './Login.module.scss';


const Login: React.FC = (): JSX.Element => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const { status: authStatus } = useAppSelector(getAuthorization);
    const { 
        register,
        formState: { 
                errors,
                isValid
            },
        handleSubmit,
        reset
    } = useForm({ mode: 'onBlur' });

    function onSubmit(data: any) {
        dispatch(sendLoginForm(data));
        reset();
    }

    React.useEffect(() => {
        if(authStatus === StatusModel.SUCCESS) {
            navigate('/news');
        };
    }, [authStatus]);

    return (
        <div className={cl.root}>
            <h2 className={cl.root__title}>Авторизация</h2>
            <form
                data-testid="form-test"
                onSubmit={handleSubmit(onSubmit)}
                className={cl.root__form}
            >
                <div className={cl.root__form_item}>
                    <label
                        className={cl.root__label}
                        htmlFor="reg-email">Ваша почта</label>
                    <input
                        {...register ("email", {
                            required: "Введите email",
                            pattern: {
                                value: EMAIL_REGEXP,
                                message: "Введите корректный email"}
                        })} 
                        className={cl.root__input}
                        name="email"
                        id="reg-email" 
                        type="text" 
                        placeholder="Email"
                        required
                    />
                    {errors && errors.email && 
                        <div
                            data-testid="alert"
                            className={cl.root__validationMessage}
                        >
                            {typeof (errors.email.message) ==='string' 
                                && errors.email.message}
                        </div>}
                </div>

                <div className={cl.root__form_item}>
                    <label 
                        className={cl.root__label}
                        htmlFor="reg-password">Пароль</label>
                    <input 
                        {...register ("password", {
                            required: "Пароль от 3-12 символов",
                            minLength: {
                                value: 3,
                                message: "Слишком короткий пароль"},
                            maxLength: {
                                value: 12,
                                message: "Слишком длинный пароль"}
                        })}
                        className={cl.root__input} 
                        id="reg-password" 
                        name="password"
                        type="password" 
                        placeholder="Пароль"
                        required
                    />
                    {errors && errors.password &&
                        <div
                            data-testid="alert"
                            className={cl.root__validationMessage}
                        >
                            {typeof (errors.password.message) ==='string' 
                                && errors.password.message}
                        </div>}
                </div>

                {authStatus === StatusModel.SUCCESS 
                ? <h2 className={cl.root__authMessage}>ВЫ АВТОРИЗОВАНЫ</h2>
                : <input
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
                />}

                {authStatus === StatusModel.ERROR && 
                    <h2 className={cl.root__authMessage}>
                        Неверные логин или пароль
                    </h2>}
            </form>

            {authStatus === StatusModel.LOADING && 
                <div className={cl.root__spinner}>
                    <Spinner mt='200px' />
                </div>}
        </div>
    )
};

export default Login;