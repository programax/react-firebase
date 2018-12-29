import React from 'react';
import styles from './style.module.scss';

const FormControl = (props) => {
    const {
        type,
        children
    } = props;
    let className;

    if (type === 'row') {
        className = styles.formControlRow;
    } else if (type === 'block') {
        className = styles.formControlBlock;
    }

    return (
        <div className={className}>
            {children}
        </div>
    );
}

export default FormControl;
