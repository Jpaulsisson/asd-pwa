import React, { ReactNode } from 'react';
import styles from './Button.module.css';

type ButtonProps = {
    children: ReactNode;
    type: 'primary' | 'secondary' | 'action';
    onclick?: React.MouseEventHandler<HTMLButtonElement> | undefined;
}



function Button({ children, type = 'primary', onclick }: ButtonProps) {
    const validTypes = ['primary', 'secondary', 'action'];
    const buttonType = validTypes.includes(type) ? type : 'primary';

    const className = `${styles.button} ${styles[buttonType]}`;

    return <button onClick={onclick} className={className}>{children}</button>;
}

export default Button;