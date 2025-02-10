import { Loader2 } from 'lucide-react';
import clsx from 'clsx';

type ButtonProps = {
    disabled: boolean;
    className?: string;
    type?: 'button' | 'submit' | 'reset';
    children: React.ReactNode;
};

const Button = ({
    disabled,
    className,
    children,
    type = 'submit',
}: ButtonProps) => {
    return (
        <button
            className={clsx('btn btn-primary shadow-none', className)}
            disabled={disabled}
            type={type}
        >
            {disabled ? (
                <>
                    <Loader2 className="size-5 animate-spin" />
                    Loading...
                </>
            ) : children}
        </button>
    );
}

export default Button;
