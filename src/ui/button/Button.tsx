import React, {ButtonHTMLAttributes, FC, SyntheticEvent} from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    onClick?: (e: SyntheticEvent) => void
}

const Button: FC<ButtonProps> = ({children, onClick,  ...props}) => {
    return (
        <button {...props} onClick={onClick}>
            {children}
        </button>
    );
};

export default Button;