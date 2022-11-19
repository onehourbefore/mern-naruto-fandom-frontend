import React from 'react';
import cl from './Spinner.module.scss';

type SpinnerProps = {
    mt?: string,
};

const Spinner: React.FC <SpinnerProps> = (
    { mt }
): JSX.Element => {
    return (
        <div
            data-testid="spinner"
            className={cl.spinner}
            style={{marginTop: mt ? mt : '100px'}}
        >
            <div className={cl.ldsRing}>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
            </div>
        </div>
    )
};

export default Spinner;