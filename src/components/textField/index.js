import React from 'react';
import styles from './style.module.scss';

const TextField = (props) => {
    const {
        ...rest
    } = props;

    return (
        <input
            className={styles.input}
            {...rest}
        />
    );
};

export default TextField;
