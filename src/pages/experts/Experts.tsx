import React from 'react';
import { useAppDispatch, useAppSelector } from '../../store';
import { getExperts } from '../../selectors';
import { fetchExperts } from '../../store/slices/expertSlice';
import { StatusModel } from '../../models/StatusModel';

import Error from '../../components/error/Error';
import Spinner from '../../components/spinner/Spinner';
import Admin from '../../components/admin/Admin';

import cl from './Experts.module.scss';



const Experts: React.FC = () => {
    const dispatch = useAppDispatch();
    const { experts, status } = useAppSelector(getExperts);

    React.useEffect (() => {
        dispatch(fetchExperts());
    }, []);

    return (
        <div className={cl.root}>
            <h2 data-testid="expertsTitle" className={cl.root__title}>АДМИНИСТРАТОРЫ:</h2>
            {status === StatusModel.LOADING && experts.length === 0
                ? <Spinner data-testid="spinner" />
                : experts.map (admin => <Admin key={admin.email} {...admin} />)}

            {status === StatusModel.SUCCESS && experts.length === 0 && 
                <h3 className={cl.root__title}>Администраторов в данный момент нет</h3>}

            {status === StatusModel.ERROR && <Error />}
        </div>
    )
};

export default Experts;