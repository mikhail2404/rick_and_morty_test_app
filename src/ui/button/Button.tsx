import React, {ButtonHTMLAttributes, FC, SyntheticEvent} from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    label: string,
    onClick?: (e: SyntheticEvent) => void
}

const Button: FC<ButtonProps> = ({onClick, label, ...props}) => {
    return (
        <button {...props} onClick={onClick}>
            {label}
        </button>
    );
};

export default Button;