import React from 'react';
import styles from './style.module.scss';

const Button = (props) => {
    const {
        type,
        onClick,
        label,
        disabled,
    } = props;
    let className;

    if (type === 'regular') {
        className = styles.regular;
    } else if (type === 'outline') {
        className = styles.outline;
    } else if (type === 'warning') {
        className = styles.warning;
    } else if (type === 'inline') {
        className = styles.inline;
    }

    return (
        <div
            className={`${className} ${disabled ? styles.disabled : ''}`}
            onClick={e => !disabled && onClick(e)}
        >
            {type === 'inline' ? ` ${label} ` : label}
        </div>
    );
};

Button.defaultProps = {
    type: 'regular',
};

export default Button;
